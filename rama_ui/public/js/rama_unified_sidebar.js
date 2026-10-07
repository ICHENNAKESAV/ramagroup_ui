/* =====================================================================
   RAMA UI - Unified Sidebar for Frappe 16 (Workspace Looper Fix)
   ===================================================================== */

(function () {
	if (typeof window === "undefined") return;

	var isInitialized = false;

	function buildFlatNav() {
		if (frappe && frappe.boot && frappe.boot.rama_sidebar) {
			return frappe.boot.rama_sidebar;
		}

		var groupedItems = {};
		var groupOrder = [];

		if (!frappe || !frappe.boot || !frappe.boot.workspace_sidebar_item) return [];

		var allWorkspaces = frappe.boot.workspace_sidebar_item;
		var workspaceKeys = Object.keys(allWorkspaces);
		
		workspaceKeys.forEach(function (key) {
			var group = allWorkspaces[key];
			if (!group) return; 
			
			var route = "/app/" + key.toLowerCase().replace(/ /g, '-');
			var label = group.label || key.charAt(0).toUpperCase() + key.slice(1);
			var icon = group.header_icon || "folder-normal";
			
			var appName = group.app || group.module || "Frappe";
			appName = appName.charAt(0).toUpperCase() + appName.slice(1);
			
			if (!groupedItems[appName]) {
				groupedItems[appName] = [];
				groupOrder.push(appName); // Preserve backend insertion order of apps
			}

			// Extract internal links (Option A)
			var innerLinks = [];
			if (group.items && Array.isArray(group.items)) {
				group.items.forEach(function(item) {
					if (!item.label) return;
					if (item.type === "Section Break") return; // skip headers in dropdown for now
					
					var itemRoute = item.route;
					if (!itemRoute) {
						if (item.type === "Link" && item.link_to) {
							itemRoute = frappe.router ? "/app/" + frappe.router.slug(item.link_to) : "/app/" + item.link_to.toLowerCase().replace(/ /g, '-');
						} else if (item.type === "DocType" && item.link_to) {
							itemRoute = "/app/" + item.link_to.toLowerCase().replace(/ /g, '-');
						} else {
							return;
						}
					}
					
					innerLinks.push({
						label: item.label,
						route: itemRoute
					});
				});
			}
			
			groupedItems[appName].push({
				route: route,
				label: label,
				icon: icon,
				innerLinks: innerLinks,
				folderId: "folder-" + key.replace(/[^a-z0-9]/gi, '-')
			});
		});

		var sortedGroups = [];
		// Do NOT sort alphabetically. Trust the backend order!
		groupOrder.forEach(function(gName) {
			sortedGroups.push({
				groupName: gName,
				items: groupedItems[gName]
			});
		});

		return sortedGroups;
	}

	function renderIcon(iconName) {
		try {
			if (frappe.utils && frappe.utils.icon) {
				return frappe.utils.icon(iconName, "sm", "", "", "rama-sidebar-icon", true);
			}
		} catch (e) {}
		return '<span class="rama-sidebar-icon-fallback">' + (iconName ? iconName.charAt(0) : "W") + "</span>";
	}

	function escapeHtml(str) {
		var div = document.createElement("div");
		div.appendChild(document.createTextNode(str || ""));
		return div.innerHTML;
	}

	function escapeAttr(str) {
		return (str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}

	function injectUnifiedSidebar() {
		var container = document.querySelector(".sidebar-items") || document.querySelector(".desk-sidebar");
		
		if (!container) {
			var sideSection = document.querySelector(".layout-side-section");
			if (sideSection) {
				var newSidebar = document.createElement("div");
				newSidebar.className = "sidebar-items";
				sideSection.appendChild(newSidebar);
				container = newSidebar;
			} else {
				return;
			}
		}

		var existing = container.querySelector(".rama-unified-section");
		if (existing) existing.remove();

		var sortedGroups = buildFlatNav();
		if (!sortedGroups || sortedGroups.length === 0) return;

		var html = '<div class="rama-unified-section" id="rama-sidebar-root">';

		sortedGroups.forEach(function (group) {
			html += '<div class="rama-sidebar-group" data-group-name="' + escapeAttr(group.groupName) + '">';
			html += '<div class="rama-sidebar-group-title">' + escapeHtml(group.groupName) + '</div>';
			html += '<div class="rama-unified-items">';

			group.items.forEach(function (item) {
				var hasInner = item.innerLinks && item.innerLinks.length > 0;
				
				html += '<div class="rama-workspace-folder" data-label="' + escapeAttr(item.label) + '" data-route="' + escapeAttr(item.route) + '" data-icon="' + escapeAttr(item.icon) + '">';
				html += '<a href="' + escapeAttr(item.route) + '" class="rama-sidebar-link ' + (hasInner ? 'rama-folder-toggle' : '') + '" data-label="' + escapeAttr(item.label.toLowerCase()) + '" data-target="' + escapeAttr(item.folderId || '') + '">';
				html += '<span class="rama-sidebar-link-icon">' + renderIcon(item.icon) + '</span>';
				html += '<span class="rama-sidebar-link-label">' + escapeHtml(item.label) + '</span>';
				if (hasInner) {
					html += '<span class="rama-folder-chevron">▼</span>';
				}
				html += '</a>';
				
				if (hasInner) {
					html += '<div class="rama-folder-content" id="' + escapeAttr(item.folderId) + '" style="display: none;">';
					item.innerLinks.forEach(function(inner) {
						html += '<a href="' + escapeAttr(inner.route) + '" class="rama-sidebar-link rama-inner-link" data-label="' + escapeAttr(inner.label) + '">';
						html += '<span class="rama-sidebar-link-label">' + escapeHtml(inner.label) + '</span>';
						html += '</a>';
					});
					html += '</div>';
				}
				html += '</div>'; // close rama-workspace-folder
			});
			
			html += '</div></div>'; // close rama-unified-items and group
		});

		html += '</div>';
		container.insertAdjacentHTML("afterbegin", html);

		// Event listeners for routing and toggling
		var allLinks = container.querySelectorAll(".rama-sidebar-link");
		for (var i = 0; i < allLinks.length; i++) {
			(function (link) {
								link.addEventListener("click", function (e) {
					if (document.body.classList.contains("rama-edit-mode")) {
						e.preventDefault();
						return; // Do absolutely nothing when dragging!
					}
					
					var href = link.getAttribute("href");
					console.log("RAMA Sidebar Clicked! href:", href);
					
					var isToggle = link.classList.contains("rama-folder-toggle");
					
					if (isToggle) {
						e.preventDefault(); 
						console.log("RAMA Sidebar: is folder toggle");
						var targetId = link.getAttribute("data-target");
						var content = document.getElementById(targetId);
						if (content) {
							if (content.style.display === "none") {
								content.style.display = "block";
								link.classList.add("rama-expanded");
							} else {
								content.style.display = "none";
								link.classList.remove("rama-expanded");
							}
						}
					}

					if (!href || href === "#" || href === "undefined") {
						console.log("RAMA Sidebar: invalid href, preventing default");
						e.preventDefault();
						return;
					}
					
					e.preventDefault();
					console.log("RAMA Sidebar: attempting to route to", href);
					if (window.frappe && window.frappe.set_route) {
						var routeParts = href.replace(/^\/?app\//, '').split('/');
						frappe.set_route(routeParts);
					} else {
						window.location.href = href;
					}
				});
			})(allLinks[i]);
		}

		highlightActiveItem();
	}

	function saveSidebarLayout() {
		var root = document.getElementById("rama-sidebar-root");
		if (!root) return;

		var newLayout = [];
		var groups = root.querySelectorAll(".rama-sidebar-group");
		
		groups.forEach(function(groupEl) {
			var titleEl = groupEl.querySelector(".rama-sidebar-group-title");
			var groupName = titleEl ? titleEl.innerText.trim() : groupEl.getAttribute("data-group-name");
			
			var items = [];
			
			var folderEls = groupEl.querySelectorAll(".rama-workspace-folder");
			folderEls.forEach(function(folderEl) {
				var innerLinks = [];
				var innerEls = folderEl.querySelectorAll(".rama-inner-link");
				innerEls.forEach(function(innerEl) {
					var innerLabelEl = innerEl.querySelector(".rama-sidebar-link-label");
					innerLinks.push({
  						label: innerLabelEl ? innerLabelEl.innerText.trim() : innerEl.getAttribute("data-label"),
  						route: innerEl.getAttribute("data-old-href") || innerEl.getAttribute("href") || ""
  					});
				});
				
				var folderToggle = folderEl.querySelector(".rama-folder-toggle") || folderEl.querySelector("a.rama-sidebar-link");
				var folderLabelEl = folderEl.querySelector("a > .rama-sidebar-link-label");
				
				items.push({
					label: folderLabelEl ? folderLabelEl.innerText.trim() : folderEl.getAttribute("data-label"),
					route: folderEl.getAttribute("data-route"),
					icon: folderEl.getAttribute("data-icon"),
					folderId: folderToggle ? folderToggle.getAttribute("data-target") : "",
					innerLinks: innerLinks
				});
			});
			
			newLayout.push({
				groupName: groupName,
				items: items
			});
		});

		frappe.call({
			method: "rama_ui.utils.save_sidebar_layout",
			args: {
				layout_json: JSON.stringify(newLayout)
			},
			callback: function(r) {
				if (!r.exc) {
					frappe.show_alert({message: "Sidebar Layout Saved!", indicator: "green"});
					frappe.boot.rama_sidebar = newLayout;
					toggleEditMode(false);
				}
			}
		});
	}

	function toggleEditMode(force) {
		var isEdit = force !== undefined ? force : !document.body.classList.contains("rama-edit-mode");
		
		var root = document.getElementById("rama-sidebar-root");
		if (!root) return;
		
		if (isEdit) {
			document.body.classList.add("rama-edit-mode");
			frappe.show_alert({message: "Sidebar Edit Mode Activated. Drag to reorder or click text to edit.", indicator: "orange"});
			
			// Temporarily remove hrefs so clicking doesn't trigger navigation, allowing text cursor to focus
			var links = root.querySelectorAll("a.rama-sidebar-link");
			links.forEach(function(l) {
				var h = l.getAttribute("href");
				if (h) {
					l.setAttribute("data-old-href", h);
					l.removeAttribute("href");
				}
			});
			
			var labels = root.querySelectorAll(".rama-sidebar-group-title, .rama-sidebar-link-label");
			labels.forEach(function(l) { 
				l.contentEditable = "true"; 
				// Stop dragging when trying to select text
				l.addEventListener("mousedown", function(e) { e.stopPropagation(); });
			});
			
			var icons = root.querySelectorAll(".rama-workspace-folder > a > .rama-sidebar-link-icon");
			icons.forEach(function(icn) {
				icn.onclick = function(e) {
					e.preventDefault();
					e.stopPropagation();
					var newIcon = prompt("Enter new icon name (e.g. 'folder-normal', 'setting', 'user'):");
					if (newIcon) {
						var folderEl = icn.closest(".rama-workspace-folder");
						if (folderEl) folderEl.setAttribute("data-icon", newIcon);
						icn.innerHTML = renderIcon(newIcon);
					}
				};
			});
			
			if (window.Sortable) {
				window.ramaSortableGroups = new Sortable(root, {
					animation: 150,
					handle: ".rama-sidebar-group-title",
					ghostClass: "rama-sortable-ghost"
				});
				
				var itemContainers = document.querySelectorAll(".rama-unified-items");
				window.ramaSortableItems = [];
				itemContainers.forEach(function(c) {
					window.ramaSortableItems.push(new Sortable(c, {
						group: "shared-items",
						animation: 150,
						ghostClass: "rama-sortable-ghost",
						filter: ".rama-sidebar-link-label, .rama-sidebar-link-icon",
						preventOnFilter: false
					}));
				});
				
				var innerContainers = document.querySelectorAll(".rama-folder-content");
				window.ramaSortableInner = [];
				innerContainers.forEach(function(c) {
					c.style.display = "block"; 
					window.ramaSortableInner.push(new Sortable(c, {
						group: "shared-inner",
						animation: 150,
						ghostClass: "rama-sortable-ghost",
						filter: ".rama-sidebar-link-label",
						preventOnFilter: false
					}));
				});
			} else {
				console.warn("SortableJS not found.");
			}
			
			var btns = document.createElement("div");
			btns.className = "rama-edit-controls";
			btns.innerHTML = '<button class="btn btn-primary btn-sm" id="rama-save-btn">Save Layout</button><button class="btn btn-default btn-sm" id="rama-cancel-btn">Cancel</button>';
			root.appendChild(btns);
			
			document.getElementById("rama-save-btn").onclick = saveSidebarLayout;
			document.getElementById("rama-cancel-btn").onclick = function() {
				toggleEditMode(false);
				injectUnifiedSidebar(); 
			};
		} else {
			document.body.classList.remove("rama-edit-mode");
			
			// Restore hrefs
			var links = root.querySelectorAll("a.rama-sidebar-link");
			links.forEach(function(l) {
				var h = l.getAttribute("data-old-href");
				if (h) {
					l.setAttribute("href", h);
					l.removeAttribute("data-old-href");
				}
			});
			
			var labels = root.querySelectorAll(".rama-sidebar-group-title, .rama-sidebar-link-label");
			labels.forEach(function(l) { l.contentEditable = "false"; });
			var icons = root.querySelectorAll(".rama-workspace-folder > a > .rama-sidebar-link-icon");
			icons.forEach(function(icn) { icn.onclick = null; });
			
			if (window.ramaSortableGroups) window.ramaSortableGroups.destroy();
			if (window.ramaSortableItems) window.ramaSortableItems.forEach(function(s) { s.destroy(); });
			if (window.ramaSortableInner) window.ramaSortableInner.forEach(function(s) { s.destroy(); });
			
			var controls = document.querySelector(".rama-edit-controls");
			if (controls) controls.remove();
		}
	}

	document.addEventListener("keydown", function(e) {
		if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'e') {
			e.preventDefault();
			toggleEditMode();
		}
	});

	
	

		function injectTopNavbar() {
		var body = document.querySelector("body");
		
		if (!document.querySelector(".rama-top-navbar")) {
			var mainLayout = document.querySelector(".layout-main") || document.querySelector(".main-section");
			if (!mainLayout) return;

			var topNavHtml = '<div class="rama-top-navbar">';
			topNavHtml += '<div class="rama-top-left-area">';
			topNavHtml += '<button class="rama-proxy-btn rama-sidebar-toggle-btn" aria-label="Toggle Sidebar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rama-top-icon"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>';
			topNavHtml += '<div class="rama-top-brand" onclick="if(frappe) frappe.set_route(\'/app/home\');" style="cursor:pointer;" title="Go to Dashboard"><img src="/assets/rama_ui/assets/rama_logo.png" alt="RAMA Groups" class="rama-logo-img" onerror="this.onerror=null; this.src=\'/assets/rama_ui/rama_logo.png\';"></div>';
			topNavHtml += '</div>';
			topNavHtml += '<div class="rama-top-right-area"></div>';
			topNavHtml += '</div>';

			body.insertAdjacentHTML("afterbegin", topNavHtml);
			body.classList.add("rama-has-top-navbar");
		}

		
		var toggleBtn = document.querySelector(".rama-sidebar-toggle-btn");
		if (toggleBtn) {
			toggleBtn.onclick = function (e) {
				e.preventDefault();
				e.stopPropagation();
				document.body.classList.toggle("sidebar-closed");
				if (frappe && frappe.app && frappe.app.sidebar && typeof frappe.app.sidebar.toggle_width === "function") {
					frappe.app.sidebar.toggle_width();
				}
				var $sideSection = $(".layout-side-section, .body-sidebar, .desk-sidebar");
				if ($sideSection.length) {
					$sideSection.toggleClass("hidden");
				}
			};
		}

		var topRightArea = document.querySelector(".rama-top-right-area");

		if (topRightArea) {
			topRightArea.innerHTML = "";

			// 1. Search Bar Proxy (Right Side)
			var searchBtn = document.createElement("button");
			searchBtn.className = "rama-proxy-btn rama-search-proxy";
			searchBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rama-top-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>Search...</span>';
			searchBtn.onclick = function(e) {
				e.preventDefault();
				if ($("#navbar-modal-search").length) {
					$("#navbar-modal-search").click();
				} else if ($(".desktop-search-wrapper #desktop-navbar-modal-search").length) {
					$(".desktop-search-wrapper #desktop-navbar-modal-search").click();
				} else if (frappe && frappe.searchdialog && frappe.searchdialog.search) {
					frappe.searchdialog.search.init_search();
				} else {
					var awesomplete = document.querySelector(".awesomplete input") || document.querySelector("#navbar-search");
					if (awesomplete) awesomplete.focus();
				}
			};
			topRightArea.appendChild(searchBtn);
			
			// 2. Theme Switcher
			var themeBtn = document.createElement("button");
			themeBtn.className = "rama-proxy-btn rama-theme-proxy";
			themeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rama-top-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
			themeBtn.onclick = function(e) {
				e.preventDefault();
				let currentTheme = (frappe.ui && frappe.ui.get_current_theme) ? frappe.ui.get_current_theme() : (document.documentElement.getAttribute("data-theme") || "light");
				let nextTheme = currentTheme === "dark" ? "light" : "dark";
				if (frappe && frappe.ui && frappe.ui.ThemeSwitcher) {
					new frappe.ui.ThemeSwitcher().toggle_theme(nextTheme);
				} else {
					document.documentElement.setAttribute("data-theme", nextTheme);
					document.documentElement.setAttribute("data-theme-mode", nextTheme);
				}
			};
			topRightArea.appendChild(themeBtn);
			
			// 4. User Dropdown
			var userWrapper = document.createElement("div");
			userWrapper.className = "rama-user-dropdown-wrapper";
			
			var userBtn = document.createElement("button");
			userBtn.className = "rama-proxy-btn rama-user-proxy";
			var uInitial = frappe && frappe.session && frappe.session.user !== "Guest" ? (frappe.session.user === "Administrator" ? "A" : frappe.session.user.charAt(0).toUpperCase()) : "U";
			userBtn.innerHTML = '<span class="rama-avatar-placeholder">' + uInitial + '</span>';
			
			var dropdownMenu = document.createElement("div");
			dropdownMenu.className = "rama-user-dropdown-menu";
			dropdownMenu.innerHTML = '<a href="#" class="rama-dropdown-item" id="rama-btn-profile">My Profile</a>' + 
									 '<a href="#" class="rama-dropdown-item" id="rama-btn-settings">Settings</a>' +
									 '<div class="rama-dropdown-divider"></div>' +
									 '<a href="#" class="rama-dropdown-item text-danger" id="rama-btn-logout">Logout</a>';
			
			userWrapper.appendChild(userBtn);
			userWrapper.appendChild(dropdownMenu);
			topRightArea.appendChild(userWrapper);
			
			userBtn.onclick = function(e) {
				e.preventDefault();
				dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
			};
			
			document.addEventListener("click", function(e) {
				if (!userWrapper.contains(e.target)) {
					dropdownMenu.style.display = "none";
				}
			});
		}
	}

	function highlightActiveItem() {
		var container = document.querySelector(".rama-unified-section");
		if (!container) return;

		var currentPath = decodeURIComponent(window.location.pathname).replace(/\/$/, "");
		var links = container.querySelectorAll(".rama-sidebar-link");

		for (var i = 0; i < links.length; i++) {
			var href = decodeURIComponent(links[i].getAttribute("href") || "")
				.split("?")[0].split("#")[0].replace(/\/$/, "");
			if (href && href !== "" && href !== "/app" && (currentPath === href || currentPath.indexOf(href + "/") === 0)) {
				links[i].classList.add("rama-active");
			} else {
				links[i].classList.remove("rama-active");
			}
		}
	}

	function checkDefaultRoute() {
		var path = window.location.pathname.replace(/\/$/, "");
		if (path === "/app" || path === "/desk") {
			var defaultRoute = "/app/home";
			if (frappe && frappe.set_route) {
				frappe.set_route(defaultRoute);
			} else {
				window.location.replace(defaultRoute);
			}
		}
	}

	
	function ramaFixSidebar() {
		setTimeout(function() {
			$('.workspace-switcher, .sidebar-header').hide();
			$('span:contains("Home")').closest(".sidebar-item-container").hide();
			$('.sidebar-section-title, .standard-sidebar-label').hide();
			$('.standard-sidebar-section.desk-sidebar-section div:contains("ERPNEXT")').hide();
			$('.standard-sidebar-item').css('width', '100%');
			$('.desk-sidebar-item, .standard-sidebar-item').css({"display": "flex", "justify-content": "space-between", "width": "100%"});
			$('.item-anchor').css({"flex": "1", "width": "100%", "min-width": "0"});
			$('.sidebar-item-control').css({"margin-left": "auto"});
			$('.layout-main-section').css({"margin-left": "0px", "width": "auto"});
		}, 100);
	}

	function observeAndHideSidebarHeader() {
		var targetNode = document.querySelector('.desk-sidebar') || document.body;
		if (!targetNode) return;
		
		var observer = new MutationObserver(function(mutations) {
			var headers = document.querySelectorAll('.sidebar-header');
			if (headers.length) {
				headers.forEach(function(header) {
					if (header.style.display !== 'none') {
						header.style.display = 'none';
					}
				});
			}
		});

		observer.observe(targetNode, { childList: true, subtree: true });
	}

	function init() {
        console.log("RAMA UI ACTIVE");
		if (isInitialized) return;

		if (!frappe || !frappe.boot || !frappe.boot.workspace_sidebar_item) {
			setTimeout(init, 300);
			return;
		}

		isInitialized = true;
		
		setTimeout(function() {
			injectUnifiedSidebar();
			injectTopNavbar();
			ramaFixSidebar();
			observeAndHideSidebarHeader();
			checkDefaultRoute();
		}, 300);

		setTimeout(checkDefaultRoute, 1000);
		setTimeout(checkDefaultRoute, 2500);

		$(document).on("sidebar_setup", function () {
			setTimeout(injectUnifiedSidebar, 100);
		});

		if (frappe.router) {
			frappe.router.on("change", function () {
				setTimeout(highlightActiveItem, 150);
				setTimeout(injectUnifiedSidebar, 300);
				setTimeout(injectTopNavbar, 300);
			});
		}
	}

	$(document).on("startup", function () {
		init();
	});

	if (frappe && frappe.boot && frappe.boot.workspace_sidebar_item) {
		init();
	}
})();
setInterval(function(){ var el = document.querySelector('.navbar-breadcrumbs a[href="/desk"]'); if(el) el.setAttribute('href', '/app'); }, 500);

// Include FontAwesome
if (!document.getElementById('font-awesome-css')) {
    const link = document.createElement('link');
    link.id = 'font-awesome-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
}

// Replace Icons
const replacePageIcons = () => {
    // Menu (More) Button
    const moreBtn = document.querySelector('.menu-more-button .menu-btn-group-label');
    if (moreBtn && moreBtn.innerHTML.includes('svg')) {
        moreBtn.innerHTML = '<i class="fas fa-ellipsis-v" style="color:#ffffff; font-size:14px;"></i>';
    }

    // Refresh Button
    const refreshBtn = document.querySelector('[data-label="Refresh"]');
    if (refreshBtn && refreshBtn.innerHTML.includes('svg')) {
        // Frappe typically doesn't use SVG for refresh on standard view if it's in the menu, but if it's a top button:
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt" style="color:#ffffff; font-size:14px;"></i>';
    }

    // List view icon
    const listBtn = document.querySelector('[data-label="List"]');
    if (listBtn && listBtn.innerHTML.includes('svg')) {
        listBtn.innerHTML = '<i class="fas fa-list" style="color:#ffffff; font-size:14px;"></i>';
    }

    // Print icon
    const printBtn = document.querySelector('[data-label="Print"]');
    if (printBtn && printBtn.innerHTML.includes('svg')) {
        printBtn.innerHTML = '<i class="fas fa-print" style="color:#ffffff; font-size:14px;"></i>';
    }
};

document.addEventListener("DOMContentLoaded", replacePageIcons);
const iconObserver = new MutationObserver(replacePageIcons);
iconObserver.observe(document.body, { childList: true, subtree: true });


// Dropdown List Stats & Group-by Lists Styles
const styleDropdowns = () => {
    const dropdowns = document.querySelectorAll('.dropdown-menu.group-by-dropdown, .dropdown-menu.list-stats-dropdown, .match-type-dropdown-menu, .sort-selector .dropdown-menu, .awesomplete ul');
    dropdowns.forEach(d => {
        d.style.borderRadius = "6px";
        d.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
        d.style.padding = "6px";
        d.style.marginTop = "4px";
        const dropdownsearch = d.querySelector('input');
        if (dropdownsearch) {
            dropdownsearch.style.borderRadius = '5px';
            dropdownsearch.style.boxShadow = "0 0 5px rgba(0,0,0,0.1)";
            dropdownsearch.style.backgroundColor = "#fff";
        }
    });

    document.querySelectorAll("\n        .dropdown-menu.list-stats-dropdown li,\n        .dropdown-menu.group-by-dropdown li,\n        .dropdown-menu.list-stats-dropdown a,\n        .dropdown-menu.group-by-dropdown a,\n        .dropdown-menu.list-stats-dropdown > div,\n        .dropdown-menu.group-by-dropdown > div,\n        .match-type-dropdown-menu li,\n        .sort-selector .dropdown-menu li,\n        .awesomplete ul div[role=\'option\'],\n        .awesomplete ul li\n    ").forEach(item => {
        if (item.querySelector('input') || item.tagName === 'INPUT') return;
        item.style.borderRadius = '5px';
        item.style.transition = '0.3s';

        item.onmouseenter = () => {
            item.style.background = 'linear-gradient(135deg, #00094b, #001272)';
            item.style.color = '#fff';
            item.style.transform = 'scale(1.01)';
            item.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.2)';
            item.style.paddingLeft = '5px';
            const spans = item.querySelectorAll('span, a, p');
            spans.forEach(s => {
                s.style.color = '#fff';
                s.style.backgroundColor = 'transparent';
            });
        };
        item.onmouseleave = () => {
            item.style.background = '';
            item.style.color = '';
            item.style.transform = 'scale(1)';
            item.style.boxShadow = 'none';
            item.style.paddingLeft = '';
            const spans = item.querySelectorAll('span, a, p');
            spans.forEach(s => {
                s.style.color = '';
                s.style.backgroundColor = '';
            });
        };
    });
};

