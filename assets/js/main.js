
lucide.createIcons();

// DOM Elements
const navbar = document.getElementById('navbar');

// Navbar Scroll Effect
const handleScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleScroll);

// Hero Slider
const swiper = new Swiper('.hero-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 1500, // Slow smooth transition
    effect: 'fade', // Crossfade effect
    fadeEffect: {
        crossFade: true
    },
    parallax: true, // Enable parallax for content
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px"
});

revealElements.forEach((el) => revealOnScroll.observe(el));

// 3D Tilt Effect
const cards = document.querySelectorAll('.card-3d');

cards.forEach(card => {
    const wrapper = card.querySelector('.card-3d-wrapper');
    if (!wrapper) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
});

// Cart Interaction
const cartBtn = document.querySelector('.nav-icons button i[data-lucide="shopping-bag"]');
// Need to traverse up to button, then find span
if (cartBtn) {
    const btnContainer = cartBtn.closest('button');
    const badge = btnContainer ? btnContainer.querySelector('.cart-badge') : null;
    const addBtns = document.querySelectorAll('button, .btn--primary');

    if (badge) {
        addBtns.forEach(btn => {
            if (btn.innerText.toLowerCase().includes('add') ||
                btn.innerText.toLowerCase().includes('acquire') ||
                btn.innerText.toLowerCase().includes('purchase')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let current = parseInt(badge.innerText);
                    badge.innerText = current + 1;

                    // Simple animation class add/remove
                    badge.style.transform = 'scale(1.5)';
                    badge.style.backgroundColor = 'white';
                    setTimeout(() => {
                        badge.style.transform = 'scale(1)';
                        badge.style.backgroundColor = ''; // Reset to CSS default
                    }, 300);
                });
            }
        });
    }
}
