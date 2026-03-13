import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from preprocess import load_data

print("Loading dataset...")

df = load_data("data/sentiment140.csv")

X = df['text']
y = df['sentiment']

vectorizer = TfidfVectorizer(max_features=5000)

X_vec = vectorizer.fit_transform(X)

X_train,X_test,y_train,y_test = train_test_split(
    X_vec,
    y,
    test_size=0.2,
    random_state=42
)

print("Training model...")

model = LogisticRegression(max_iter=200)

model.fit(X_train,y_train)

pred = model.predict(X_test)

print("\nModel Evaluation\n")

print(classification_report(y_test,pred))

joblib.dump(model,"models/model.pkl")
joblib.dump(vectorizer,"models/vectorizer.pkl")

print("Model saved successfully")