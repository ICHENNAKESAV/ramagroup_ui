import frappe
from frappe.boot import get_bootinfo
import json

def get_sidebar_keys():
    boot = get_bootinfo()
    if "workspace_sidebar_item" in boot:
        print("YES workspace_sidebar_item EXISTS")
        print("Keys:", list(boot["workspace_sidebar_item"].keys()))
    else:
        print("NO workspace_sidebar_item")
    return True
