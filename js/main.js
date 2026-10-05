// main.js

document.addEventListener('DOMContentLoaded', () => {
    
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

    // Mobile Menu Toggle (Basic implementation to show intent)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Menu mobile click - Expandir menu lateral');
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

