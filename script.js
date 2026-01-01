document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBIEL MENU FUNCTIONALITEIT ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // --- 2. SCROLL REVEAL ANIMATIE ---
    const revealElements = document.querySelectorAll('.project-card, .skill-card, .feature-card-row, .contact-layout');

    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();


    // --- 3. CONTACT FORMULIER SIMULATIE ---
    const contactForm = document.querySelector('.contact-form-card');
    const submitBtn = document.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            submitBtn.innerHTML = 'Verzonden! 🚀';
            submitBtn.style.backgroundColor = '#10b981';

            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '#111827';
            }, 3000);
        });
    }
});

// --- 3. CONTACT FORMULIER ---
const contactForm = document.querySelector('.contact-form-card');
const submitBtn = document.querySelector('.btn-submit');
const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        submitBtn.innerHTML = 'Versturen...';

        const formData = new FormData(contactForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
            .then(() => {

                submitBtn.innerHTML = 'Verzonden! 🚀';
                submitBtn.style.backgroundColor = '#10b981';


                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '#111827';
                }, 3000);
            })
            .catch((error) => {

                console.error(error);
                submitBtn.innerHTML = 'Fout bij versturen';
                submitBtn.style.backgroundColor = 'red';
            });
    });
}