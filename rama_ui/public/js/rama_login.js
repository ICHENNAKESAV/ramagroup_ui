let screenWidth = window.innerWidth;

window.addEventListener("resize", function () {
    screenWidth = window.innerWidth;
    updateLoginLayout();
});

const updateLoginLayout = () => {
    const loginCard = document.querySelector('.for-login');
    if (!loginCard) return;

    const mainContainer = document.querySelector('.page_content');
    if (mainContainer) {
        mainContainer.style.maxWidth = '1000px';
        mainContainer.style.margin = '40px auto';
        mainContainer.style.padding = '0';
    }

    loginCard.style.display = 'flex';
    loginCard.style.flexDirection = screenWidth <= 768 ? 'column' : 'row';
    loginCard.style.maxWidth = '100% !important';
    loginCard.style.width = '100%';
    loginCard.style.borderRadius = '12px';
    loginCard.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
    loginCard.style.overflow = 'hidden';
    loginCard.style.backgroundColor = '#ffffff';

    let leftPanel = document.getElementById('rama-login-left-panel');
    if (!leftPanel) {
        leftPanel = document.createElement('div');
        leftPanel.id = 'rama-login-left-panel';
        
        // Setup Left Panel
        leftPanel.style.background = '#f8f9fa';
        leftPanel.style.position = 'relative';
        leftPanel.style.display = 'flex';
        leftPanel.style.flexDirection = 'column';
        leftPanel.style.alignItems = 'center';
        leftPanel.style.justifyContent = 'center';
        leftPanel.style.padding = '40px';

        // Add Logo
        const logo = document.createElement('img');
        logo.src = '/assets/rama_ui/assets/rama_logo.png';
        logo.style.position = 'absolute';
        logo.style.top = '30px';
        logo.style.left = '30px';
        logo.style.height = '40px';
        leftPanel.appendChild(logo);

        // Add Illustration
        const illustration = document.createElement('img');
        illustration.src = '/assets/rama_ui/images/login_illustration.jpg';
        illustration.style.maxWidth = '100%';
        illustration.style.height = 'auto';
        illustration.style.marginTop = '40px';
        illustration.style.mixBlendMode = 'multiply'; // helps blend into f8f9fa
        leftPanel.appendChild(illustration);

        loginCard.prepend(leftPanel);
    }

    // Responsive rules
    leftPanel.style.flex = screenWidth <= 768 ? 'none' : '1';
    leftPanel.style.display = screenWidth <= 768 ? 'none' : 'flex';
    leftPanel.style.width = screenWidth <= 768 ? '100%' : '50%';

    // Right side (Original Login form)
    const rightPanel = loginCard.querySelector('.page-card-head')?.parentElement || loginCard;
    if (rightPanel.id !== 'rama-login-left-panel') {
        rightPanel.style.flex = '1';
        rightPanel.style.padding = screenWidth <= 768 ? '20px' : '40px';
        rightPanel.style.width = screenWidth <= 768 ? '100%' : '50%';
        rightPanel.style.boxSizing = 'border-box';
        rightPanel.style.display = 'flex';
        rightPanel.style.flexDirection = 'column';
        rightPanel.style.justifyContent = 'center';
    }

    // Restyle inputs and buttons if not already done
    const inputs = rightPanel.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.style.borderRadius = '6px';
        input.style.padding = '10px 12px';
        input.style.border = '1px solid #e2e8f0';
        input.style.boxShadow = 'none';
        input.style.transition = 'border-color 0.3s ease';
    });

    const loginBtn = rightPanel.querySelector('.btn-primary, .btn-login');
    if (loginBtn) {
        loginBtn.style.background = 'linear-gradient(135deg, #00094b, #001272)';
        loginBtn.style.border = 'none';
        loginBtn.style.borderRadius = '6px';
        loginBtn.style.padding = '10px';
        loginBtn.style.fontSize = '16px';
        loginBtn.style.fontWeight = '600';
        loginBtn.style.boxShadow = '0 4px 12px rgba(0, 9, 75, 0.2)';
    }
};

document.addEventListener("DOMContentLoaded", updateLoginLayout);
