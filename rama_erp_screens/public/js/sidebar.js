
var screenwidth = window.screen.width;

(function () {
    if (screenwidth < 1000) return;

    const styleId = 'frappe-ultimate-sidebar-fix';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            :root {
                --sidebar-width: 280px;
            }

            @media (max-width: 1500px) {
                :root {
                    --sidebar-width: 240px;
                }
            }

            @media (max-width: 1100px) {
                :root {
                    --sidebar-width: 170px;
                }
            }

            body.sb-open .layout-side-section, 
            body.sb-open .col-lg-2 {
                display: block !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                height: 100vh !important;
                z-index: 99999 !important;
                width: var(--sidebar-width) !important;
                backdrop-filter : blur(50px) !important;
                padding-top: 150px !important;
                background : #d9edfa;
                transition: all 0.3s ease !important;
                border-right: 1px solid #3c3e41 !important;
                overflow-y: auto !important;
                box-shadow: 0px 0 10px rgba(44, 40, 40, 0.05);
            }

            body.sb-open .layout-side-section::after,
            body.sb-open .col-lg-2::after {
                content: '';
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                width: 240px;
                height: 120px;
                background-image: url('/assets/rama_erp_screens/images/rama_logo.png');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                z-index: 100002;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                padding-bottom: 20px !important;
            }

            body.sb-open .standard-sidebar-item .item-anchor {
                font-weight: 500 !important;
                padding: 10px 15px !important;
                display: flex !important;
                width: 100% !important;
                text-decoration: none !important;
                border-left: 4px solid transparent !important;
                transition: all 0.2s ease !important;
                font-size:15px !important ;
            }

            body.sb-open .standard-sidebar-item:hover .item-anchor {
                border-left: 4px solid #073869 !important;
                background-color: rgba(79, 70, 229, 0.05) !important;
                margin-left: 5px !important;
                border-radius: 5px 0px 0px 5px;
            }

            body.sb-open .standard-sidebar-item.selected .item-anchor {
                border-left: 4px solid #073869 !important;
                background-color: #ffffff !important;
                font-weight: 700 !important;
                box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            }

            .custom-toggle {
                background: transparent !important;
                color: #fff !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 25px !important;
                margin: 5px 10px !important;
                cursor: pointer;
                vertical-align: middle !important;
            }
            .custom-toggle:active {
                background : none !important;
            }

            body.sb-closed .layout-side-section { display: none !important; }

            body.sb-open .layout-main-section-wrapper,
            body.sb-open .page-head {
                margin-left: var(--sidebar-width) !important;
                width: calc(100% - var(--sidebar-width)) !important;
                transition: margin-left 0.3s ease, width 0.3s ease !important;
            }

            body.sb-closed .layout-main-section-wrapper,
            body.sb-closed .page-head {
                margin-left: 0 !important;
                width: 100% !important;
                transition: margin-left 0.3s ease, width 0.3s ease !important;
            }

            /* Fix for fixed navbars if they overlap */
            body.sb-open .navbar {
                left: var(--sidebar-width) !important;
                width: calc(100% - var(--sidebar-width)) !important;
                transition: left 0.3s ease, width 0.3s ease !important;
            }

            body.sb-closed .navbar {
                margin-left: 0 !important;
                left: 0 !important;
                width: 100% !important;
                transition: margin-left 0.3s ease, left 0.3s ease, width 0.3s ease !important;
            }

            /* --- LOGIN PAGE FIX --- */
            body.is-login-page .layout-side-section,
            body.is-login-page .col-lg-2,
            body.is-login-page #custom-sidebar-toggle {
                display: none !important;
            }
            body.is-login-page .navbar {
                display: none !important;
            }
            body.is-login-page .layout-main-section-wrapper,
            body.is-login-page .page-head {
                margin-left: 0 !important;
                left: 0 !important;
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);

        // Add login page check
        if (window.location.pathname === '/login' || document.getElementById('page-login')) {
            document.body.classList.add('is-login-page');
        }


        const injectLogo = () => {
            const sidebar = document.querySelector('.layout-side-section') || document.querySelector('.col-lg-2');

            if (sidebar && !document.getElementById('custom-sidebar-logo')) {
                const logoContainer = document.createElement('div');
                logoContainer.id = 'custom-sidebar-logo';
                logoContainer.className = 'sb-logo-wrapper';

                logoContainer.innerHTML = `
            <img src = "/assets/rama_erp_screens/images/rama_logo.png" alt = "Logo" style = "width: 100%; max-width: 240px; height: 120px; object-fit: contain; display: block; margin: 0 auto;">
                `;

                sidebar.prepend(logoContainer);
            }
        };

        if (document.body.classList.contains('sb-open')) {
            injectLogo();
        }
    }

    const applyState = () => {
        const state = localStorage.getItem('sb_state') || 'open';
        document.body.classList.toggle('sb-open', state === 'open');
        document.body.classList.toggle('sb-closed', state === 'closed');
    };

    document.addEventListener('click', function (e) {
        if (document.body.classList.contains('sb-open')) {
            const side = document.querySelector('.layout-side-section, .col-lg-2');
            if (side) {
                const rect = side.getBoundingClientRect();
                if (e.clientX> (rect.right - 50) && e.clientY < 60) {
                    localStorage.setItem('sb_state', 'closed');
                    applyState();
                    return;
                }
            }
        }

        if (e.target && e.target.id === 'custom-sidebar-toggle') {
            const newState = document.body.classList.contains('sb-open') ? 'closed' : 'open';
            localStorage.setItem('sb_state', 'newState');
            localStorage.setItem('sb_state', newState);
            applyState();
        }
    });

    // document.addEventListener('mousedown', function (e) {
    //     if (document.body.classList.contains('sb-open')) {
    //         const side = document.querySelector('.layout-side-section, .col-lg-2');

    //         if (side && !side.contains(e.target) && e.target.id !== 'custom-sidebar-toggle') {
    //             localStorage.setItem('sb_state', 'closed');
    //             applyState();
    //         }
    //     }
    // });

    const refreshUI = () => {
        applyState();

        const route = window.location.hash;
        const isDesk = route === "" || route === "#desk" || route.includes('workspace');
        if (!isDesk) return;

        const navarea = document.querySelector('.navbar.navbar-expand');
        if (navarea && !document.getElementById('custom-sidebar-toggle')) {
            const btn = document.createElement('button');
            btn.style.border = 'none';
            btn.style.background = 'transparent';
            // btn.id = 'custom-sidebar-toggle';
            // btn.className = 'btn btn-default custom-toggle';
            btn.innerHTML = `
                <img
        src = "/assets/rama_erp_screens/images/bars-solid.svg"
        alt = "menu icon"
        style = "width:50px;height:50px;display:block"
        class = 'btn btn-default custom-toggle'
        id = 'custom-sidebar-toggle'
            />
            `;
            // btn.style.marginRight = '20%'
            navarea.prepend(btn);

        }
    };

    const drawerobserver = new MutationObserver(refreshUI);
    drawerobserver.observe(document.body, { childList: true, subtree: true });

    $(document).on('page-change route-change', refreshUI);
    window.addEventListener('hashchange', refreshUI);

    refreshUI();
})();



