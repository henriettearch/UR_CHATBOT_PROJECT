# 🎓 University of Rwanda - Website Prototype

A fully responsive, modern university website prototype with a floating AI chatbot, professional navigation, and complete backend structure ready for integration.

## 📋 Project Overview

This is a comprehensive website prototype for the University of Rwanda, featuring:
- **Responsive Design** - Mobile, tablet, and desktop optimization
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Floating Chatbot** - AI-ready chat interface for student support
- **Backend Structure** - PHP framework for API integration
- **Production-Ready** - Well-organized code with detailed comments

## 🎨 Design Features

### Color Scheme
- **Primary Color**: `#00628b` (Professional Blue)
- **Secondary Color**: `#ffffff` (White)
- **Accent Colors**: Gradients and hover effects for interactivity

### Key Sections

#### 1. **Top Utility Bar**
Quick access links to:
- Colleges
- Centers of Colleges
- Library
- Emails

#### 2. **Sticky Navigation Bar**
- Logo with university branding
- Dropdown menu for "About" section
- Fully responsive hamburger menu
- Interactive search bar

#### 3. **Hero Section**
- Welcome banner with gradient background
- Call-to-action buttons
- Animated background elements

#### 4. **Main Content**
- Introduction section with mission/vision
- Services cards grid (6 services with icons)
- Fully responsive layout

#### 5. **Floating Chatbot**
- Bottom-right corner placement
- Smooth open/close animations
- Message history display
- Ready for AI API integration

#### 6. **Footer**
- 4-column layout with comprehensive information
- Social media links
- Newsletter subscription form
- Contact information

## 📱 Responsive Breakpoints

```
Desktop:  1200px and above
Tablet:   768px - 1199px
Mobile:   480px - 767px
Small:    Below 480px
```

## 🗂️ Project Structure

```
UR-CHATBOT PROJECT/
├── index.html          # Main HTML page
├── style.css           # Responsive stylesheet (1200+ lines)
├── dom.js              # JavaScript interactions and animations
├── linked.php          # Backend API structure
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- PHP 7.4+ (for backend features)
- MySQL (for database integration)
- Text editor or IDE

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd UR-CHATBOT PROJECT
   ```

2. **For static preview** (HTML/CSS/JS only)
   - Open `index.html` directly in your browser

3. **For local development with PHP**
   ```bash
   # Using PHP built-in server
   php -S localhost:8000
   
   # Then visit: http://localhost:8000
   ```

4. **For production**
   - Deploy to web server (Apache, Nginx)
   - Configure database connection in `linked.php`
   - Set up environment variables
   - Enable SSL/TLS

## 🎯 Features & Functionality

### Frontend Features

#### Navigation
- ✅ Sticky navigation on scroll
- ✅ Responsive hamburger menu for mobile
- ✅ Dropdown menu with smooth animations
- ✅ Interactive search bar
- ✅ Keyboard shortcuts (Ctrl+K for search)

#### Chatbot
- ✅ Floating button with animation
- ✅ Modal chat window with messages
- ✅ User/bot message differentiation
- ✅ Enter key to send messages
- ✅ Smooth scroll in chat
- ✅ Ready for AI API integration

#### Interactions
- ✅ Smooth scroll behavior
- ✅ Fade-in animations on scroll
- ✅ Hover effects on all interactive elements
- ✅ Form validation (email)
- ✅ Keyboard accessibility

### Backend Features (PHP)

#### API Endpoints

**1. Chatbot API**
```
POST /api/chatbot
{
  "message": "string",
  "conversation_id": "string (optional)"
}
```

**2. Search API**
```
GET /api/search?q=query&type=courses&limit=20
```

**3. Newsletter API**
```
POST /api/newsletter/subscribe
POST /api/newsletter/unsubscribe
```

**4. Health Check**
```
GET /api/health
```

## 📝 Code Documentation

### JavaScript Functions

#### Navigation Functions
```javascript
initializeNavigation()      // Setup navbar functionality
initializeDropdowns()       // Handle dropdown menus
handleResponsive()          // Responsive design handling
```

#### Chatbot Functions
```javascript
initializeChatbot()         // Initialize chatbot
sendChatMessage()           // Send user message
addBotMessage(msg)          // Display bot response
generateDummyResponse(msg)  // Dummy AI response
```

#### Utility Functions
```javascript
smoothScroll(id)            // Smooth scroll to element
toggleClass(el, cls)        // Toggle CSS class
isValidEmail(email)         // Email validation
escapeHtml(text)            // HTML escape for security
```

### CSS Organization

```css
/* Global Styles */
:root                       /* CSS variables/theme */
* { }                       /* Universal styles */

/* Components */
.utility-bar                /* Top utility bar */
.navbar                     /* Navigation bar */
.hero                       /* Hero section */
.service-card               /* Service cards */
.chatbot-window             /* Chatbot window */
.footer                     /* Footer section */

/* Responsive */
@media (max-width: 768px)   /* Tablet styles */
@media (max-width: 480px)   /* Mobile styles */
```

### PHP Structure

```php
/* Database Connection */
class Database { }

/* API Classes */
class ChatbotAPI { }
class SearchAPI { }
class NewsletterAPI { }

/* Utility Functions */
sanitizeInput()             /* Input sanitization */
successResponse()           /* Success JSON response */
errorResponse()             /* Error JSON response */

/* Routing */
API routing logic           /* Request handling */
```

## 🔧 Customization Guide

