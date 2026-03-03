<?php
/**
 * ===================================================
 * UNIVERSITY WEBSITE - PHP BACKEND STRUCTURE
 * File: linked.php
 * Purpose: Backend routing, API endpoints, and database integration
 * Status: Structure ready for development
 * ===================================================
 */

// Enable error reporting for development (disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers for JSON responses
header('Content-Type: application/json; charset=utf-8');

// ========== CORS HEADERS ==========
// Allow requests from frontend (adjust origin for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ========== DATABASE CONNECTION (STRUCTURE) ==========
/**
 * Database connection configuration
 * TODO: Replace with actual database credentials
 */
class Database {
    private $host = 'localhost';
    private $db_name = 'ur_chatbot_db';
    private $user = 'root';
    private $password = '';
    private $conn;

    /**
     * Connect to database
     * @return mysqli|null Database connection
     */
    public function connect() {
        // TODO: Implement actual database connection
        // $this->conn = new mysqli($this->host, $this->user, $this->password, $this->db_name);
        
        // if ($this->conn->connect_error) {
        //     error_log("Database connection failed: " . $this->conn->connect_error);
        //     return null;
        // }
        
        return $this->conn;
    }
}

// ========== CHATBOT API ENDPOINTS ==========

/**
 * Class: ChatbotAPI
 * Handles all chatbot-related API requests
 * TODO: Integrate with AI service (OpenAI, Azure Bot Service, Custom NLP, etc.)
 */
class ChatbotAPI {
    
    /**
     * Process user message and generate response
     * 
     * Expected POST data:
     * {
     *     "message": "User's question",
     *     "conversation_id": "optional_conversation_id"
     * }
     * 
     * TODO: Connect to AI service
     * - OpenAI API
     * - Google DialogFlow
     * - Microsoft Bot Framework
     * - Custom ML model
     * 
     * @return array Response with bot message
     */
    public static function processMessage() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['message'])) {
            return self::errorResponse('Message is required', 400);
        }

        $userMessage = sanitizeInput($input['message']);
        $conversationId = isset($input['conversation_id']) ? $input['conversation_id'] : null;

        // TODO: Process message with AI service
        $botResponse = self::generateResponse($userMessage, $conversationId);

        return self::successResponse([
            'user_message' => $userMessage,
            'bot_response' => $botResponse,
            'conversation_id' => $conversationId,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }

    /**
     * Generate bot response
     * TODO: Replace dummy logic with actual AI integration
     * 
     * @param string $message User message
     * @param string|null $conversationId Conversation ID
     * @return string Bot response
     */
    private static function generateResponse($message, $conversationId = null) {
        // TODO: Implement actual AI response generation
        // This is dummy logic for demonstration
        
        $responses = [
            'admissions' => 'For admissions inquiries, please contact admissions@ur.ac.rw or visit our admissions office.',
            'courses' => 'We offer undergraduate, postgraduate, and short courses. Visit our academics section for more information.',
            'fees' => 'Fee information is available in the academics section. For specific details, contact the registrar.',
            'library' => 'The UR library offers comprehensive resources. Visit the library portal for more details.',
            'hostel' => 'Accommodation services are managed by our student welfare office.',
            'default' => 'Thank you for your inquiry. For more information, please contact info@ur.ac.rw or visit www.ur.ac.rw'
        ];

        $lowerMessage = strtolower($message);
        foreach ($responses as $key => $value) {
            if (strpos($lowerMessage, $key) !== false) {
                return $value;
            }
        }

        return $responses['default'];
    }

    /**
     * Save message to conversation history
     * TODO: Implement database saving
     * 
     * @param string $conversationId Conversation ID
     * @param string $userMessage User message
     * @param string $botResponse Bot response
     * @return bool Success status
     */
    public static function saveMessage($conversationId, $userMessage, $botResponse) {
        // TODO: Save to database
        // INSERT INTO conversation_messages (conversation_id, user_message, bot_response, created_at)
        // VALUES (?, ?, ?, NOW())
        
        return true;
    }

    /**
     * Get conversation history
     * TODO: Implement database retrieval
     * 
     * @param string $conversationId Conversation ID
     * @return array Conversation messages
     */
    public static function getConversationHistory($conversationId) {
        // TODO: Retrieve from database
        // SELECT * FROM conversation_messages WHERE conversation_id = ? ORDER BY created_at ASC
        
        return [];
    }
}

