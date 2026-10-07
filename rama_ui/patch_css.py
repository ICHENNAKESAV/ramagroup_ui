import re
file_path = "/home/saikumar/v16-bench/apps/rama_ui/rama_ui/public/css/rama_theme.css"
with open(file_path, "r") as f:
    content = f.read()

# 1. Update link-item background to dark navy gradient
content = content.replace("background: rgba(0, 170, 248, 0.08) !important; /* Cyan accent fill */", "background: linear-gradient(90deg, #00094b 0%, #001272 100%) !important;")

# 2. Update link-item text to white on hover
content = content.replace("color: var(--rama-cyan-accent) !important;", "color: #ffffff !important;")

# 3. Update shortcut-widget-box background to dark navy gradient
content = content.replace("background: linear-gradient(90deg, rgba(0, 170, 248, 0.03) 0%, rgba(0, 170, 248, 0.08) 100%) !important;", "background: linear-gradient(90deg, #00094b 0%, #001272 100%) !important;")

# Add a rule for shortcut widget text color to turn white on hover
extra_css = '''
.shortcut-widget-box:hover .widget-title span, 
.shortcut-widget-box:hover .indicator-pill,
.shortcut-widget-box:hover svg,
.link-item:hover svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
    fill: #ffffff !important;
}
'''
content += extra_css

with open(file_path, "w") as f:
    f.write(content)
print("Done")
