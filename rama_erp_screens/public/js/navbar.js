

const preloginNavbar = () => {
    const body = document.querySelector('body')
    if (body) {
        body.style.backgroundColor = '#fffdf7'
    }
    const navbar = document.querySelector('.navbar.navbar-light.navbar-expand-lg');
    if (navbar) {
        navbar.style.background = 'linear-gradient(135deg, #073869, #073869)'
        navbar.style.border = 'none';
        navbar.style.boxShadow = '0px 2px 5px #5252'
        navbar.style.height = '55px'

        const logo = navbar.querySelector('.navbar-brand')
        if (navbar) {
            if (logo) {
                logo.style.marginTop = '6px'
                logo.innerHTML = `
                                <span style="color: #fff; font-weight: bold; font-size: 20px;">RAMA Group</span>
                                `;
            }

        }
    }
}


const postLoginNavbar = () => {
    const navbars = document.getElementsByClassName('navbar');
    if (navbars.length > 0) {
        Array.from(navbars).forEach(nav => {
            if (nav.classList.contains('navbar-expand')) {
                // nav.style.background = 'linear-gradient(90deg,#007e85 0%,#007e85dc 30%,#007e85d8 60%,#007e85dc 80%,#007e85 100%)';
                nav.style.background = 'linear-gradient(135deg, #073869, #073869)';
                nav.style.backgroundColor = 'red';
                nav.style.boxShadow = '0px 2px 5px #5252';
                nav.style.height = '50px'


                const navContainer = nav.querySelector('.container');
                if (navContainer) {
                    const logo = navContainer.querySelector('.navbar-brand.navbar-home')
                    if (logo) {
                        logo.style.marginTop = '6px'
                        logo.innerHTML = `
                                       <span style="color: #fff; font-weight: bold; font-size: 20px;">RAMA Group</span>
                                        `;

                    }
                    const navSubdiv = document.querySelector('.collapse.navbar-collapse.justify-content-end')
                    searchtab(navSubdiv);
                    notificationstab(navSubdiv);
                    helpsection(navSubdiv);
                    avatar(navSubdiv);
                }
            }
        });
    } else {
        setTimeout(postLoginNavbar, 100);
    }
}



const searchtab = (navSubdiv) => {
    const shortcutSearch = navSubdiv.querySelector('.input-group.search-bar.text-muted');
    const seacrchIcon = shortcutSearch.querySelector('.search-icon')
    if (shortcutSearch) {
        const awesomplete = document.querySelector('.awesomplete')
        {
            if (awesomplete) {
                awesomplete.style.backgroundColor = '#fff'
                awesomplete.style.boxShadow = '0px 0px 5px #888'
                awesomplete.style.borderRadius = '5px';
                const inputTag = awesomplete.querySelector('input')
                {
                    if (inputTag) {
                        inputTag.style.backgroundColor = '#fff'
                    }
                }
            }
        }
    }
    if (seacrchIcon) {
        const searchSvg = seacrchIcon.querySelector('svg');
        if (searchSvg) {
            searchSvg.style.stroke = '#888'
            searchSvg.style.strokeWidth = '1.5px'
        }
    }
}