// ========== SEARCH API ENDPOINTS ==========

/**
 * Class: SearchAPI
 * Handles search functionality
 * TODO: Implement full-text search with database
 */
class SearchAPI {
    
    /**
     * Search across website content
     * 
     * Expected GET parameters:
     * - q: search query (required)
     * - type: content type (optional) - 'courses', 'news', 'people', 'all'
     * - limit: results limit (optional) - default 20
     * 
     * @return array Search results
     */
    public static function search() {
        $query = isset($_GET['q']) ? sanitizeInput($_GET['q']) : null;
        $type = isset($_GET['type']) ? sanitizeInput($_GET['type']) : 'all';
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;

        if (!$query || strlen($query) < 2) {
            return self::errorResponse('Search query must be at least 2 characters', 400);
        }

        // TODO: Implement actual database search
        // SELECT * FROM content WHERE 
        // (title LIKE ? OR description LIKE ? OR content LIKE ?)
        // AND type = (? OR type IN (...))
        // LIMIT ?

        $results = self::performSearch($query, $type, $limit);

        return self::successResponse([
            'query' => $query,
            'type' => $type,
            'total_results' => count($results),
            'results' => $results
        ]);
    }

    /**
     * Perform actual search
     * TODO: Replace with database full-text search
     * 
     * @param string $query Search query
     * @param string $type Content type
     * @param int $limit Results limit
     * @return array Search results
     */
    private static function performSearch($query, $type, $limit) {
        // TODO: Implement database search logic
        return [];
    }
}

// ========== NEWSLETTER API ENDPOINTS ==========

/**
 * Class: NewsletterAPI
 * Handles newsletter subscription
 * TODO: Integrate with email service provider
 */
class NewsletterAPI {
    
    /**
     * Subscribe to newsletter
     * 
     * Expected POST data:
     * {
     *     "email": "user@example.com"
     * }
     * 
     * @return array Response status
     */
    public static function subscribe() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['email'])) {
            return self::errorResponse('Email is required', 400);
        }

        $email = sanitizeInput($input['email']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return self::errorResponse('Invalid email format', 400);
        }

        // TODO: Save to database
        // INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, NOW())
        // ON DUPLICATE KEY UPDATE subscribed_at = NOW()

        // TODO: Send confirmation email
        self::sendConfirmationEmail($email);

        return self::successResponse([
            'message' => 'Successfully subscribed to newsletter',
            'email' => $email,
            'subscribed_at' => date('Y-m-d H:i:s')
        ]);
    }

    /**
     * Send confirmation email
     * TODO: Integrate with email service (SendGrid, Mailgun, SMTP, etc.)
     * 
     * @param string $email Subscriber email
     * @return bool Success status
     */
    private static function sendConfirmationEmail($email) {
        // TODO: Send email using:
        // - mail() function
        // - PHPMailer library
        // - SendGrid API
        // - AWS SES
        
        error_log("Newsletter confirmation sent to: $email");
        return true;
    }

    /**
     * Unsubscribe from newsletter
     * 
     * @return array Response status
     */
    public static function unsubscribe() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['email'])) {
            return self::errorResponse('Email is required', 400);
        }

        $email = sanitizeInput($input['email']);

        // TODO: Delete or mark as unsubscribed
        // UPDATE newsletter_subscribers SET unsubscribed_at = NOW() WHERE email = ?

        return self::successResponse([
            'message' => 'Successfully unsubscribed',
            'email' => $email
        ]);
    }
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Sanitize user input
 * Remove potentially harmful characters
 * 
 * @param string $input Raw user input
 * @return string Sanitized input
 */
function sanitizeInput($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Return success response
 * 
 * @param array $data Response data
 * @param int $code HTTP status code
 * @return array JSON response
 */
function successResponse($data, $code = 200) {
    http_response_code($code);
    return [
        'status' => 'success',
        'code' => $code,
        'data' => $data
    ];
}

/**
 * Return error response
 * 
 * @param string $message Error message
 * @param int $code HTTP status code
 * @return array JSON response
 */
function errorResponse($message, $code = 400) {
    http_response_code($code);
    return [
        'status' => 'error',
        'code' => $code,
        'message' => $message
    ];
}

// ========== API ROUTING ==========

/**
 * Route API requests to appropriate handlers
 * URL Pattern: /api/endpoint
 */

// Get request method
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($requestUri, '/'));

