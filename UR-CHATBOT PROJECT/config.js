/**
 * =====================================================
 * QUICK SETUP & CONFIGURATION GUIDE
 * University of Rwanda Website Prototype
 * =====================================================
 */

// FILE: config.js (OPTIONAL - For future backend configuration)

// Configuration object for environment settings
const CONFIG = {
    // Environment
    env: 'development', // 'development', 'staging', 'production'
    
    // API Endpoints
    api: {
        base: 'http://localhost:8000',
        chatbot: '/api/chatbot',
        search: '/api/search',
        newsletter: '/api/newsletter',
        health: '/api/health'
    },
    
    // Chatbot Settings
    chatbot: {
        enabled: true,
        aiService: 'dummy', // 'openai', 'dialogflow', 'custom', 'dummy'
        responseDelay: 500, // milliseconds
        maxMessages: 100,
        persistConversation: true,
        
        // API Keys (DO NOT commit to git in production!)
        apiKey: process.env.CHATBOT_API_KEY || '',
        projectId: process.env.CHATBOT_PROJECT_ID || ''
    },
    
    // Analytics
    analytics: {
        enabled: true,
        googleAnalyticsId: 'UA-XXXXXXXXX-X',
        enableConsoleLogging: true
    },
    
    // Email Service
    email: {
        service: 'sendgrid', // 'sendgrid', 'mailgun', 'smtp'
        apiKey: process.env.EMAIL_API_KEY || '',
        fromAddress: 'noreply@ur.ac.rw',
        fromName: 'University of Rwanda'
    },
    
    // Theme
    theme: {
        primaryColor: '#00628b',
        secondaryColor: '#ffffff',
        accentColor: '#1a7ba8'
    },
    
    // Features
    features: {
        search: true,
        newsletter: true,
        chatbot: true,
        socialMedia: true,
        analytics: true
    },
    
    // UI Settings
    ui: {
        animationsEnabled: true,
        transitionDuration: 300, // milliseconds
        debounceDelay: 250
    }
};

// Get configuration value
function getConfig(path) {
    const keys = path.split('.');
    let value = CONFIG;
    
    for (const key of keys) {
        value = value[key];
        if (value === undefined) return null;
    }
    
    return value;
}

// Set configuration value
function setConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let obj = CONFIG;
    
    for (const key of keys) {
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
    }
    
    obj[lastKey] = value;
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, getConfig, setConfig };
}

// =====================================================
// ENVIRONMENT VARIABLES (Create .env file in root)
// =====================================================

/*
# .env file (DO NOT COMMIT TO GIT)

# Environment
NODE_ENV=development

# API
API_BASE_URL=http://localhost:8000
API_TIMEOUT=30000

# Chatbot Configuration
CHATBOT_ENABLED=true
CHATBOT_API_KEY=your_api_key_here
CHATBOT_PROJECT_ID=your_project_id_here
CHATBOT_SERVICE=openai # Options: openai, dialogflow, custom

# Email Service
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@ur.ac.rw

# Database
DB_HOST=localhost
DB_NAME=ur_chatbot_db
DB_USER=root
DB_PASSWORD=your_password

# Analytics
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
SENTRY_DSN=your_sentry_dsn

# Security
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000

*/

// =====================================================
// DATABASE SETUP SCRIPT
// =====================================================

/**
 * SQL Script to create database tables
 * Run this in MySQL/MariaDB
 */

/*

-- Create database
CREATE DATABASE IF NOT EXISTS ur_chatbot_db;
USE ur_chatbot_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Conversations table
CREATE TABLE conversations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INT,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_user_id (user_id)
);

-- Conversation messages table
CREATE TABLE conversation_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id VARCHAR(255) NOT NULL,
    user_message TEXT,
    bot_response TEXT,
    message_type ENUM('text', 'quick_reply', 'image', 'document') DEFAULT 'text',
    user_satisfaction INT, -- 1-5 rating or NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_created_at (created_at)
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    verification_token VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    INDEX idx_email (email),
    INDEX idx_subscribed_at (subscribed_at)
);

-- Content table (for search functionality)
CREATE TABLE content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content LONGTEXT,
    content_type ENUM('course', 'news', 'event', 'program', 'page') DEFAULT 'page',
    tags VARCHAR(255),
    published BOOLEAN DEFAULT FALSE,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_content_type (content_type),
    INDEX idx_published (published),
    FULLTEXT idx_search (title, description, content)
);

-- Create indexes for performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_conversation_user ON conversations(user_id, created_at);
CREATE INDEX idx_message_conversation ON conversation_messages(conversation_id, created_at);

*/