document.addEventListener("DOMContentLoaded", styleDropdowns);
const dropdownObserver = new MutationObserver(styleDropdowns);
dropdownObserver.observe(document.body, { childList: true, subtree: true });
// Additional Page Action Icon replacements
const replaceFormIcons = () => {
    document.querySelectorAll('.btn').forEach(btn => {
        const title = btn.getAttribute('title') || btn.getAttribute('data-original-title') || btn.getAttribute('data-label') || btn.textContent || '';
        const lowerTitle = title.toLowerCase();
        
        const svg = btn.querySelector('svg');
        if (!svg) return;

        if (lowerTitle.includes('reload') || lowerTitle.includes('refresh')) {
            svg.outerHTML = '<img src="/assets/rama_ui/images/reload.png" style="width:14px; margin-right:4px; filter: brightness(0) invert(1);" alt="Reload"/>';
        }
        else if (lowerTitle.includes('print')) {
            svg.outerHTML = '<img src="/assets/rama_ui/images/printer.png" style="width:14px; margin-right:4px; filter: brightness(0) invert(1);" alt="Print"/>';
        }
        else if (lowerTitle.includes('full page')) {
            svg.outerHTML = '<img src="/assets/rama_ui/images/expand-solid-full.svg" style="width:14px; margin-right:4px; filter: brightness(0) invert(1);" alt="Full Page"/>';
        }
        else if (lowerTitle.includes('pdf')) {
            svg.outerHTML = '<img src="/assets/rama_ui/images/file-pdf-solid-full.svg" style="width:14px; margin-right:4px; filter: brightness(0) invert(1);" alt="PDF"/>';
        }
        else if (lowerTitle.includes('previous')) {
            svg.outerHTML = '<i class="fas fa-angle-left" style="color:#ffffff; font-size:14px; margin-right:4px;"></i>';
        }
        else if (lowerTitle.includes('next')) {
            svg.outerHTML = '<i class="fas fa-angle-right" style="color:#ffffff; font-size:14px; margin-right:4px;"></i>';
        }
        else if (lowerTitle.includes('filter') && !btn.classList.contains('filter-x-button')) {
            svg.outerHTML = '<i class="fas fa-filter" style="color:#ffffff; font-size:12px; margin-right:4px;"></i>';
        }
        else if (btn.classList.contains('filter-x-button') || lowerTitle.includes('clear all filters')) {
            svg.outerHTML = '<i class="fas fa-times" style="color:#ffffff; font-size:14px;"></i>';
        }
    });
};

document.addEventListener("DOMContentLoaded", replaceFormIcons);
const formIconObserver = new MutationObserver(replaceFormIcons);
formIconObserver.observe(document.body, { childList: true, subtree: true });
