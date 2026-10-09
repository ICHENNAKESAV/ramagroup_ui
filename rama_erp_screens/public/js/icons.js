
const replaceMenuIcon = () => {
    const labels = document.querySelectorAll('.menu-btn-group-label');
    labels.forEach(label => {
        const svg = label.querySelector('svg');
        if (svg) svg.remove();

        if (!label.querySelector('img')) {
            const img = document.createElement('img');
            img.src = "/assets/rama_erp_screens/images/option.png";
            img.alt = "Options";
            img.style.width = "16px";
            img.style.height = "16px";
            img.style.objectFit = "contain";
            label.appendChild(img);
        }
    });
}

document.addEventListener("DOMContentLoaded", replaceMenuIcon);

const observer1 = new MutationObserver(replaceMenuIcon);
observer1.observe(document.body, {
    childList: true,
    subtree: true
});


const replacePageIcon = () => {
    const pageButtons = document.querySelectorAll('.page-icon-group button');
    pageButtons.forEach(btn => {
        const reloadtitle = btn.getAttribute('data-original-title') || btn.title;
        if (reloadtitle == 'Reload List') {
            const svg = btn.querySelector('svg');
            if (svg) svg.remove();

            if (!btn.querySelector('img')) {
                const img = document.createElement('img');
                img.src = "/assets/rama_erp_screens/images/reload.png";
                img.alt = "Reload";
                img.style.width = "16px";
                img.style.height = "16px";
                img.style.rotate = "29deg";
                img.style.objectFit = "contain";
                img.style.transition = "transform  0.5s";
                btn.appendChild(img);
                img.addEventListener('click', () => {
                    img.style.transform = "rotate(360deg)";

                    setTimeout(() => {
                        img.style.transform = "rotate(0deg)";
                    }, 500);
                });
            }
        }

        const printtitle = btn.getAttribute('data-original-title') || btn.title;
        if (printtitle == 'Print') {
            const svg = btn.querySelector('svg');
            if (svg) svg.remove();
            if (!btn.querySelector('img')) {
                const img = document.createElement('img');
                img.src = "/assets/rama_erp_screens/images/print-solid-full.svg";
                img.alt = "Reload";
                img.style.width = "20px";
                img.style.height = "20px";
                // img.style.rotate = "29deg";
                img.style.objectFit = "contain";
                img.style.transition = "transform 0.25s ease";
                btn.appendChild(img);

                img.addEventListener('mouseenter', () => {
                    img.style.transform = "rotate(29deg)";

                    setTimeout(() => {
                        img.style.transform = "rotate(-29deg)";
                    }, 150);

                    setTimeout(() => {
                        img.style.transform = "rotate(-29deg)";
                    }, 300);
                    setTimeout(() => {
                        img.style.transform = "rotate(0deg)";
                    }, 400);
                });
                img.addEventListener('mouseout', () => {
                    img.style.transform = "rotate(0deg)";
                })
            }


        }
    });
}



document.addEventListener("DOMContentLoaded", replacePageIcon);

const observer2 = new MutationObserver(replacePageIcon);
observer2.observe(document.body, {
    childList: true,
    subtree: true
});


function replaceCustomButtonIcon() {
    const customButtons = document.querySelectorAll('.custom-btn-group .btn.btn-default.btn-sm.ellipsis');
    customButtons.forEach(btn => {
        const hiddenSpan = btn.querySelector('.hidden-xs');
        if (hiddenSpan) {
            const svgs = hiddenSpan.querySelectorAll('.icon.icon-sm');
            svgs.forEach(svg => svg.remove());

            if (!hiddenSpan.querySelector('img')) {
                const img = document.createElement('img');
                img.src = "/assets/rama_erp_screens/images/menu.png";
                img.alt = "Options";
                img.style.width = "16px";
                img.style.height = "16px";
                img.style.objectFit = "contain";
                hiddenSpan.insertBefore(img, hiddenSpan.firstChild);


            }
        }
    });
}
replaceCustomButtonIcon();
const observer = new MutationObserver(replaceCustomButtonIcon);
observer.observe(document.body, { childList: true, subtree: true });


// function replaceAddItemIcon() {
//     const addItemButton = document.querySelector('.btn-primary.primary-action');

//     if (addItemButton) {
//         const textSpan = addItemButton.querySelector('.hidden-xs');
//         if (textSpan) {
//             const svg = addItemButton.querySelector('svg');
//             if (svg) svg.remove();

//             if (!textSpan.querySelector('img')) {
//                 const img = document.createElement('img');
//                 img.src = "/assets/rama_erp_screens/images/add.png";
//                 img.alt = "Options";
//                 img.style.width = "16px";
//                 img.style.height = "16px";
//                 img.style.objectFit = "contain";
//                 img.style.marginRight = "4px";

//                 textSpan.insertBefore(img, textSpan.firstChild);
//             }
//         }
//     }
// }


// function replaceAddItemIcon() {
//     const addItemButton = document.querySelector('.btn-primary.primary-action');
//     if (addItemButton) {

//         const textSpan = addItemButton.querySelector('.hidden-xs');
//         if (textSpan) {

//             const buttonText = textSpan.textContent.trim().toLowerCase();

//             if (buttonText === 'print') {
//                 const svg = addItemButton.querySelector('svg');
//                 if (svg) svg.remove();

//                 if (!textSpan.querySelector('img')) {
//                     const img = document.createElement('img');
//                     img.src = "/assets/rama_erp_screens/images/print-solid-full.svg";
//                     img.alt = "Options";
//                     img.style.width = "16px";
//                     img.style.height = "16px";
//                     img.style.objectFit = "contain";
//                     img.style.marginRight = "4px";

