let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');

menu.onclick = (event) => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        event.stopPropagation();
};

document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !navbar.contains(event.target)){
        closeMenu();
    }
});

window.addEventListener("scroll", () => {
    closeMenu();
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    })
});

function closeMenu(){
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['Physical Fitness', 'Weight Gain/Loss','Strength Training','Muscle Building'
                ,'Powerlifting','Olympic Weight-Lifting','Personal Training'
    ],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
  });