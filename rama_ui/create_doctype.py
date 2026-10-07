import frappe

def create_sidebar_config_doctype():
    frappe.flags.in_test = True
    
    doctype_name = "Rama Sidebar Config"
    
    if not frappe.db.exists("DocType", doctype_name):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": doctype_name,
            "module": "Rama UI",
            "custom": 1,
            "istable": 0,
            "issingle": 1,
            "permissions": [{"role": "System Manager", "read": 1, "write": 1}],
            "fields": [
                {
                    "fieldname": "sidebar_json",
                    "fieldtype": "Code",
                    "label": "Sidebar JSON Data",
                    "options": "JSON"
                }
            ]
        })
        doc.insert(ignore_permissions=True)
        frappe.db.commit()
        print(f"Created DocType: {doctype_name}")
    else:
        print(f"DocType {doctype_name} already exists.")
        
    return True
