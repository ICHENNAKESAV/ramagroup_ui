import re
file_path = "/home/saikumar/v16-bench/apps/rama_ui/rama_ui/public/js/rama_unified_sidebar.js"
with open(file_path, "r") as f:
    content = f.read()

target = r'''					var itemRoute = item.route;
					if (!itemRoute) {
						if (item.type === "Link" && item.link_to) {
							itemRoute = frappe.router ? "/app/" + frappe.router.slug(item.link_to) : "/app/" + \n?item.link_to.toLowerCase\(\).replace\(/ /g, '-'\);
						} else if (item.type === "DocType" && item.link_to) {
							itemRoute = "/app/" + item.link_to.toLowerCase\(\).replace\(/ /g, '-'\);
						} else {
							return;
						}
					}'''

replacement = """					var itemRoute = item.route;
					if (!itemRoute) {
						if (item.type === "Link") {
							if (item.link_type === "URL" && item.url) {
								itemRoute = item.url;
							} else if (item.link_to) {
								var slug = frappe.router ? frappe.router.slug(item.link_to) : item.link_to.toLowerCase().replace(/ /g, '-');
								if (item.link_type === "Report") {
									itemRoute = "/app/query-report/" + slug;
								} else {
									itemRoute = "/app/" + slug;
								}
							} else {
								return;
							}
						} else {
							return;
						}
					}"""

content = re.sub(target, replacement, content, flags=re.MULTILINE)
with open(file_path, "w") as f:
    f.write(content)
print("Done")
