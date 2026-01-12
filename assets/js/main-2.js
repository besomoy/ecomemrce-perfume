
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Promotional Marquee
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        gsap.to(marqueeContent, {
            xPercent: -50,
            ease: "none",
            duration: 30,
            repeat: -1
        });
    }

    // Navbar Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Hero Slider
    if (document.querySelector('.hero-slider')) {
        const heroSwiper = new Swiper('.hero-slider', {
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 2000,
            autoplay: { delay: 7000, disableOnInteraction: false },
            loop: true,
            parallax: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.custom-pagination',
                clickable: true,
            },
            on: {
                init: function () { animateHeroContent(); },
                slideChangeTransitionStart: function () {
                    // Outbound animation
                    gsap.to(".hero-slider .reveal-text", { y: -50, opacity: 0, duration: 0.8, ease: "power2.in" });
                },
                slideChangeTransitionEnd: function () { animateHeroContent(); }
            }
        });
    }

    function animateHeroContent() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (!activeSlide) return;
        const elements = activeSlide.querySelectorAll('.reveal-text');
        gsap.set(elements, { y: 100, opacity: 0 });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(elements, { y: 0, opacity: 1, duration: 1.8, stagger: 0.15, clearProps: "all" });

        const activeSlideBg = activeSlide.querySelector('.slide-bg');
        if (activeSlideBg) {
            gsap.fromTo(activeSlideBg, { scale: 1.15 }, { scale: 1.0, duration: 10, ease: "linear" });
        }
    }

    // Product Slider
    if (document.querySelector('.product-slider')) {
        new Swiper('.product-slider', {
            slidesPerView: 1, spaceBetween: 20,
            breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
            navigation: { nextEl: '.next-btn', prevEl: '.prev-btn' }
        });
    }

    // Testimonial Slider
    if (document.querySelector('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            autoplay: { delay: 4000 },
            pagination: { el: '.swiper-pagination', clickable: true },
            loop: true
        });
    }

    // GSAP Scroll Animations

    // 3D Category Section Placement Animation
    gsap.utils.toArray('.category-3d-card').forEach((card, i) => {
        const bottle = card.querySelector('.category-bottle');
        const info = card.querySelector('.category-info');
        const shadow = card.querySelector('.bottle-shadow');

        if (!bottle || !info) return;

        const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 85%" }
        });

        gsap.set(bottle, { rotationY: 0, rotationX: 0, rotationZ: 0 });

        tl.from(card, { y: 80, opacity: 0, duration: 1.5, ease: "power4.out", delay: i * 0.15 })
            .from(bottle, { y: -150, opacity: 0, rotationY: 45, scale: 0.7, duration: 2, ease: "expo.out" }, "-=1.2")
            .from(shadow, { scale: 0, opacity: 0, duration: 1.5, ease: "power2.out" }, "-=1.5")
            .from(info.children, { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" }, "-=1");

        gsap.to(bottle, { y: "-=20", duration: 3 + i, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4 });
    });

    // Tilt effect for 3D cards
    const cards = document.querySelectorAll('.category-3d-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            gsap.to(card, { rotateX: rotateX, rotateY: rotateY, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        });
    });

    // Parallax Effect for Hero Product Image
    gsap.utils.toArray('.parallax-img-container').forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            gsap.to(img, {
                yPercent: 20, ease: "none",
                scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: true }
            });
        }
    });

    // Section Headers Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: { trigger: header, start: "top 80%" },
            y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });
    });

});
