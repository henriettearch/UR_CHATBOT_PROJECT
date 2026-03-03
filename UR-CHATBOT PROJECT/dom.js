/**
 * ===================================================
 * UNIVERSITY WEBSITE - INTERACTIVE JAVASCRIPT
 * Purpose: Handle DOM interactions, animations, and user events
 * Structure: Ready for AI Chatbot and Backend Integration
 * ===================================================
 */

// ========== DOCUMENT READY & INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeChatbot();
    initializeSearch();
    initializeScrollEffects();
    initializeDropdowns();
});

// ========== NAVIGATION FUNCTIONALITY ==========
/**
 * Initialize navigation bar functionality
 * Includes: hamburger menu toggle, sticky navbar, mobile menu
 */
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky-navbar');
        } else {
            navbar.classList.remove('sticky-navbar');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    console.log('✓ Navigation initialized');
}

// ========== DROPDOWN MENU FUNCTIONALITY ==========
/**
 * Initialize dropdown menus for mobile devices
 * Toggles dropdown visibility on mobile
 */
function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only handle clicks on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = toggle.nextElementSibling;
                
                // Close other open dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                    }
                });

                // Toggle current dropdown
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    console.log('✓ Dropdowns initialized');
}

// ========== CHATBOT FUNCTIONALITY ==========
/**
 * Initialize floating chatbot
 * Features:
 * - Toggle chatbot window visibility
 * - Send/receive messages
 * - Smooth animations
 * - Ready for AI API integration
 */
function initializeChatbot() {
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Open chatbot window
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.add('active');
            chatInput.focus();
            console.log('✓ Chatbot opened');
        });
    }

    // Close chatbot window
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
            console.log('✓ Chatbot closed');
        });
    }

    // Send message on button click
    if (sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
    }

    // Send message on Enter key press
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    console.log('✓ Chatbot initialized');
}

/**
 * Send chat message
 * Adds user message to chat and simulates bot response
 * TODO: Connect to backend/AI API
 */
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const message = chatInput.value.trim();

    if (message === '') return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user-message';
    userMessageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatbotMessages.appendChild(userMessageDiv);

    // Clear input
    chatInput.value = '';

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Simulate bot response (TODO: Replace with actual API call)
    setTimeout(() => {
        addBotMessage(generateDummyResponse(message));
    }, 500);

    console.log('✓ User message sent:', message);
}

/**
 * Add bot message to chat
 * @param {string} message - The bot's response message
 */
function addBotMessage(message) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'chat-message bot-message';
    botMessageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatbotMessages.appendChild(botMessageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

/**
 * Generate dummy bot response
 * TODO: Replace with actual AI chatbot API integration
 * @param {string} userMessage - User's message
 * @returns {string} Bot response
 */
function generateDummyResponse(userMessage) {
    const responses = {
        'admissions': 'For admissions inquiries, please visit our admissions portal or contact: admissions@ur.ac.rw',
        'courses': 'We offer undergraduate, postgraduate, and short courses. Visit our academics section for details.',
        'fees': 'Fee information is available in our academics section. For specific details, contact the registrar.',
        'library': 'The UR library is available to all students. Library hours and resources are on our website.',
        'hostel': 'Accommodation information is available through our student welfare office.',
        'support': 'How can I help you today? You can ask about admissions, courses, fees, or contact us directly.',
        'default': 'Thank you for your question! For more detailed information, please visit our website or contact info@ur.ac.rw. Our team will be happy to assist you!'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }

    return responses['default'];
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== SEARCH FUNCTIONALITY ==========
/**
 * Initialize search bar functionality
 * Features:
 * - Submit search on Enter
 * - Trigger search on button click
 * - TODO: Connect to backend search
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Add visual feedback on focus
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 98, 139, 0.2)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.boxShadow = '';
        });
    }

    console.log('✓ Search initialized');
}

/**
 * Handle search submission
 * TODO: Connect to backend/database search
 */
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search term');
        return;
    }

    console.log('🔍 Search query:', query);
    
    // TODO: Replace with actual backend API call
    // Example: fetch(`/api/search?q=${encodeURIComponent(query)}`)
    
    alert(`Search functionality coming soon!\n\nYour query: "${query}"\n\nBackend integration in progress...`);
}

