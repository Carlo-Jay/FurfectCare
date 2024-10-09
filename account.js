document.addEventListener('DOMContentLoaded', function() {
    console.log('Account Settings script loaded');
    
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const nav = document.querySelector('nav'); 
    const profilePic = document.querySelector('.profile-pic img');
    const profileName = document.querySelector('.profile-info h2');
    const profileActions = document.querySelector('.profile-actions');
    const securityInfo = document.querySelector('.security-info');
    const securityActions = document.querySelector('.security-actions');
    const logoutButton = document.getElementById('logout-button');
    const themeToggleButton = document.getElementById('theme-toggle-btn');

    console.log('Logout button:', logoutButton);

    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users[0]; 

    if (currentUser) {
        profileName.textContent = currentUser.fullName;
        securityInfo.innerHTML = `
            <p>Email: ${currentUser.email}</p>
            <p>Password: ${'*'.repeat(currentUser.password.length)}</p>
            <p>Phone: ${currentUser.contactNumber}</p>
        `;
    }

    profileActions.addEventListener('click', function(e) {
        e.preventDefault();
        
        alert('Feature coming soon!');
    });

    securityActions.addEventListener('click', function(e) {
        e.preventDefault();
       
        alert('Feature coming soon!');
    });

    if (logoutButton) {
logoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'Login.html';
});
}
// Toggle the nav visibility
hamburgerToggle.addEventListener('change', function() {
if (this.checked) {
    nav.classList.add('show'); // Add 'show' class when checked
} else {
    nav.classList.remove('show'); // Remove 'show' class when unchecked
}
});

// Theme Toggle Functionality
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    nav.classList.add('dark-theme');
    themeToggleButton.classList.add('dark-theme');
}

themeToggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    nav.classList.toggle('dark-theme');
    themeToggleButton.classList.toggle('dark-theme');

    const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
});
updatePetDisplay();
});