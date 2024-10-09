document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage script loaded');

    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const nav = document.querySelector('nav'); 
    const petImage = document.getElementById('pet-image');
    const petName = document.getElementById('pet-name');
    const petDetails = document.getElementById('pet-details');
    const prevButton = document.getElementById('prev-pet');
    const nextButton = document.getElementById('next-pet');
    const featureButtons = document.querySelectorAll('.ft-btn');
    const logoutButton = document.getElementById('logout-button');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const removeButton = document.getElementById('remove');

    console.log('Pet elements:', { petImage, petName, petDetails });
    console.log('Navigation buttons:', { prevButton, nextButton });

    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    console.log('Pets loaded from local storage:', pets);

    let currentPetIndex = 0;
    let currentPage = 'record';

    //Display
    function updatePetDisplay() {
        console.log('Updating pet display');
        if (pets.length === 0) {
            petImage.src = 'images/pets.jpg';
            petName.textContent = 'No pets added yet';
            petDetails.textContent = 'Please add a pet from the Add Pet page';
            console.log('No pets to display');
            return;
        }
        
        const pet = pets[currentPetIndex];
        console.log('Displaying pet:', pet);
        petImage.src = pet.image || 'images/pets.jpg';
        petImage.alt = pet.name;
        petName.textContent = pet.name;

        petImage.style.borderRadius = "15px";  
        petName.style.fontSize = "40px";
        petName.style.marginTop = "5px";
        petName.style.marginBottom = "3px";
        updatePetDetails();
    }

    //Details update
    function updatePetDetails() {
        if (pets.length === 0) return;
    
        const pet = pets[currentPetIndex];
        const lastCheckup = Array.isArray(pet.lastCheckup) ? pet.lastCheckup : [pet.lastCheckup || 'Not available'];
        const nextAppointment = Array.isArray(pet.nextAppointment) ? pet.nextAppointment : [pet.nextAppointment || 'Not scheduled'];
        const dietary = Array.isArray(pet.dietary) ? pet.dietary : [pet.dietary || 'Not specified'];
        const wellnessStatus = Array.isArray(pet.wellnessStatus) ? pet.wellnessStatus : [pet.wellnessStatus || 'Up to date'];
    
        switch(currentPage) {
            case 'record':
                petDetails.textContent = `Last checkup:\n${lastCheckup.join('\n')}`;
                break;
            case 'appointment':
                petDetails.textContent = `Next appointment:\n${nextAppointment.join('\n')}`;
                break;
            case 'dietary':
                petDetails.textContent = `Dietary needs:\n${dietary.join('\n')}`;
                break;
            case 'profile':
                petDetails.textContent = `${pet.name} is a ${pet.breed}. Birthday: ${pet.birthday}`;
                break;
            case 'wellness':
                petDetails.textContent = `Wellness status:\n${wellnessStatus.join('\n')}`;
                break;
        }
        
        petDetails.style.fontSize = "30px";
        petDetails.style.marginTop = "20px";
    }
    
    // Add/Edit Information Functionality
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentPage = this.dataset.page;
            updatePetDetails();
            
            // Prompt for new information based on currentPage
            let newInfo = '';
            switch(currentPage) {
                case 'record':
                    newInfo = prompt('Enter last checkup date (YYYY-MM-DD) and details: ', '');
                    if (newInfo) {
                        pets[currentPetIndex].lastCheckup = pets[currentPetIndex].lastCheckup || [];
                        pets[currentPetIndex].lastCheckup.push(newInfo);  
                    }
                    break;
                case 'appointment':
                    newInfo = prompt('Enter next appointment date (YYYY-MM-DD):', '');
                    if (newInfo) {
                        pets[currentPetIndex].nextAppointment = pets[currentPetIndex].nextAppointment || [];
                        pets[currentPetIndex].nextAppointment.push(newInfo);  
                    }
                    break;
                case 'dietary':
                    newInfo = prompt('Enter dietary needs:', '');
                    if (newInfo) {
                        pets[currentPetIndex].dietary = pets[currentPetIndex].dietary || [];
                        pets[currentPetIndex].dietary.push(newInfo); 
                    }
                    break;                    
                case 'wellness':
                    newInfo = prompt('Enter wellness status:', '');
                    if (newInfo) {
                        pets[currentPetIndex].wellnessStatus = pets[currentPetIndex].wellnessStatus || [];
                        pets[currentPetIndex].wellnessStatus.push(newInfo);  
                    }
                    break;
            }
            localStorage.setItem('pets', JSON.stringify(pets));
            updatePetDetails();
        });
    });

    // Remove pet
    removeButton.addEventListener('click', function() {
        if (pets.length === 0) return;

        const confirmRemove = confirm(`Are you sure you want to remove ${pets[currentPetIndex].name}?`);
        if (confirmRemove) {
            pets.splice(currentPetIndex, 1);

            if (currentPetIndex >= pets.length) {
                currentPetIndex = pets.length - 1;
            }

            localStorage.setItem('pets', JSON.stringify(pets));
            updatePetDisplay();
            console.log('Pet removed and data updated');
        }
    });
    
    //Next & Previous
    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (pets.length === 0) return;
        currentPetIndex = (currentPetIndex - 1 + pets.length) % pets.length;
        updatePetDisplay();
    });

    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (pets.length === 0) return;
        currentPetIndex = (currentPetIndex + 1) % pets.length;
        updatePetDisplay();
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
            nav.classList.add('show');
        } else {
            nav.classList.remove('show');
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

// Update Content Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const updateContentButton = document.getElementById('update-content-btn');
    const contentUpdateSection = document.getElementById('content-update-section');

    updateContentButton.addEventListener('click', function() {
        contentUpdateSection.textContent = "Thank you for using Furfect Care! We strive to make your pet's care seamless.";
        contentUpdateSection.classList.add('updated');
        
        // Use of Countdown
        setTimeout(() => {
            contentUpdateSection.textContent = "Welcome to Furfect Care!"; 
            contentUpdateSection.classList.remove('updated'); 
        }, 3500);
    });
});