// Extract endpoint
$endpoint = isset($pathParts[1]) ? $pathParts[1] : null;
$action = isset($pathParts[2]) ? $pathParts[2] : null;

try {
    // Route requests
    if ($endpoint === 'api') {
        switch ($action) {
            // Chatbot endpoints
            case 'chatbot':
                if ($requestMethod === 'POST') {
                    echo json_encode(ChatbotAPI::processMessage());
                } else {
                    echo json_encode(errorResponse('Method not allowed', 405));
                }
                break;

            // Search endpoint
            case 'search':
                if ($requestMethod === 'GET') {
                    echo json_encode(SearchAPI::search());
                } else {
                    echo json_encode(errorResponse('Method not allowed', 405));
                }
                break;

            // Newsletter endpoints
            case 'newsletter':
                $subAction = isset($pathParts[3]) ? $pathParts[3] : null;
                
                if ($requestMethod === 'POST') {
                    if ($subAction === 'subscribe') {
                        echo json_encode(NewsletterAPI::subscribe());
                    } elseif ($subAction === 'unsubscribe') {
                        echo json_encode(NewsletterAPI::unsubscribe());
                    } else {
                        echo json_encode(errorResponse('Invalid newsletter action', 400));
                    }
                } else {
                    echo json_encode(errorResponse('Method not allowed', 405));
                }
                break;

            // Health check endpoint
            case 'health':
                if ($requestMethod === 'GET') {
                    echo json_encode(successResponse([
                        'status' => 'ok',
                        'timestamp' => date('Y-m-d H:i:s'),
                        'version' => '1.0.0'
                    ]));
                } else {
                    echo json_encode(errorResponse('Method not allowed', 405));
                }
                break;

            default:
                echo json_encode(errorResponse('Endpoint not found', 404));
                break;
        }
    } else {
        // If not API endpoint, serve index.html (for SPA routing)
        // header('Location: index.html');
        echo json_encode(errorResponse('Not found', 404));
    }

} catch (Exception $e) {
    error_log('API Error: ' . $e->getMessage());
    echo json_encode(errorResponse('Internal server error', 500));
}

// ========== TODO: INTEGRATION CHECKLIST ==========
/**
 * BACKEND INTEGRATION CHECKLIST:
 * 
 * [ ] Database Setup
 *     - [ ] Create MySQL database
 *     - [ ] Create tables: conversation_messages, newsletter_subscribers, content, users
 *     - [ ] Set up connection pooling
 * 
 * [ ] AI Chatbot Integration
 *     - [ ] Choose AI service (OpenAI, DialogFlow, Azure, Custom)
 *     - [ ] Implement API authentication
 *     - [ ] Add conversation memory/context
 *     - [ ] Set up response caching
 * 
 * [ ] Email Service Integration
 *     - [ ] Choose email provider (SendGrid, Mailgun, AWS SES)
 *     - [ ] Create email templates
 *     - [ ] Set up unsubscribe handling
 *     - [ ] Add email validation
 * 
 * [ ] Security
 *     - [ ] Implement input validation
 *     - [ ] Add rate limiting
 *     - [ ] Implement CSRF protection
 *     - [ ] Set up SSL/TLS
 *     - [ ] Add authentication/authorization
 * 
 * [ ] Performance
 *     - [ ] Set up caching (Redis)
 *     - [ ] Implement database indexing
 *     - [ ] Add API response compression
 *     - [ ] Set up CDN for static files
 * 
 * [ ] Monitoring & Logging
 *     - [ ] Set up error logging
 *     - [ ] Add request logging
 *     - [ ] Implement performance monitoring
 *     - [ ] Set up alerting
 * 
 * [ ] Testing
 *     - [ ] Unit tests
 *     - [ ] Integration tests
 *     - [ ] API tests
 *     - [ ] Load testing
 */

?>
