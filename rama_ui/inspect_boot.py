def execute():
    import frappe
    import json
    bootinfo = frappe._dict()
    import frappe.boot
    frappe.boot.load_workspaces(bootinfo)
    
    print(json.dumps(list(bootinfo.keys())))
    
    if "allowed_workspaces" in bootinfo:
        print("FIRST ALLOWED WORKSPACE:")
        print(json.dumps(bootinfo.allowed_workspaces[0] if bootinfo.allowed_workspaces else {}, indent=2))
        
    if "workspace_sidebar_items" in bootinfo:
        print("WORKSPACE_SIDEBAR_ITEMS KEYS:")
        items = bootinfo.workspace_sidebar_items
        first_key = list(items.keys())[0] if items else None
        if first_key:
            print("FIRST SIDEBAR ITEM:")
            print(json.dumps(items[first_key], indent=2))
