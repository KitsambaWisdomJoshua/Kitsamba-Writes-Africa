// ========================================
// KITSAMBA WRITES AFRICA - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormHandling();
    initializeAnimations();
});

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const exploreBtn = document.querySelector('.explore-btn');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            updateActiveLink(link);
        });
    });

    // Explore button functionality
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('novels').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveLinkOnScroll();
    });
}

function updateActiveLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

function updateActiveLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================

function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the form data to a server
    console.log('Contact Form Data:', data);

    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');

    // Reset form
    this.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    console.log('Newsletter Signup:', email);

    // Show success message
    showNotification('Successfully subscribed to our newsletter!', 'success');

    // Reset form
    this.reset();
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#d4af37' : '#666'};
        color: ${type === 'success' ? '#1a1a1a' : '#e8e8e8'};
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// ANIMATIONS
// ========================================

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.novel-card, .section-card, .blog-card, .lifestyle-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ADD CSS ANIMATIONS
// ========================================

const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }

    .notification {
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// ========================================
// HERO BUTTON FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const exploreStoriesBtn = document.querySelector('.hero-buttons .btn-primary');
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');

    if (exploreStoriesBtn) {
        exploreStoriesBtn.addEventListener('click', () => {
            document.getElementById('novels').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// ========================================
// READ MORE BUTTONS
// ========================================

document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('This feature will be available soon!', 'info');
    });
});

console.log('Kitsamba Writes Africa - Website loaded successfully!');