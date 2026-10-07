import frappe
from frappe import _
from frappe.www.login import get_context as get_base_context

no_cache = True

def get_context(context):
	context = get_base_context(context)
	context["title"] = _("Welcome to RAMA GROUP")
	context["no_header"] = 1
	context["no_breadcrumbs"] = 1
	context["no_sidebar"] = 1
	context["show_footer_on_login"] = 0
	return context
