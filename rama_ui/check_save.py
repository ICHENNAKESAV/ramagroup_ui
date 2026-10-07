import frappe

frappe.init(site="rama_group")
frappe.connect()

doc = frappe.get_doc("Rama Sidebar Config", "Rama Sidebar Config")
print("Saved JSON length:", len(doc.sidebar_json) if doc.sidebar_json else "None")
