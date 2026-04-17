import pandas as pd
import re
import torch
from torch_geometric.data import Data
from transformers import AutoTokenizer

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z ]", "", text)
    return text.strip()

def load_data(path, max_samples=None):
    df = pd.read_csv(path, encoding='latin-1', header=None)
    df = df[[0,5]]
    df.columns = ['sentiment','text']
    df['text'] = df['text'].apply(clean_text)
    
    # Map classes: 0 -> 0 (negative), 4 -> 1 (positive)
    df['label'] = df['sentiment'].apply(lambda x: 1 if x == 4 else 0)
    
    if max_samples:
        df = df.sample(n=min(max_samples, len(df)), random_state=42).reset_index(drop=True)
    
    return df

def build_text_graph(text, tokenizer, window_size=3):
    """
    Constructs a graph from text where words are nodes.
    Edges are drawn between words that co-occur within a window.
    Node features are BERT token embeddings of the words.
    """
    words = text.split()
    if not words:
        words = ["empty"]
        
    # Get unique words to represent nodes
    unique_words = list(dict.fromkeys(words))
    word2idx = {w: i for i, w in enumerate(unique_words)}
    
    # Build edges within sliding window
    edges = set()
    for i in range(len(words)):
        for j in range(max(0, i - window_size), min(len(words), i + window_size + 1)):
            if i != j:
                u = word2idx[words[i]]
                v = word2idx[words[j]]
                edges.add((u, v))
                edges.add((v, u)) # undirected
                
    if not edges: # Add self loops if no edges
        for i in range(len(unique_words)):
            edges.add((i, i))
            
    source_nodes = [u for u, v in edges]
    target_nodes = [v for u, v in edges]
    edge_index = torch.tensor([source_nodes, target_nodes], dtype=torch.long)
    
    # Generate node features using BERT embeddings
    # Using tokenizer to get token ids directly
    # For a full implementation, we'd pass tokens through BERT.
    # To keep this fast during preprocessing, we'll initialize with token ids embedded or
    # since we want HybridGNN to learn, we can pass input_ids into an Embedding layer later.
    # Actually, the standard way is to return the token sequence and the edge_index,
    # and the model handles embedding. We will return the tokenized graph.
    
    # To make it work with GCN, we need node features. Let's just use token IDs as node features 
    # and we'll apply an Embedding layer in the Model.
    node_tokens = [tokenizer.encode(w, add_special_tokens=False) for w in unique_words]
    # If a word is multiple subwords, just take the first subword token
    node_features = []
    for tokens in node_tokens:
        if tokens:
            node_features.append(tokens[0])
        else:
            node_features.append(tokenizer.unk_token_id)
            
    x = torch.tensor(node_features, dtype=torch.long).unsqueeze(1) # shape [num_nodes, 1]
    
    # Get full sequence for BERT CLS extraction
    encoded_seq = tokenizer(text, padding='max_length', truncation=True, max_length=128, return_tensors='pt')
    
    data = Data(x=x, edge_index=edge_index)
    
    # Attach sequence data for the hybrid model
    data.input_ids = encoded_seq['input_ids']
    data.attention_mask = encoded_seq['attention_mask']
    
    return data

def prepare_dataset(texts, labels, tokenizer, max_samples=None):
    if max_samples and len(texts) > max_samples:
        texts = texts[:max_samples]
        labels = labels[:max_samples]
        
    graphs = []
    for text, label in zip(texts, labels):
        data = build_text_graph(text, tokenizer)
        data.y = torch.tensor([label], dtype=torch.long)
        graphs.append(data)
        
    return graphs