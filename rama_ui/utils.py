import frappe
import json

def get_home_page(user=None):
    if frappe.session.user == "Guest":
        return "login"
    return "app"

@frappe.whitelist()
def save_sidebar_layout(layout_json):
    if not frappe.has_permission("Rama Sidebar Config", "write"):
        frappe.throw("Not permitted")
        
    doc = frappe.get_doc("Rama Sidebar Config", "Rama Sidebar Config")
    doc.sidebar_json = layout_json
    doc.save(ignore_permissions=True)
    frappe.db.commit()
    return True

def boot_session(bootinfo):
    try:
        if frappe.db.exists("Rama Sidebar Config", "Rama Sidebar Config"):
            doc = frappe.get_doc("Rama Sidebar Config", "Rama Sidebar Config")
            if doc.sidebar_json:
                bootinfo["rama_sidebar"] = json.loads(doc.sidebar_json)
    except Exception:
        pass