// const toggleicon = () => {

//     if (screenwidth < 1000) return

//     const element = document.querySelector('.col-md-4.col-sm-6.col-xs-7.page-title');
//     if (!element) return
//     const toggleicon = element.querySelector('.btn-reset.sidebar-toggle-btn')
//     if (toggleicon) {
//         toggleicon.style.display = 'none'
//     }
// }

// const toggleobserver = new MutationObserver(toggleicon);
// toggleobserver.observe(document.body, { childList: true, subtree: true })



(function () {
    if (screenwidth < 1000) return;

    const hideFrappeToggle = (toggleBtn) => {
        if (!toggleBtn || toggleBtn.dataset.hiddenByCustom) return;
        toggleBtn.style.display = 'none';
        toggleBtn.dataset.hiddenByCustom = '1';
    };

    const observeBodyForToggle = () => {
        document.querySelectorAll('.page-title .btn-reset.sidebar-toggle-btn').forEach(hideFrappeToggle);

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;

                    if (node.matches('.page-title .btn-reset.sidebar-toggle-btn')) {
                        hideFrappeToggle(node);
                    }

                    node.querySelectorAll && node.querySelectorAll('.page-title .btn-reset.sidebar-toggle-btn')
                        .forEach(hideFrappeToggle);
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    observeBodyForToggle();
})();

// function replaceGettingStartedIcon() {
//     const homeicon = document.querySelector('.sidebar-item-icon[item-icon="getting-started"]');
//     if (homeicon) {
//         const svg = homeicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/house-solid.svg');
//         img.setAttributeNS(null, 'width', '18');
//         img.setAttributeNS(null, 'height', '18');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }

//     const accounticon = document.querySelector('.sidebar-item-icon[item-icon="accounting"]');
//     if (accounticon) {
//         const svg = accounticon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/profit.png');
//         img.setAttributeNS(null, 'width', '18');
//         img.setAttributeNS(null, 'height', '18');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const buyingicon = document.querySelector('.sidebar-item-icon[item-icon="buying"]');
//     if (buyingicon) {
//         const svg = buyingicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/shopping-bag.png');
//         img.setAttributeNS(null, 'width', '18');
//         img.setAttributeNS(null, 'height', '18');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const sellingicon = document.querySelector('.sidebar-item-icon[item-icon="sell"]');
//     if (sellingicon) {
//         const svg = sellingicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/money.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const stockicon = document.querySelector('.sidebar-item-icon[item-icon="stock"]');
//     if (stockicon) {
//         const svg = stockicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/product.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const asseticon = document.querySelector('.sidebar-item-icon[item-icon="assets"]');
//     if (asseticon) {
//         const svg = asseticon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/asset.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const manufacturingicon = document.querySelector('.sidebar-item-icon[item-icon="organization"]');
//     if (manufacturingicon) {
//         const svg = manufacturingicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/automation.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const qualityicon = document.querySelector('.sidebar-item-icon[item-icon="quality"]');
//     if (qualityicon) {
//         const svg = qualityicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/quality-assurance.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const educationicon = document.querySelector('.sidebar-item-icon[item-icon="education"]');
//     if (educationicon) {
//         const svg = educationicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/presentation.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const projectsicon = document.querySelector('.sidebar-item-icon[item-icon="project"]');
//     if (projectsicon) {
//         const svg = projectsicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/working.png');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const supporticon = document.querySelector('.sidebar-item-icon[item-icon="support"]');
//     if (supporticon) {
//         const svg = supporticon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/headset.svg');
//         img.setAttributeNS(null, 'width', '18');
//         img.setAttributeNS(null, 'height', '18');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }
//     const usersicon = document.querySelector('.sidebar-item-icon[item-icon="users"]');
//     if (usersicon) {
//         const svg = usersicon.querySelector('svg');
//         if (!svg) return;
//         if (svg.querySelector('.homeimage')) return;
//         svg.innerHTML = '';
//         svg.style.alignContent = 'center'
//         const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//         img.setAttributeNS(null, 'href', '/assets/rama_erp_screens/images/users.svg');
//         img.setAttributeNS(null, 'width', '20');
//         img.setAttributeNS(null, 'height', '20');
//         img.setAttributeNS(null, 'x', '0');
//         img.setAttributeNS(null, 'y', '0');
//         img.setAttributeNS(null, 'class', 'homeimage');
//         svg.appendChild(img);
//     }


// }

// document.addEventListener("DOMContentLoaded", replaceGettingStartedIcon);

// const iconsobserver = new MutationObserver(replaceGettingStartedIcon);
// iconsobserver.observe(document.body, {
//     childList: true,
//     subtree: true
// });

