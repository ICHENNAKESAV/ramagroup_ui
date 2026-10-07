import frappe
def execute():
    frappe.db.set_value('Rama Sidebar Config', 'Rama Sidebar Config', 'sidebar_json', '')
    frappe.db.commit()
