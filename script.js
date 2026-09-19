/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});


/* Close mobile menu after clicking a link */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================
   PROGRAM FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const programCards = document.querySelectorAll(".program-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class from every button */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        /* Add active class to clicked button */

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;


        /* Filter cards */

        programCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === cardCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================
   TESTIMONIAL SLIDER
========================= */

const testimonials =
    document.querySelectorAll(".testimonial");

const previousButton =
    document.getElementById("prevTestimonial");

const nextButton =
    document.getElementById("nextTestimonial");

let currentTestimonial = 0;


function showTestimonial(index) {

    testimonials.forEach(testimonial => {
        testimonial.classList.remove("active");
    });

    testimonials[index].classList.add("active");

}


nextButton.addEventListener("click", () => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

});


previousButton.addEventListener("click", () => {

    currentTestimonial--;

    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }

    showTestimonial(currentTestimonial);

});


/* =========================
   AUTO TESTIMONIAL SLIDER
========================= */

setInterval(() => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

}, 6000);


/* =========================
   PRICING BUTTONS
========================= */

const planButtons =
    document.querySelectorAll(".choose-plan");

const goalSelect =
    document.getElementById("goal");

planButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedPlan = button.dataset.plan;

        /*
            We don't have a membership-plan
            field in the form, so we use the
            message field to tell the user
            which plan they selected.
        */

        const message =
            document.getElementById("message");

        message.value =
            `I am interested in the ${selectedPlan} membership plan.`;

        document
            .getElementById("contact")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

    /*
        Stop the browser from refreshing
        the page when the form is submitted.
    */

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const goal =
        document.getElementById("goal").value;

    const message =
        document.getElementById("message").value.trim();


    /* Check required fields */

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        goal === "" ||
        message === ""
    ) {

        showFormMessage(
            "Please complete all required fields.",
            "error"
        );

        return;

    }


    /* Validate email */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showFormMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    /* Successful submission */

    showFormMessage(
        `Thanks ${name}! Your request has been received. We will contact you soon.`,
        "success"
    );


    /* Clear form */

    contactForm.reset();

});


/* =========================
   FORM MESSAGE FUNCTION
========================= */

function showFormMessage(text, type) {

    formMessage.textContent = text;

    formMessage.className =
        `form-message ${type}`;

}