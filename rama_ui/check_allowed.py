import frappe
from frappe.boot import get_bootinfo
import json

def get_allowed_workspaces():
    boot = get_bootinfo()
    if "allowed_workspaces" in boot:
        print("allowed_workspaces type:", type(boot["allowed_workspaces"]))
        print("First few items:", boot["allowed_workspaces"][:3])
    else:
        print("No allowed_workspaces found")
    return True
