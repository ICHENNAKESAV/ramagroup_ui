import frappe

def execute():
    installed_apps = frappe.get_installed_apps()
    deleted_count = 0
    
    workspaces = frappe.get_all("Workspace", fields=["name", "module"])
    for ws in workspaces:
        if ws.module:
            app = frappe.local.module_app.get(frappe.scrub(ws.module))
            if app and app not in installed_apps:
                frappe.delete_doc("Workspace", ws.name, ignore_permissions=True, force=True)
                deleted_count += 1
                
    print(f"Deleted {deleted_count} workspaces from uninstalled apps.")
    frappe.db.commit()
