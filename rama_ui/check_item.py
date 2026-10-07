import frappe
from frappe.boot import get_bootinfo
import json

def get_item_structure():
    boot = get_bootinfo()
    home = boot["workspace_sidebar_item"].get("home")
    if home and home.get("items") and len(home["items"]) > 0:
        first_item = home["items"][0]
        print("First item keys:", list(first_item.keys()))
        print("First item dict:", json.dumps(first_item))
    else:
        print("No items found in home workspace")
    return True