### Changing Colors

Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #00628b;      /* Change primary color */
    --primary-dark: #004d6b;       /* Change dark shade */
    --primary-light: #1a7ba8;      /* Change light shade */
    --secondary-color: #ffffff;    /* Change secondary color */
}
```

### Modifying Content

**Hero Section** - Edit in `index.html`:
```html
<h1 class="hero-title">Your Title Here</h1>
<p class="hero-subtitle">Your subtitle here</p>
```

**Service Cards** - Duplicate and modify:
```html
<div class="service-card">
    <div class="card-icon">🎓</div>
    <h3>Your Service</h3>
    <p>Your description</p>
</div>
```

### Adding New Pages

1. Create new HTML file (e.g., `about.html`)
2. Use same HTML structure (navbar, footer)
3. Include same CSS and JS files
4. Update navigation links

## 🤖 AI Chatbot Integration

### Currently Implemented
- Frontend chatbot UI with message display
- Dummy response logic
- Message history display
- Chat input and submission

### To Integrate AI Service

**Option 1: OpenAI API**
```javascript
// In dom.js, replace generateDummyResponse()
async function generateDummyResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{role: 'user', content: userMessage}]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
```

**Option 2: Backend Processing**
```javascript
// In dom.js
async function sendChatMessage() {
    const message = document.getElementById('chatInput').value;
    
    const response = await fetch('/linked.php?action=chatbot', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: message})
    });
    
    const data = await response.json();
    addBotMessage(data.bot_response);
}
```

## 🔐 Security Considerations

### Current Implementation
- HTML escaping for XSS prevention
- Input sanitization functions
- CSRF protection headers ready
- Email validation

### Before Production
- [ ] Implement CSRF tokens
- [ ] Add rate limiting
- [ ] Set up HTTPS/SSL
- [ ] Implement authentication
- [ ] Add database encryption
- [ ] Set up Web Application Firewall (WAF)
- [ ] Regular security audits
- [ ] Keep dependencies updated

## 📦 Backend Integration Checklist

- [ ] **Database Setup**
  - [ ] Create MySQL database
  - [ ] Define table schemas
  - [ ] Set up indexes and relationships
  
- [ ] **Authentication**
  - [ ] Student portal login
  - [ ] Admin authentication
  - [ ] JWT tokens or sessions
  
- [ ] **Email Service**
  - [ ] Newsletter integration (SendGrid, Mailgun)
  - [ ] Confirmation emails
  - [ ] Password reset emails
  
- [ ] **Chatbot AI**
  - [ ] Choose AI provider (OpenAI, DialogFlow)
  - [ ] Set up API authentication
  - [ ] Implement conversation context
  - [ ] Set up response caching
  
- [ ] **Analytics**
  - [ ] Google Analytics integration
  - [ ] User behavior tracking
  - [ ] Error monitoring (Sentry)
  
- [ ] **Performance**
  - [ ] Implement caching (Redis)
  - [ ] Database optimization
  - [ ] CDN for static files
  - [ ] Image optimization

## 🧪 Testing

### Manual Testing Checklist

**Desktop**
- [ ] Navigation menu functions
- [ ] Dropdown menu appears and disappears
- [ ] Search bar works
- [ ] Chatbot opens/closes
- [ ] Links navigate correctly
- [ ] Forms validate input

**Tablet (768px)**
- [ ] Hamburger menu appears
- [ ] Navigation is accessible
- [ ] Cards stack correctly
- [ ] Footer is readable

**Mobile (480px)**
- [ ] All elements fit screen
- [ ] Touch targets are large enough
- [ ] Images scale properly
- [ ] Text is readable

### Automated Testing (Optional)
```bash
# Unit testing with Jest
npm install jest
npm test

# E2E testing with Cypress
npm install cypress
npx cypress open
```

## 🚀 Deployment

### Local Development
```bash
php -S localhost:8000
```

### Shared Hosting
1. Upload files via FTP
2. Configure database
3. Set file permissions (755)
4. Update `linked.php` with database credentials

### Cloud Deployment (Heroku, AWS, Google Cloud)
```bash
# Example: Heroku deployment
git init
git add .
git commit -m "Initial commit"
heroku create
git push heroku main
```

## 📚 Resources & References

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [PHP Manual](https://www.php.net/manual/)

### Useful Libraries (Optional)
- **UI Components**: Bootstrap, Tailwind CSS
- **Animations**: AOS (Animate On Scroll)
- **Chatbot**: Botpress, Rasa
- **Database**: Laravel Eloquent, Doctrine ORM

### AI Services
- [OpenAI API](https://openai.com/api/)
- [Google DialogFlow](https://cloud.google.com/dialogflow)
- [Microsoft Bot Framework](https://dev.botframework.com/)
- [IBM Watson](https://www.ibm.com/cloud/watson)

## 🐛 Troubleshooting

### Chatbot Not Working
- Check browser console for errors (F12)
- Verify `dom.js` is loaded
- Ensure JavaScript is enabled

### Styles Not Applying
- Clear browser cache (Ctrl+Shift+Delete)
- Check file path in HTML
- Verify CSS file is in correct location

### PHP Backend Issues
- Check PHP version compatibility
- Verify file permissions
- Check error logs in browser console
- Test with `http://localhost:8000/api/health`

### Responsive Design Issues
- Test with browser DevTools (F12)
- Check CSS media queries
- Verify viewport meta tag is present

## 📄 License

This project is provided as-is for educational and development purposes.

## 👥 Support & Contact

For issues, questions, or contributions:
- Email: info@ur.ac.rw
- Website: www.ur.ac.rw
- GitHub: [Your Repository]

## 🎉 Version History

**v1.0.0** (2024)
- Initial release
- Complete responsive design
- Chatbot framework
- Backend API structure

---

**Last Updated**: February 2024  
**Maintained By**: Development Team  
**Status**: Ready for Integration