// =====================================================
// SETUP CHECKLIST FOR DEVELOPERS
// =====================================================

/**
SETUP CHECKLIST:

[ ] Initial Setup
    [ ] Clone/download project
    [ ] Copy .env.example to .env
    [ ] Update environment variables
    [ ] Install dependencies (if using npm)

[ ] Database Configuration
    [ ] Create MySQL database
    [ ] Run database setup script (SQL above)
    [ ] Configure DB credentials in .env
    [ ] Test database connection

[ ] Frontend Configuration
    [ ] Update API endpoints in config.js
    [ ] Customize theme colors in style.css
    [ ] Update university branding/logo
    [ ] Configure analytics ID

[ ] Backend Configuration
    [ ] Update linked.php database credentials
    [ ] Configure AI chatbot API key
    [ ] Set up email service credentials
    [ ] Configure CORS origins

[ ] Testing
    [ ] Test responsive design (mobile, tablet, desktop)
    [ ] Test navigation and menu functionality
    [ ] Test chatbot interface
    [ ] Test form validation and submission
    [ ] Check console for errors (F12)

[ ] Security
    [ ] Review and update CORS headers
    [ ] Set up HTTPS/SSL certificate
    [ ] Configure rate limiting
    [ ] Set up input validation
    [ ] Review authentication logic

[ ] Deployment
    [ ] Build production version
    [ ] Test on staging server
    [ ] Perform security audit
    [ ] Deploy to production
    [ ] Monitor error logs

*/

// =====================================================
// USEFUL DEVELOPMENT COMMANDS
// =====================================================

/**
# Start local PHP server
php -S localhost:8000

# Test API health
curl http://localhost:8000/api/health

# View PHP error logs
tail -f /var/log/apache2/error.log

# Check if port is in use
lsof -i :8000

# Create database dump
mysqldump -u root -p ur_chatbot_db > backup.sql

# Restore database
mysql -u root -p ur_chatbot_db < backup.sql

# Check file permissions
ls -la

# Set proper permissions
chmod 755 *.php
chmod 644 *.html *.css *.js

*/

// =====================================================
// COMMON INTEGRATION PATTERNS
// =====================================================

/**
 * PATTERN 1: Frontend calling Backend API
 */

// Frontend (JavaScript)
async function callAPI(endpoint, method = 'GET', data = null) {
    const url = `${getConfig('api.base')}${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * PATTERN 2: Backend handling API requests
 */

// Backend (PHP - linked.php)
// See linked.php for implementation examples

/**
 * PATTERN 3: Real-time chat integration
 */

// Using WebSockets (optional advanced feature)
/*
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onopen = () => {
    console.log('WebSocket connected');
};

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    addBotMessage(message.response);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket disconnected');
};
*/

// =====================================================
// TROUBLESHOOTING GUIDE
// =====================================================

/**

PROBLEM: Chatbot not showing
SOLUTION:
1. Check browser console (F12 > Console tab)
2. Verify dom.js is loaded: inspect page source
3. Check if chatbot-button element exists in HTML
4. Clear browser cache and reload

PROBLEM: API returns 404
SOLUTION:
1. Check URL path is correct
2. Verify .htaccess is configured for routing
3. Check if PHP is processing requests
4. Test with curl: curl http://localhost:8000/api/health

PROBLEM: Styles not applying
SOLUTION:
1. Check style.css file path in HTML
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check for CSS syntax errors
4. Verify media queries are working

PROBLEM: Database connection fails
SOLUTION:
1. Check MySQL is running
2. Verify credentials in linked.php
3. Check database exists
4. Test connection: php -r "new mysqli('localhost', 'root', '', 'ur_chatbot_db');"

PROBLEM: Mobile menu not working
SOLUTION:
1. Check hamburger element has correct ID
2. Verify JavaScript is enabled
3. Check browser console for errors
4. Test on different mobile device

*/

console.log('✓ Configuration file loaded');
console.log('ℹ️ Environment:', getConfig('env'));
console.log('ℹ️ API Base:', getConfig('api.base'));
