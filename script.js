let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
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

  