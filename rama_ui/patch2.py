import re
file_path = "/home/saikumar/v16-bench/apps/rama_ui/rama_ui/public/css/rama_theme.css"
with open(file_path, "r") as f:
    content = f.read()

# Replace the shortcut widget animation from width to opacity
content = content.replace("width: 0 !important; /* Start width 0 */", "opacity: 0 !important; width: 100% !important; /* Start opacity 0 */")
content = content.replace("transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;", "transition: opacity 0.3s ease !important;")
content = content.replace("width: 100% !important; /* Fill width */", "opacity: 1 !important; /* Fade in */")

# Add CSS for the stats chip
extra_css = '''
.shortcut-widget-box:hover .indicator-pill,
.link-item:hover .indicator-pill {
    background-color: rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
}
'''
content += extra_css

with open(file_path, "w") as f:
    f.write(content)
print("Done")
