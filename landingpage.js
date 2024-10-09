window.addEventListener("scroll", function() {
    var logo = document.querySelector(".logo");
    var scrollPosition = window.scrollY;

    var scrollDistance = 200;

    if (scrollPosition > scrollDistance) {
        logo.style.display = "none";
    } else {
        logo.style.display = "block";
    }
});

window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    if (window.scrollY > 200) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.transform = 'scale(1.1)';
    link.style.transition = 'transform 0.3s ease-in-out';
  });

  link.addEventListener('mouseout', () => {
    link.style.transform = 'scale(1)';
  });
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.opacity = '1';
    card.style.transition = 'opacity 0.5s ease-in-out';
    card.style.transition = 'flex 0.5s ease-in-out';
  });

  card.addEventListener('mouseout', () => {
    card.style.opacity = '0.5';
    card.style.transition = 'flex 0.5s ease-in-out';
  });
});

const socialMediaIcons = document.querySelectorAll('.social-media img');

socialMediaIcons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    icon.style.transform = 'scale(1.2)';
    icon.style.transition = 'transform 0.3s ease-in-out';
  });

  icon.addEventListener('mouseout', () => {
    icon.style.transform = 'scale(1)';
  });
});

const sections = document.querySelectorAll('section');

sections.forEach(section => {
  section.addEventListener('mouseover', () => {
    section.style.transform = 'translateY(-10px)';
    section.style.transition = 'transform 0.5s ease-in-out';
  });

  section.addEventListener('mouseout', () => {
    section.style.transform = 'translateY(0)';
  });
});

const progressBarContainer = document.querySelector('.progress-bar-container');
const progressBar = document.querySelector('#progress-bar');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;
  const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;

  progressBar.style.width = `${progress}%`;
});

const clickableLists = document.querySelectorAll('.clickable-list');
const hiddenLists = document.querySelectorAll('.hidden-list');

clickableLists.forEach((clickableList, index) => {
  clickableList.addEventListener('click', () => {
    hiddenLists[index].style.display = hiddenLists[index].style.display === 'block' ? 'none' : 'block';
  });
});