// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#home' || href === '#about' || href === '#privacy') {
                e.preventDefault();
                showPage(href.substring(1));
            }
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        observer.observe(el);
    });

    // Set initial active page
    const home = document.getElementById('home');
    if (home) {
        home.classList.add('active');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        }
    });

    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 50;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = counter.textContent;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    // Uncomment below line if you add data-target to stat-number
                    // updateCounter();
                }
            });
            observer.observe(counter);
        });
    };

    animateCounters();

    // Prevent default link behavior for social links
    const socialLinks = document.querySelectorAll('a[target="_blank"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .social-icon');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add placeholder animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[class*="animate-"]');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on page load

    // Prevent context menu on images (optional)
    images.forEach(img => {
        img.addEventListener('contextmenu', function(e) {
            // Uncomment below line to disable right-click on images
            // e.preventDefault();
        });
    });

    // Cache busting
    const now = new Date().getTime();
    document.documentElement.style.setProperty('--cache-bust', `'${now}'`);
});

// Function to handle page transitions
function transitionPage(pageId) {
    const currentPage = document.querySelector('.page.active');
    const newPage = document.getElementById(pageId);

    if (currentPage) {
        currentPage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            currentPage.classList.remove('active');
            newPage.classList.add('active');
            newPage.style.animation = 'fadeIn 0.3s ease';
        }, 300);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // You can add keyboard shortcuts here if needed
    // Example: if (e.key === 'ArrowRight') { navigate to next page }
});

// Lazy load images (simple implementation)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src || image.src;
                image.classList.add('loaded');
                observer.unobserve(image);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentPage = 'home';
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            currentPage = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Call this function when pages change
window.addEventListener('load', updateActiveNavLink);

console.log('Technical_01 Website Loaded Successfully! 🚀');
