// main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Link anchor clicks to Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') {
                    lenis.scrollTo(0);
                    return;
                }
                const target = document.querySelector(targetId);
                if (target) {
                    lenis.scrollTo(target);
                }
            });
        });
    }
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    const headerInner = header.querySelector('div');

    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2');
            header.classList.remove('py-4');
            headerInner.classList.add('shadow-md');
            headerInner.classList.remove('shadow-sm', 'border-white/20');
            headerInner.classList.add('border-transparent');
        } else {
            header.classList.add('py-4');
            header.classList.remove('py-2');
            headerInner.classList.remove('shadow-md', 'border-transparent');
            headerInner.classList.add('shadow-sm', 'border-white/20');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // Intersection Observer for scroll animations (fade in up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMobileMenu = () => {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    };

    if(mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMenuBtn.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

});
