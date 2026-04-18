import torch
import torch.nn as nn
from torch_geometric.nn import GCNConv, global_mean_pool
from transformers import AutoModel, AutoTokenizer
from torch_geometric.loader import DataLoader
from backend.src.preprocess import load_data, prepare_dataset
import os
import argparse
import sys

# Optional: suppress transformers warnings
import logging
logging.getLogger("transformers").setLevel(logging.ERROR)

class HybridGNN(nn.Module):
    def __init__(self, vocab_size, hidden_dim, num_classes=2, bert_model_name='bert-base-uncased'):
        super(HybridGNN, self).__init__()
        self.node_emb = nn.Embedding(vocab_size, hidden_dim)
        
        self.conv1 = GCNConv(hidden_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, hidden_dim)
        
        self.bert = AutoModel.from_pretrained(bert_model_name)
        # Unfreeze top layers for fine-tuning
        for param in self.bert.parameters():
            param.requires_grad = False
        
        # Unfreeze last 2 layers
        for param in self.bert.encoder.layer[-2:].parameters():
            param.requires_grad = True
            
        bert_out_dim = self.bert.config.hidden_size
        
        self.classifier = nn.Sequential(
            nn.Linear(hidden_dim + bert_out_dim, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes)
        )
        
    def forward(self, input_ids, attention_mask, x, edge_index, batch):
        x_emb = self.node_emb(x.squeeze(-1))
        
        h = self.conv1(x_emb, edge_index).relu()
        h = self.conv2(h, edge_index).relu()
        graph_feat = global_mean_pool(h, batch)
        
        bert_outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        cls_feat = bert_outputs.pooler_output
        
        fused = torch.cat([graph_feat, cls_feat], dim=1)
        return self.classifier(fused)

def train(epochs=2, max_samples=50000, batch_size=32):
    from sklearn.model_selection import train_test_split
    print("Loading data...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    root_dir = os.path.dirname(base_dir) # mental-health-mlops directory
    data_path = os.path.join(root_dir, "data", "sentiment140.csv")
    df = load_data(data_path, max_samples=max_samples)
    
    tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
    
    X_train, X_test, y_train, y_test = train_test_split(df['text'].values, df['label'].values, test_size=0.2, random_state=42)
    
    print("Preparing train graphs...")
    train_graphs = prepare_dataset(X_train, y_train, tokenizer)
    print("Preparing test graphs...")
    test_graphs = prepare_dataset(X_test, y_test, tokenizer)
    
    train_loader = DataLoader(train_graphs, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_graphs, batch_size=batch_size)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Training on device: {device}")
    
    vocab_size = tokenizer.vocab_size
    model = HybridGNN(vocab_size=vocab_size, hidden_dim=64).to(device)
    
    # Lower learning rate for fine-tuning transformers
    optimizer = torch.optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=2e-5)
    criterion = nn.CrossEntropyLoss()
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        correct = 0
        
        for batch in train_loader:
            batch = batch.to(device)
            optimizer.zero_grad()
            
            out = model(batch.input_ids, batch.attention_mask, batch.x, batch.edge_index, batch.batch)
            loss = criterion(out, batch.y)
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item() * batch.num_graphs
            pred = out.argmax(dim=1)
            correct += int((pred == batch.y).sum())
            
        train_loss = total_loss / len(train_loader.dataset)
        train_acc = correct / len(train_loader.dataset)
        
        # Eval
        model.eval()
        test_correct = 0
        with torch.no_grad():
            for batch in test_loader:
                batch = batch.to(device)
                out = model(batch.input_ids, batch.attention_mask, batch.x, batch.edge_index, batch.batch)
                pred = out.argmax(dim=1)
                test_correct += int((pred == batch.y).sum())
                
        test_acc = test_correct / len(test_loader.dataset)
        print(f"Epoch {epoch+1}/{epochs} - Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f} | Test Acc: {test_acc:.4f}")
        
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    models_dir = os.path.join(base_dir, "models")
    os.makedirs(models_dir, exist_ok=True)
    
    # Save model
    model_path = os.path.join(models_dir, "hybrid_gnn.pt")
    print(f"Saving model to {model_path}")
    torch.save(model.state_dict(), model_path)
    
    # Save vocab info
    import json
    config_path = os.path.join(models_dir, "config.json")
    with open(config_path, "w") as f:
        json.dump({"vocab_size": vocab_size, "hidden_dim": 64}, f)
        
    print("Training complete.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--max-samples', type=int, default=50000)
    parser.add_argument('--epochs', type=int, default=2)
    parser.add_argument('--batch-size', type=int, default=32)
    args = parser.parse_args()
    
    train(epochs=args.epochs, max_samples=args.max_samples, batch_size=args.batch_size)