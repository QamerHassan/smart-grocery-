from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
import json
import random
import os

app = FastAPI(title="Smart Grocery AI Recommendations")

# Base directory for files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load orders
orders_path = os.path.join(BASE_DIR, "orders.csv")
orders = pd.read_csv(orders_path)

# Load product details
products_path = os.path.join(BASE_DIR, "products.json")
with open(products_path) as f:
    products = json.load(f)

product_map = {p["name"]: p for p in products}

# One-hot encode orders
all_products_list = list({p.strip() for row in orders['products'] for p in row.split(',')})

def create_onehot_df(orders_df):
    rows = []
    for _, row in orders_df.iterrows():
        items = [p.strip() for p in row['products'].split(',')]
        rows.append({product: (product in items) for product in all_products_list})
    return pd.DataFrame(rows)

onehot_df = create_onehot_df(orders)
frequent_itemsets = apriori(onehot_df, min_support=0.1, use_colnames=True)

if not frequent_itemsets.empty:
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)
else:
    rules = pd.DataFrame(columns=['antecedents', 'consequents', 'support', 'confidence', 'lift'])

# Request model
class CartItems(BaseModel):
    cart: list[str]

@app.post("/recommend")
def recommend(cart_items: CartItems):
    cart_set = set(cart_items.cart)
    recommendations = []

    if not rules.empty:
        for _, row in rules.iterrows():
            antecedents = set(row['antecedents'])
            consequents = set(row['consequents'])
            if cart_set & antecedents:
                for prod in consequents:
                    if prod not in cart_set:
                        recommendations.append((prod, row['confidence']))

    # Remove duplicates, keep max confidence
    rec_dict = {}
    for prod, conf in recommendations:
        if prod not in rec_dict or conf > rec_dict[prod]:
            rec_dict[prod] = conf

    # Sort by confidence descending
    sorted_recs = sorted(rec_dict.items(), key=lambda x: x[1], reverse=True)
    rec_names = [prod for prod, _ in sorted_recs[:5]]

    # Fallback if not enough recommendations
    if len(rec_names) < 5:
        remaining = list(set(all_products_list) - cart_set - set(rec_names))
        rec_names += remaining[:5 - len(rec_names)]

    # Return full product details
    result = [product_map.get(name, {"name": name, "price": 0, "image": None}) for name in rec_names]

    return {"recommendations": result}