const notificationstab = (navSubdiv) => {
    const notifications = navSubdiv.querySelector('.navbar-nav');
    if (notifications) {
        const notificationdiv = notifications.querySelector('.btn-reset.nav-link.notifications-icon.text-muted')
        if (notificationdiv) {
            notificationdiv.style.padding = '2px'
            notificationdiv.style.border = '1px solid #ccc'
            notificationdiv.style.borderRadius = '3px';
            notificationdiv.innerHTML = `<img src='/assets/rama_erp_screens/images/bell.png' alt='bell icon' style="height:16px;"/>`
        }
        const notificationsBox = notifications.querySelector('.dropdown-menu.notifications-list.dropdown-menu-right');
        if (notificationsBox) {
            notificationsBox.style.marginTop = '17px'
            notificationsBox.style.marginLeft = '5px'
            notificationsBox.style.boxShadow = '0px 0px 7px grey';
            notificationsBox.style.borderRadius = '5px'
            notificationsBox.style.backgroundColor = '#fff'

            const dropdownHead = notificationsBox.querySelector('.notification-list-header');
            const notificationHeadButtons = dropdownHead.querySelector('.header-actions')
            if (dropdownHead) {
                dropdownHead.style.borderBottom = '1px solid #073869'
                const categories = dropdownHead.querySelectorAll('.notifications-category');
                const applyStyles = () => {
                    categories.forEach(cat => {
                        cat.style.color = '#073869.';
                        cat.style.borderBottom = 'none';
                        cat.style.transition = 'color 0.5s, border-bottom 0.5s';
                    });
                    const active = dropdownHead.querySelector('.notifications-category.active');
                    if (active) {
                        active.style.color = '##073869';
                        active.style.borderBottom = '1px solid #073869.';
                        active.style.transition = 'color 0.5s, border-bottom 0.5s';
                    }
                };
                applyStyles();

                // mutation observer created here to make the changes dynamically
                const observer = new MutationObserver(() => {
                    applyStyles();
                });
                observer.observe(dropdownHead, {
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
            if (notificationHeadButtons) {
                const icons = notificationHeadButtons.querySelectorAll('span');

                if (icons) {

                    const iconslist = Array.from(icons)
                    iconslist.map((a) => {
                        a.style.border = '1px solid #ccc';
                        a.style.borderRadius = '3px';
                        a.style.padding = '2px';
                        const svgicons = a.querySelector('svg')
                        if (svgicons) {

                            svgicons.style.stroke = '1b1b1be3';
                            svgicons.style.strokeWidth = '1.5px'
                        }
                    })
                }
            }

        }
    }
}

const helpsection = (navSubdiv) => {
    const helpSection = navSubdiv.querySelector('.nav-item.dropdown.dropdown-help.dropdown-mobile.d-none.d-lg-block')
    if (helpSection) {
        const help = helpSection.querySelector('button span');
        const helpSvg = helpSection.querySelector('button span>svg');
        if (help) {
            help.style.color = '#fff';
            if (helpSvg) {
                helpSvg.style.stroke = '#fff';
                helpSvg.style.strokeWidth = '1.5px';

            }
        }
    }
    const helpDropdown = helpSection.querySelector('.dropdown-menu.dropdown-menu-right')
    if (helpDropdown) {
        helpDropdown.style.marginTop = '18px';
        helpDropdown.style.boxShadow = '0px 0px 7px grey';
        helpDropdown.style.borderRadius = '5px'
        helpDropdown.style.backgroundColor = '#fff'
    }
}

const avatar = (navSubdiv) => {
    const avatarsection = navSubdiv.querySelector('.nav-item.dropdown.dropdown-navbar-user.dropdown-mobile')
    if (avatarsection) {
        const button = avatarsection.querySelector('.btn-reset.nav-link')
        const dropdown = avatarsection.querySelector('.dropdown-menu.dropdown-menu-right')
        if (button) {
            const avtarbtn = button.querySelector('.avatar.avatar-medium div')
            if (avtarbtn) {
                avtarbtn.style.backgroundColor = '#fff'
                avtarbtn.style.color = '#073869'
                avtarbtn.style.textTransform = 'uppercase '
                avtarbtn.style.fontWeight = '500'

            }
        }
        if (dropdown) {
            dropdown.style.marginTop = '18px';
            dropdown.style.boxShadow = '0px 0px 7px grey';
            dropdown.style.borderRadius = '2px'
            dropdown.style.backgroundColor = '#fff'
        }
        const logoutBtn = dropdown.querySelector('.dropdown-item[onclick="return frappe.app.logout()"]');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');

        if (logoutBtn) {
            logoutBtn.style.borderRadius = '2px';
            logoutBtn.style.color = '#383838';
            logoutBtn.style.transition = 'transform 0.3s ease';
            logoutBtn.style.color = '#383838';


            logoutBtn.addEventListener('mouseenter', () => {
                logoutBtn.style.background = '#e63946';
                logoutBtn.style.color = '#fff';
                logoutBtn.style.transform = 'scale(1.01)';
                logoutBtn.style.boxShadow = '0px 0px 5px #888';
            });

            logoutBtn.addEventListener('mouseleave', () => {
                logoutBtn.style.background = 'transparent';
                logoutBtn.style.color = '#383838';
                logoutBtn.style.transform = 'scale(1)';
                logoutBtn.style.boxShadow = 'none';

            });
        }

        dropdownItems.forEach(item => {

            if (item === logoutBtn) return;

            item.style.color = '#383838';
            item.style.borderRadius = '2px';
            item.style.transition = 'transform 0.3s ease';


            item.addEventListener('mouseenter', () => {
                item.style.color = '#fff';
                item.style.background = 'linear-gradient(135deg, #073869, #073869)';
                item.style.transform = 'scale(1.02)';
                item.style.boxShadow = 'none';
            });

            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
                item.style.color = '#383838';
                logoutBtn.style.transform = 'scale(1)';
                logoutBtn.style.boxShadow = 'none';
            });
        });
    }
}

// const dropdownMenu = document.querySelector('.navbar-collapse.collapse.show');

// if (dropdownMenu) {
//     alert('hey')
//     dropdownMenu.style.zIndex = '999999';
//     dropdownMenu.style.background = '#fff';
//     dropdownMenu.style.width = 'max-content';
//     dropdownMenu.style.borderRight = '1px solid #ccc';
//     dropdownMenu.style.marginTop = '10px';
//     dropdownMenu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
// }

// const target = document.querySelector('.navbar-collapse.collapse');

// if (target) {
//     const toggler = document.querySelector(".navbar-toggler");

//     if (!toggler) return;

//     const svg = toggler.querySelector("svg");
//     if (!svg) return;

//     // Force SVG to inherit color
//     svg.style.fill = "white";
//     svg.style.stroke = "white";

//     // Also force all inner paths (for hard-coded fills)
//     svg.querySelectorAll("*").forEach(el => {
//         el.style.fill = "white";
//         el.style.stroke = "white";
//     });
//     const observer = new MutationObserver(() => {
//         if (target.classList.contains('show')) {
//             target.style.zIndex = '999999';
//             target.style.background = '#fff';
//             target.style.width = 'max-content';
//             target.style.marginTop = '10px';
//             target.style.boxShadow = '0 0px 8px #888';
//         }
//     });

//     observer.observe(target, {
//         attributes: true,
//         attributeFilter: ['class']
//     });
// }


// document.addEventListener("DOMContentLoaded", () => {
//     const target = document.querySelector('.navbar-collapse.collapse');
//     const toggler = document.querySelector(".navbar-toggler");

//     if (!target || !toggler) return;

//     // --- Force SVG icon to white ---
//     const svg = toggler.querySelector("svg");
//     if (svg) {
//         svg.style.fill = "white";
//         svg.style.stroke = "white";

//         svg.querySelectorAll("*").forEach(el => {
//             el.style.fill = "white";
//             el.style.stroke = "white";
//         });
//     }

//     // --- Observe menu open/close ---
//     const observer = new MutationObserver(() => {
//         if (target.classList.contains('show')) {
//             target.style.zIndex = '999999';
//             target.style.background = '#fff';
//             target.style.width = '200px';
//             target.style.padding = '30px 5px';
//             target.style.marginTop = '-50px';
//             target.style.boxShadow = '0 0 8px #888';
//         } else {
//             // Reset styles when menu closes
//             target.style.zIndex = '';
//             target.style.background = '';
//             target.style.width = '';
//             target.style.marginTop = '';
//             target.style.boxShadow = '';
//         }
//     });

//     observer.observe(target, {
//         attributes: true,
//         attributeFilter: ['class']
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const dropdownLi = document.querySelector('#website-post-login');

//     if (!dropdownLi) return;

//     // 1️⃣ Make the <li> visible
//     dropdownLi.style.display = 'flex';       // show the nav item
//     dropdownLi.style.alignItems = 'center';  // align items properly

//     // 2️⃣ Remove the avatar toggle link
//     const toggle = dropdownLi.querySelector('a.nav-link.nav-avatar');
//     if (toggle) toggle.remove();

//     // 3️⃣ Get the dropdown menu
//     const menu = dropdownLi.querySelector('.dropdown-menu');

//     if (!menu) return;
//     menu.style.boxShadow = 'none'
//     // 4️⃣ Make the menu visible and remove dropdown styles
//     Object.assign(menu.style, {
//         display: 'flex',             // horizontal layout
//         position: 'static',          // normal flow
//         flexDirection: 'column',
//         alignItems: 'center',
//         background: 'transparent',
//         boxShadow: 'none',
//         padding: '0',
//         margin: '0',
//     });

//     // 5️⃣ Style each item
//     menu.querySelectorAll('.dropdown-item').forEach(item => {
//         Object.assign(item.style, {
//             display: 'block',
//             padding: '6px 10px',
//             marginRight: '10px',
//             color: 'red',          // white text for navbar
//             background: 'transparent',
//             boxShadow: 'none',
//             border: 'none',
//             cursor: 'pointer',
//         });
//     });

//     // 6️⃣ Remove dropdown-specific classes
//     dropdownLi.classList.remove('dropdown', 'logged-in');
// });


const observeHelpDropdown = () => {
    const waitForDropdown = setInterval(() => {
        const helpDropdown = document.querySelector('.nav-item.dropdown.dropdown-help.dropdown-mobile.d-none.d-lg-block .dropdown-menu.dropdown-menu-right');

        if (helpDropdown) {
            clearInterval(waitForDropdown);
            helpDropdown.style.marginTop = '18px';
            helpDropdown.style.boxShadow = '0px 0px 5px #ccc';
            helpDropdown.style.borderRadius = '2px';
            helpDropdown.style.transition = '0.5s';
            helpDropdown.style.backgroundColor = '#fff';

            const styleDropdownItems = (items) => {
                items.forEach(item => {
                    item.style.color = '#383838';
                    item.style.borderRadius = '2px';
                    item.style.transition = 'transform 0.3s ease'

                    item.addEventListener('mouseenter', () => {
                        item.style.color = '#fff';
                        item.style.background = 'linear-gradient(135deg, #073869, #073869)';
                        item.style.transform = 'scale(1.003)';
                        item.style.boxShadow = '0px 0px 5px #888';
                    });

                    item.addEventListener('mouseleave', () => {
                        item.style.background = 'transparent';
                        item.style.color = '#383838';
                        item.style.transform = 'scale(1)';
                        item.style.boxShadow = 'none';
                    });
                });
            };

            const initialItems = helpDropdown.querySelectorAll('.dropdown-item');
            if (initialItems.length > 0) styleDropdownItems(initialItems);

            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.matches('.dropdown-item')) {
                            styleDropdownItems([node]);
                        }

                        if (node.nodeType === 1) {
                            const nestedItems = node.querySelectorAll('.dropdown-item');
                            if (nestedItems.length > 0) styleDropdownItems(nestedItems);
                        }
                    });
                });
            });

            observer.observe(helpDropdown, {
                childList: true,
                subtree: true
            });
        }
    }, 100);
};

document.addEventListener('DOMContentLoaded', () => {
    observeHelpDropdown();
});




preloginNavbar();
postLoginNavbar();