//                     textSpan.insertBefore(img, textSpan.firstChild);
//                 }
//             }
//             else {
//                 const svg = addItemButton.querySelector('svg');
//                 if (svg) svg.remove();

//                 if (!textSpan.querySelector('img')) {
//                     const img = document.createElement('img');
//                     img.src = "/assets/rama_erp_screens/images/plus-solid-full.svg";
//                     img.alt = "Options";
//                     img.style.width = "16px";
//                     img.style.height = "16px";
//                     img.style.objectFit = "contain";
//                     img.style.marginRight = "4px";

//                     textSpan.insertBefore(img, textSpan.firstChild);
//                 }
//             }


//         }
//     }
// }

// function replaceAddItemIcon() {
//     if (screenWidth < 500) return
//     const buttons = document.querySelectorAll('.btn-primary.primary-action');

//     buttons.forEach(addItemButton => {
//         const textSpan = addItemButton.querySelector('.hidden-xs');
//         if (!textSpan) return;

//         const buttonText = textSpan.textContent.trim().toLowerCase();

//         // Remove existing SVG
//         const svg = addItemButton.querySelector('svg');
//         if (svg) svg.remove();

//         // Prevent duplicate images
//         if (textSpan.querySelector('img')) return;

//         const img = document.createElement('img');

//         if (buttonText === 'print') {
//             img.src = "/assets/rama_erp_screens/images/printer.png";
//             img.style.width = '13px';
//             img.style.height = '13px';
//         } else {
//             img.src = "/assets/rama_erp_screens/images/plus-solid-full.svg";
//             img.style.width = "16px";
//             img.style.height = "16px";
//         }

//         img.alt = "Icon";

//         img.style.objectFit = "contain";
//         img.style.marginRight = "4px";

//         textSpan.insertBefore(img, textSpan.firstChild);
//     });
// }

function replaceAddItemIcon() {
    // if (screenWidth < 500) return;

    const buttons = document.querySelectorAll('.btn-primary.primary-action');

    buttons.forEach(button => {
        const label = button.dataset.label?.toLowerCase();
        if (!label) return;

        // Remove existing svg icons
        const svg = button.querySelector('svg');
        if (svg) svg.remove();

        // Prevent duplicate images
        if (button.querySelector('img[data-btn-icon]')) return;

        const img = document.createElement('img');
        img.setAttribute('data-btn-icon', 'true');

        if (label === 'print') {
            img.src = "/assets/rama_erp_screens/images/printer.png";
            img.style.width = '13px';
            img.style.height = '13px';
            img.style.marginLeft = screenWidth < 500 && '25%';

        } else {
            img.src = "/assets/rama_erp_screens/images/plus-solid-full.svg";
            img.style.width = '16px';
            img.style.height = '16px';
        }

        img.alt = "Icon";
        img.style.objectFit = "contain";
        img.style.marginRight = "4px";

        // Insert icon at the start of the button
        button.insertBefore(img, button.firstChild);
    });
}




document.addEventListener('DOMContentLoaded', replaceAddItemIcon);

const observer3 = new MutationObserver(replaceAddItemIcon);
observer3.observe(document.body, {
    childList: true,
    subtree: true
});

function replaceCustomActionIcons() {
    const buttons = document.querySelectorAll('.custom-actions .btn.btn-default.btn-sm.ellipsis');

    buttons.forEach(btn => {
        const label = btn.textContent.trim().toLowerCase();

        // Remove existing SVG
        const svg = btn.querySelector('svg');
        if (svg) svg.remove();

        // Prevent duplicate images
        if (btn.querySelector('img')) return;

        const img = document.createElement('img');

        img.style.height = "16px";
        img.style.objectFit = "contain";
        img.style.marginRight = "2px";

        if (label.includes('full page')) {
            img.src = "/assets/rama_erp_screens/images/expand-solid-full.svg";
            img.alt = "Full Page";
            img.style.width = "17px";
            img.style.height = "17px";
        }
        else if (label.includes('pdf')) {
            img.src = "/assets/rama_erp_screens/images/file-lines-solid-full.svg";
            img.alt = "PDF";

            img.style.height = "17px";
        }
        else if (label.includes('refresh')) {
            img.src = "/assets/rama_erp_screens/images/reload.svg";
            img.alt = "Refresh";
        }
        else {
            return; // unknown button → do nothing
        }

        btn.insertBefore(img, btn.firstChild);
    });
}
document.addEventListener('DOMContentLoaded', replaceCustomActionIcons);

const observer4 = new MutationObserver(replaceCustomActionIcons)

observer4.observe(document.body, {
    childList: true,
    subtree: true
});


function replaceFormIcon() {
    const formButtons = document.querySelectorAll(
        '.standard-actions .page-icon-group button'
    );

    formButtons.forEach(btn => {
        const title =
            btn.getAttribute('data-original-title') ||
            btn.getAttribute('title');

        if (title !== 'Form') return;

        const svg = btn.querySelector('svg');
        if (svg) svg.remove();

        // Prevent duplicate images
        if (btn.querySelector('img')) return;

        const img = document.createElement('img');
        img.src = "/assets/rama_erp_screens/images/form.svg";
        img.alt = "Form";
        img.style.width = "18px";
        img.style.height = "18px";
        img.style.objectFit = "contain";

        btn.appendChild(img);
    });
}
document.addEventListener('DOMContentLoaded', replaceFormIcon);

const observerForm = new MutationObserver(replaceFormIcon)

observerForm.observe(document.body, {
    childList: true,
    subtree: true
});



