const styleCustomModal = () => {
    document.querySelectorAll('.modal.show').forEach(modal => {
        if (modal.dataset.styledModal === 'true') return;
        // modal.style.alignContent = 'center'
        const dialog = modal.querySelector('.modal-dialog');
        if (dialog) {
            dialog.style.borderRadius = '5px';
            dialog.style.border = 'none';
            dialog.style.backgroundColor = '#ffffff';
            dialog.style.boxShadow = '0px 0px 2px grey';
            dialog.style.padding = '0px';
        }

        const header = modal.querySelector('.modal-header');
        if (header) {
            header.style.color = '#073869';
            header.style.borderRadius = '2px';
            header.style.textAlign = 'center';
            header.querySelectorAll('h4').forEach(h4 => h4.style.color = '#073869');


        }
        modal.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="password"], textarea, select').forEach(input => {
            if (input.type === 'checkbox') return;

            input.style.borderRadius = '5px';
            input.style.backgroundColor = '#fff';
            input.style.boxShadow = '0px 0px 3px grey';
            input.style.border = '1px solid grey';
            input.style.padding = '5px 10px';
        });

        modal.querySelectorAll('.section-head.collapsible').forEach(header => {
            if (header.classList.contains('collapsed')) {
                header.style.color = '#073869';
                header.style.borderRadius = '5px';
            }
        });


        modal.querySelectorAll('.modal-footer .btn').forEach(btn => {
            if (btn.dataset.styledBtn === 'true') return;

            if (btn.textContent.trim() === 'Save') {
                btn.style.backgroundColor = '#073869';

                btn.style.color = '#fff';
                btn.style.borderRadius = '2px';
                btn.style.border = '1px solid #ccc';
                btn.style.boxShadow = 'none';
                btn.style.transition = 'color 0.3s ease,border 0.4s ease';

                btn.addEventListener('mouseleave', () => {
                    btn.style.border = ' 1px solid #ccc'
                    btn.style.color = '#fff'
                    btn.style.backgroundColor = '#073869'
                });
                btn.addEventListener('mouseenter', () => {
                    btn.style.border = '1px solid #073869';
                    btn.style.color = '#525252';
                    btn.style.backgroundColor = 'transparent';
                });
            } else
                if (btn.textContent.trim() === 'Edit Full Form' || btn.textContent.trim() === 'Edit') {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = '#073869';
                    btn.style.border = '1px solid #ccc';
                    btn.style.borderRadius = '3px';
                    btn.style.transition = 'color 0.3s ease,border 0.4s ease';

                    btn.addEventListener('mouseenter', () => {
                        btn.style.border = ' 1px solid #073869'
                        btn.style.color = '#525252'
                    });
                    btn.addEventListener('mouseleave', () => {
                        btn.style.border = '1px solid #ccc';
                        btn.style.color = '#073869';
                    });
                } else {
                    btn.style.backgroundColor = '#073869';
                    btn.style.color = '#ffffff';
                    btn.style.borderRadius = '3px';
                    btn.style.boxShadow = '0px 0px 5px grey';
                }

            btn.dataset.styledBtn = 'true';
        });

        modal.dataset.styledModal = 'true';
    });
};

document.addEventListener('DOMContentLoaded', styleCustomModal);

const modalObserver = new MutationObserver(() => styleCustomModal());
modalObserver.observe(document.body, { childList: true, subtree: true });
