(function() {
    function toggleSidebars() {
        var formSidebar = document.querySelector('.form-sidebar');
        var isFormSidebarVisible = formSidebar && formSidebar.offsetWidth > 0 && !formSidebar.classList.contains('hidden') && window.getComputedStyle(formSidebar).display !== 'none';
        var ramaSidebar = document.querySelector('.rama-unified-sidebar');
        
        if (isFormSidebarVisible) {
            if (ramaSidebar) {
                ramaSidebar.style.setProperty('display', 'none', 'important');
            }
            document.body.classList.add('rama-form-view-active');
        } else {
            if (ramaSidebar) {
                ramaSidebar.style.removeProperty('display');
            }
            document.body.classList.remove('rama-form-view-active');
        }
    }

    function initFormObserver() {
        if(window.ramaFormObserverInitialized) return;
        window.ramaFormObserverInitialized = true;
        
        var observer = new MutationObserver(function(mutations) {
            if(window.ramaFormToggleTimer) clearTimeout(window.ramaFormToggleTimer);
            window.ramaFormToggleTimer = setTimeout(toggleSidebars, 50);
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });

        if(window.frappe && window.frappe.router) {
            frappe.router.on('change', function() {
                setTimeout(toggleSidebars, 100);
            });
        }
        setTimeout(toggleSidebars, 500);
    }

    $(document).on("startup", function () {
        initFormObserver();
    });
    
    setTimeout(initFormObserver, 1000);
})();
