(function() {
const formtabssec = () => {
    const formtabssection = document.querySelector('.form-tabs-list');
    if (!formtabssection) return;
    formtabssection.style.borderBottom = 'none'

    const buttons = formtabssection.querySelectorAll('.nav-link');
    const activeButton = formtabssection.querySelector('.nav-link.active');
    const commentBox = document.querySelector('.comment-box')
    buttons.forEach(btn => {
        btn.style.color = '#073869';
        btn.style.borderBottom = 'none';
        btn.style.fontWeight = '400';
        btn.style.transition = 'border 0.2s';
    });

    if (activeButton) {
        activeButton.style.color = '#525252';
        // activeButton.style.fontWeight = '600';
        activeButton.style.borderBottom = '2px solid #073869';
    }
    if (commentBox) {
        commentBox.style.display = 'none'
    }
};

document.addEventListener('DOMContentLoaded', formtabssec);

const tabObserver = new MutationObserver(formtabssec);

tabObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
});


    // const styleFormInputs = () => {
    //     const selectors = `
    //         input.form-control,
    //         select.form-control,
    //         textarea.form-control,
    //         .link-field input,
    //         .awesomplete input
    //     `;

    //     document.querySelectorAll(selectors).forEach(el => {
    //         if (el.dataset.styled === 'true') return;

    //         el.style.borderRadius = '5px';
    //         el.style.backgroundColor = '#fff';
    //         el.style.boxShadow = '0 0 5px grey';

    //         el.dataset.styled = 'true';
    //     });
    // };

    // document.addEventListener('DOMContentLoaded', styleFormInputs);

    // const inputObserver = new MutationObserver(styleFormInputs);

    // inputObserver.observe(document.body, {
    //     childList: true,
    //     subtree: true
    // });



// const styleFormControls = () => {
//     const inputSelectors = `
//         input.form-control,
//         select.form-control,
//         textarea.form-control,
//         .link-field input,
//         .awesomplete input
//     `;

//     const header = document.querySelector('.ql-toolbar.ql-snow');
//     if (header) {
//         header.style.backgroundColor = '#fff';
//         header.style.boxShadow = '0 0 5px grey';
//     }

//     document.querySelectorAll(inputSelectors).forEach(el => {
//         if (el.dataset.styled === 'true') return;

//         el.style.borderRadius = '5px';
//         el.style.boxShadow = '0 0 5px grey';
//         el.style.backgroundColor = '#fff';

//         el.dataset.styled = 'true';
//     });


//     document
//         .querySelectorAll('.frappe-control[data-fieldtype="Text Editor"]')
//         .forEach(control => {

//             const toolbar = control.querySelector('.ql-toolbar.ql-snow');
//             if (toolbar && !toolbar.dataset.styled) {
//                 toolbar.style.borderRadius = '5px 5px 0 0';
//                 toolbar.style.boxShadow = '0 0 5px grey';
//                 toolbar.style.border = '1px solid #d1d8dd';
//                 toolbar.style.backgroundColor = '#fff';

//                 toolbar.dataset.styled = 'true';
//             }

//             const container = control.querySelector('.ql-container.ql-snow');
//             if (container && !container.dataset.styled) {
//                 container.style.borderRadius = '0 0 5px 5px';
//                 container.style.boxShadow = '0 0 5px grey';
//                 container.style.border = '1px solid #d1d8dd';
//                 container.style.borderTop = 'none';
//                 container.style.overflow = 'hidden';

//                 const editor = container.querySelector('.ql-editor');
//                 if (editor) {
//                     editor.style.minHeight = '120px';
//                     editor.style.backgroundColor = '#fff';
//                 }

//                 container.dataset.styled = 'true';
//             }
//         });
// };

// document.addEventListener('DOMContentLoaded', styleFormControls);

// const formControlObserver = new MutationObserver(styleFormControls);

// formControlObserver.observe(document.body, {
//     childList: true,
//     subtree: true
// });

const styleGrid = () => {
    document.querySelectorAll('.form-grid .grid-heading-row').forEach(header => {
        if (header.dataset.styled === 'true') return;

        header.style.backgroundColor = '#073869';
        header.style.color = '#fff';

        header.querySelectorAll('.static-area, span').forEach(el => {
            el.style.color = '#ffffff';
        });

        header.querySelectorAll('svg').forEach(svg => {
            svg.style.fill = '#ffffff';
            svg.style.stroke = '#ffffff';
        });

        header.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.style.outline = '1px solid #ffffff';
            cb.style.borderColor = '#ffffff';
        });

        header.dataset.styled = 'true';
    });

    document.querySelectorAll('.form-clickable-section .btn').forEach(btn => {
        if (btn.dataset.styledBtn === 'true') return;

        if (btn.classList.contains('btn-danger')) {
            btn.style.backgroundColor = '#525252';
        } else {
            btn.style.backgroundColor = '#073869';
        }

        btn.style.color = '#ffffff';
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';

        btn.dataset.styledBtn = 'true';
    });
};


document.addEventListener('DOMContentLoaded', styleGrid);

const gridObserver = new MutationObserver(styleGrid)

gridObserver.observe(document.body, {
    childList: true,
    subtree: true
});

})();
