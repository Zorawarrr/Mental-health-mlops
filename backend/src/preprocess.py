import pandas as pd
import re

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z ]", "", text)
    return text

def load_data(path):

    df = pd.read_csv(path, encoding='latin-1', header=None)

    df = df[[0,5]]
    df.columns = ['sentiment','text']

    df['text'] = df['text'].apply(clean_text)

    return df