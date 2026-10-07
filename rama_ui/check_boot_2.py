import frappe
from frappe.boot import get_bootinfo
import json

def get_sidebar_keys():
    boot = get_bootinfo()
    home = boot["workspace_sidebar_item"].get("home")
    if home:
        print("Home keys:", list(home.keys()))
        print("Home app:", home.get("app"))
        print("Home has items?", "items" in home)
    else:
        print("No home workspace found")
    return True
