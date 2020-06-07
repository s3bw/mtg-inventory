"""Given a CSV from https://deckbox.org/ create a list of all cards."""
import pandas as pd

df = pd.read_csv('data/inventory.csv')
print(f"Unique Cards: {len(df)}")
print(f"Total Cards: {sum(df['Count'])}")

df["Name"].to_csv('data/card_names.txt', index=False, header=False)
print("Updated 'card_names.csv'")