// ========== SCROLL EFFECTS ==========
/**
 * Initialize scroll effects
 * Features:
 * - Fade-in animations on scroll
 * - Smooth scroll behavior
 */
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service cards and sections
    document.querySelectorAll('.service-card, .intro-section').forEach(el => {
        observer.observe(el);
    });

    console.log('✓ Scroll effects initialized');
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of target element
 */
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to toggle
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * Add class to element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to add
 */
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove class from element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to remove
 */
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

// ========== RESPONSIVE DESIGN HANDLER ==========
/**
 * Handle responsive design breakpoint changes
 */
function handleResponsive() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('resize', () => {
        // Reset mobile menu when resizing to desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

handleResponsive();

// ========== FORM VALIDATION ==========

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Handle newsletter subscription
 * TODO: Connect to backend email service
 */
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('.newsletter-input');
        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        console.log('✓ Newsletter subscription:', email);
        
        // TODO: Send to backend
        // Example: fetch('/api/newsletter/subscribe', {...})
        
        alert('Thank you for subscribing!\n\nYou will receive our latest news and updates.');
        emailInput.value = '';
    });
});

// ========== ANALYTICS & LOGGING ==========

/**
 * Track page load and user interactions
 * TODO: Integrate with analytics service (Google Analytics, Mixpanel, etc.)
 */
function initializeAnalytics() {
    console.log('📊 Page loaded:', {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
    });

    // Track button clicks
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', function(e) {
            const action = this.textContent.trim() || this.id || this.className;
            console.log('👆 Interaction:', action);
            // TODO: Send to analytics service
        });
    });
}

initializeAnalytics();

// ========== ERROR HANDLING ==========

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('❌ JavaScript Error:', {
        message: event.message,
        file: event.filename,
        line: event.lineno,
        col: event.colno
    });
    // TODO: Send to error tracking service (Sentry, Rollbar, etc.)
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
    // TODO: Send to error tracking service
});

// ========== KEYBOARD SHORTCUTS (OPTIONAL) ==========

/**
 * Initialize keyboard shortcuts
 * Ctrl/Cmd + K: Open search
 * Ctrl/Cmd + Shift + C: Open chatbot
 */
document.addEventListener('keydown', (e) => {
    // Open search bar
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
        console.log('🔍 Search shortcut triggered');
    }

    // Open chatbot
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        const chatbotWindow = document.getElementById('chatbotWindow');
        chatbotWindow.classList.toggle('active');
        console.log('💬 Chatbot shortcut triggered');
    }
});

// ========== SERVICE WORKER REGISTRATION (OPTIONAL) ==========

/**
 * Register service worker for progressive web app (PWA)
 * TODO: Create service-worker.js file for offline support
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(reg => console.log('✓ Service Worker registered', reg))
        //     .catch(err => console.error('✗ Service Worker registration failed', err));
    });
}

// ========== DEBUG MODE ==========

/**
 * Enable debug mode by typing 'debug()' in console
 */
window.debug = function() {
    console.log('%c🔧 DEBUG MODE ENABLED', 'color: #00628b; font-size: 16px; font-weight: bold;');
    console.log('Available functions:');
    console.log('- smoothScroll(id)');
    console.log('- toggleClass(element, className)');
    console.log('- addClass(element, className)');
    console.log('- removeClass(element, className)');
    console.log('- isValidEmail(email)');
    console.table({
        'Page Title': document.title,
        'URL': window.location.href,
        'Screen Width': window.innerWidth,
        'Screen Height': window.innerHeight,
        'Device Type': window.innerWidth <= 480 ? 'Mobile' : window.innerWidth <= 768 ? 'Tablet' : 'Desktop'
    });
};

console.log('%cUniversity of Rwanda Website v1.0', 'color: #00628b; font-size: 14px; font-weight: bold;');
console.log('%cFor debugging, type: debug()', 'color: #666; font-size: 12px;');
