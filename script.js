document.addEventListener("DOMContentLoaded", function () {
    let menu = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");
    let navLinks = document.querySelectorAll(".navbar a");

    if (menu && navbar) {
        menu.onclick = (event) => {
            menu.classList.toggle("bx-x");
            navbar.classList.toggle("active");
            event.stopPropagation();
        };

        document.addEventListener("click", (event) => {
            if (menu && navbar && !menu.contains(event.target) && !navbar.contains(event.target)) {
                closeMenu(menu, navbar);
            }
        });

        window.addEventListener("scroll", () => {
            closeMenu(menu, navbar);
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu(menu, navbar);
            });
        });
    } else {
        console.error("Menu-icon Or Navbar Element Not Found!");
    }

    function closeMenu(menu, navbar) {
        if (menu && navbar) {
            menu.classList.remove("bx-x");
            navbar.classList.remove("active");
        }
    }

    // Typed.js Initialization
    if (document.querySelector(".multiple-text")) {
        const typed = new Typed(".multiple-text", {
            strings: [
                "Physical Fitness",
                "Weight Gain/Loss",
                "Strength Training",
                "Muscle Building",
                "Powerlifting",
                "Olympic Weight-Lifting",
                "Personal Training",
            ],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            loop: true,
        });
    }

// Join Us Page
    const memberRadio = document.getElementById("member");
    const trainerRadio = document.getElementById("trainer");

    const membershipChoice = document.getElementById("membership-choice");
    const trialRadio = document.getElementById("trial");
    const membershipRadio = document.getElementById("membership");
    const memberOptions = document.getElementById("member-options");
    const trainerOptions = document.getElementById("trainer-options");

    function scrollSlightlyDown() {
        window.scrollBy({ top: 150, behavior: "smooth" });
    }

    function toggleFields() {
        if (memberRadio?.checked) {
            console.log("Member Selected");
            membershipChoice.style.display = "block";
            trainerOptions.style.display = "none";
            memberOptions.style.display = "none"; 
            scrollSlightlyDown();
        } else if (trainerRadio?.checked) {
            console.log("Trainer Selected");
            trainerOptions.style.display = "block";
            membershipChoice.style.display = "none";
            memberOptions.style.display = "none";
            scrollSlightlyDown();
        }
    }

    function toggleMembershipOptions() {
        if (membershipRadio?.checked) {
            console.log("Membership Selected");
            memberOptions.style.display = "block";
            scrollSlightlyDown();
        } else {
            console.log("Trial Selected");
            memberOptions.style.display = "none";
        }
    }

    if (memberRadio && trainerRadio) {
        memberRadio.addEventListener("change", toggleFields);
        trainerRadio.addEventListener("change", toggleFields);
    }

    if (trialRadio && membershipRadio) {
        trialRadio.addEventListener("change", toggleMembershipOptions);
        membershipRadio.addEventListener("change", toggleMembershipOptions);
    }
});

const experience = document.getElementById("experience");
const salary = document.getElementById("salary");

// Remove 'required' if fields are hidden
if (experience && experience.offsetParent === null) {
    experience.removeAttribute("required");
}

if (salary && salary.offsetParent === null) {
    salary.removeAttribute("required");
}


// Price Update
const prices = {
    basic: { Monthly: "₹999", Yearly: "₹3999" },
    pro: { Monthly: "₹1499", Yearly: "₹5999" },
    premium: { Monthly: "₹1999", Yearly: "₹7999" }
};

let selectedPlan = null;
let selectedDuration = null;

document.querySelectorAll('input[name="membership"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        selectedPlan = this.value;
        updatePrice();
    });
});
document.querySelectorAll('input[name="duration"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        selectedDuration = this.value;
        updatePrice();
    });
});
function updatePrice() {
    if (selectedPlan && selectedDuration) {
        document.getElementById("selected-plan-price").innerText = 
            `Selected Plan: ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} - ${prices[selectedPlan][selectedDuration]} / ${selectedDuration}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const memberRadio = document.getElementById("member");
    const trainerRadio = document.getElementById("trainer");

    if (!memberRadio || !trainerRadio) {
        console.error("❌ ERROR: Radio Buttons Not Found!");
        return; // Stop execution if elements are missing
    }

    const planInputs = document.querySelectorAll('input[name="plan"]');
    const membershipInputs = document.querySelectorAll('input[name="membership"]');
    const durationInputs = document.querySelectorAll('input[name="duration"]');
    const paymentInputs = document.querySelectorAll('input[name="payment"]');

    function updateRequiredFields() {
        if (memberRadio.checked) {
            planInputs.forEach(input => input.setAttribute("required", "true"));
            membershipInputs.forEach(input => input.setAttribute("required", "true"));
            durationInputs.forEach(input => input.setAttribute("required", "true"));
            paymentInputs.forEach(input => input.setAttribute("required", "true"));
        } else {
            planInputs.forEach(input => input.removeAttribute("required"));
            membershipInputs.forEach(input => input.removeAttribute("required"));
            durationInputs.forEach(input => input.removeAttribute("required"));
            paymentInputs.forEach(input => input.removeAttribute("required"));
        }
    }

    // Run on page load
    updateRequiredFields();

    // Run when radio buttons change
    memberRadio.addEventListener("change", updateRequiredFields);
    trainerRadio.addEventListener("change", updateRequiredFields);
});

document.addEventListener("DOMContentLoaded", function () {
    const trialRadio = document.getElementById("trial");
    const membershipRadio = document.getElementById("membership");
    const membershipRadios = document.querySelectorAll('input[name="membership"]');
    const durationRadios = document.querySelectorAll('input[name="duration"]');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');

    function toggleRequiredFields() {
        if (trialRadio.checked) {
            membershipRadios.forEach(radio => radio.removeAttribute("required"));
            durationRadios.forEach(radio => radio.removeAttribute("required"));
            paymentRadios.forEach(radio => radio.removeAttribute("required"));
        } else if (membershipRadio.checked) {
            membershipRadios.forEach(radio => radio.setAttribute("required", "true"));
            durationRadios.forEach(radio => radio.setAttribute("required", "true"));
            paymentRadios.forEach(radio => radio.setAttribute("required", "true"));
        }
    }

    // Add event listeners
    trialRadio.addEventListener("change", toggleRequiredFields);
    membershipRadio.addEventListener("change", toggleRequiredFields);

    toggleRequiredFields();
});