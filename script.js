const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.querySelector("#nav");
const toggleIcon = document.querySelector("#toggle-icon");
const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const image3 = document.querySelector("#image3");
const textBox = document.querySelector("#text-box");
const hamburgerMenu = document.querySelector("#hamburger-menu");


// Dark or Light Images
function imageMode(color){
    image1.src = `./img/website_${color}.svg`
    image2.src = `./img/problem_solving_${color}.svg` 
    image3.src = `./img/high_concept_${color}.svg`
}


// Toggle dark or Light
function toggleLightDarkMode(isDark){
    nav.style.backgroundColor = isDark ? `rgb(0 0 0 / 50%)`: `rgb(225 225 225 / 50%)`;
    textBox.style.backgroundColor = isDark ? `rgb(225 225 225 / 50%)` : `rgb(0 0 0 / 50%)`;
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    let toggleIconSunMoon = toggleIcon.children[1].classList;
    isDark ? toggleIconSunMoon.replace("fa-sun","fa-moon") : toggleIconSunMoon.replace("fa-moon","fa-sun");
    isDark ? imageMode("dark") : imageMode("light");
}


// Event Listener
toggleSwitch.addEventListener("change", function switchTheme(e){
    if(e.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleLightDarkMode(true)
        localStorage.setItem("theme", "dark");
    }else{
        document.documentElement.setAttribute('data-theme', 'light');
        toggleLightDarkMode(false)
        localStorage.setItem("theme", "light");
    }
})


// Check local storage for theme
let currentTheme = localStorage.getItem("theme");
if(currentTheme){
    document.documentElement.setAttribute("data-theme", currentTheme);

    if(currentTheme === "dark"){
        toggleSwitch.checked = true;
        toggleLightDarkMode(true);
    }
}

// hamburger-menu behaviour
// Track the open/closed state
let isOpen = false;
let navLinks = document.querySelectorAll("#nav a");

// Toggle behaviour for the hamburger menu
hamburgerMenu.addEventListener("click", () => {
    if (isOpen) {
        // If it's open, reset to the original state (closed)
        hamburgerMenu.children[0].style.transform = 'rotate(0) translateY(0)';
        hamburgerMenu.children[1].style.display = "block"; // Show the middle line again
        hamburgerMenu.children[2].style.transform = 'rotate(0) translateY(0)';
        nav.style.background = "none";
        
        navLinks.forEach((navLink)=>{
            navLink.style.display = "none";
        })
    } else {
        // If it's closed, transform to the "X" shape (open state)
        hamburgerMenu.children[0].style.transform = 'rotate(45deg) translateY(20px)';
        hamburgerMenu.children[1].style.display = "none"; // Hide the middle line
        hamburgerMenu.children[2].style.transform = 'rotate(-45deg) translateY(-20px)';
        if(toggleLightDarkMode){
            nav.style.background = `linear-gradient(135deg, rgba(0,0,0,1), rgba(0,0,0,.2))`;
        }else{
            nav.style.background = `linear-gradient(135deg, rgba(225,225,225,1), rgba(225,225,225,.2))`;
        }
        navLinks.forEach((navLink)=>{
            navLink.style.display = "block";
        })
    }

    // Toggle the state
    isOpen = !isOpen;
});
