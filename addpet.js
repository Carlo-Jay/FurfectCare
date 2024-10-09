document.addEventListener('DOMContentLoaded', function() {
    console.log('Add Pet script loaded');

    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const nav = document.querySelector('nav'); 
    const submitButton = document.querySelector('.sub');
    const petForms = document.querySelectorAll('.box form');
    const logoutButton = document.getElementById('logout-button');
    const themeToggleButton = document.getElementById('theme-toggle-btn');

    console.log('Submit button:', submitButton);
    console.log('Pet forms:', petForms);
    console.log('Logout button:', logoutButton);

    //form submission
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            console.log('Submit button clicked');
            e.preventDefault();
            let isValid = true;
            const petData = [];

            petForms.forEach((form, index) => {
                const name = form.querySelector(`#name${index + 1}`).value.trim();
                const breed = form.querySelector(`#breed${index + 1}`).value.trim();
                const date = form.querySelector(`#date${index + 1}`).value;
                const photoInput = form.querySelector(`#photo${index + 1}`);

                console.log(`Pet ${index + 1}:`, { name, breed, date, photo: photoInput.files[0] });

                if (name || breed || date || photoInput.files.length > 0) {
                    if (!name || !breed || !date) {
                        isValid = false;
                        alert(`Please fill all fields for Pet ${index + 1}`);
                    } else {
                        const pet = { name, breed, birthday: date };
                        if (photoInput.files.length > 0) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                pet.image = e.target.result;
                                savePet(pet);
                            }
                            reader.readAsDataURL(photoInput.files[0]);
                        } else {
                            savePet(pet);
                        }
                        petData.push(pet);
                    }
                }
            });

            console.log('Pet data:', petData);

            if (isValid && petData.length > 0) {
                console.log('Pets added successfully');
                alert('Pets added successfully!');
                
                petForms.forEach(form => form.reset());
                document.querySelectorAll('.photo-preview').forEach(preview => preview.innerHTML = '');
                
                window.location.href = 'Home.html';
            } else if (petData.length === 0) {
                console.log('No pets added');
                alert('Please add at least one pet');
            }
        });
    }

    function savePet(pet) {
        let pets = JSON.parse(localStorage.getItem('pets')) || [];
        pets.push(pet);
        localStorage.setItem('pets', JSON.stringify(pets));
        console.log('Pets in local storage:', JSON.parse(localStorage.getItem('pets')));
    }

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

