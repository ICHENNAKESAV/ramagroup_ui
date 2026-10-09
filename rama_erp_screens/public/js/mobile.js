document.addEventListener("DOMContentLoaded", () => {
    if (screenWidth > 500) return
        const target = document.querySelector('.navbar-collapse.collapse');
    const toggler = document.querySelector(".navbar-toggler");

    if (!target || !toggler) return;

    toggler.style.border = '1px solid white'
    toggler.style.borderRadius = '3px'
    toggler.style.boxShadow = '0px 0px 5px grey'
    const svg = toggler.querySelector("svg");
    if (svg) {
        svg.style.fill = "white";
        svg.style.stroke = "white";

        svg.querySelectorAll("*").forEach(el => {
            el.style.fill = "white";
            el.style.stroke = "white";
        });
    }

    Object.assign(target.style, {
        position: 'fixed',
        top: '0',
        right: '-200px',
        width: '200px',
        height: '100%',
        background: '#fff',
        zIndex: '999999',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.3)',
        transition: 'right 0.3s ease',
        overflowY: 'auto',
        padding: '30px 10px',
        display: 'block',
    });

    target.classList.remove('collapse', 'navbar-collapse', 'collapsing');

    toggler.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = target.style.right === '0px';

        if (!isOpen) {
            target.style.right = '0';
        } else {
            target.style.right = '-200px';
        }
    });

    document.addEventListener('click', (e) => {
        if (target.style.right === '0px' && !target.contains(e.target) && !toggler.contains(e.target)) {
            target.style.right = '-200px';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && target.style.right === '0px') {
            target.style.right = '-200px';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdownLi = document.querySelector('#website-post-login');

    if (screenWidth > 500) return;
    const data = document.querySelector('.dropdown-menu.dropdown-menu-right')
    if (data) {
        data.style.border = 'none'
        data.style.boxShadow = 'none'
    }
    if (!dropdownLi) return;
    dropdownLi.style.display = 'none'
    Object.assign(dropdownLi.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxShadow: 'none',
        padding: '0',
        margin: '0',
    });

    const toggle = dropdownLi.querySelector('a.nav-link.nav-avatar');
    if (toggle) toggle.remove();

    const menu = dropdownLi.querySelector('.dropdown-menu');

    if (!menu) return;
    menu.style.display = 'none'

    Object.assign(menu.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'static',
        background: 'transparent',
        boxShadow: 'none',
        padding: '0',
        margin: '0',
    });

    menu.querySelectorAll('.dropdown-item').forEach(item => {
        Object.assign(item.style, {
            display: 'block',
            padding: '6px 10px',
            marginBottom: '5px',
            color: '#525252',
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            cursor: 'pointer',
        });
    });
    dropdownLi.classList.remove('dropdown', 'logged-in');

});
