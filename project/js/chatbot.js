// AI Chatbot functionality
class SkillConnectChatbot {
    constructor() {
        this.responses = new Map();
        this.context = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.setupResponses();
        this.bindEvents();
    }

    setupResponses() {
        // Define chatbot responses
        this.responses.set('greeting', [
            "Hello! I'm your AI career assistant. How can I help you find your perfect green career today?",
            "Hi there! Ready to explore sustainable career opportunities? What interests you most?",
            "Welcome! I'm here to help you discover amazing green jobs and sustainable career paths."
        ]);

        this.responses.set('green_jobs', [
            "Great choice! Green jobs are the future. Are you interested in renewable energy, sustainable agriculture, or environmental consulting?",
            "Fantastic! The green sector is booming. What's your background - technical, business, or creative?",
            "Perfect timing! Green careers offer both purpose and growth. What type of impact do you want to make?"
        ]);

        this.responses.set('renewable_energy', [
            "Renewable energy is exciting! Popular roles include Solar Engineer, Wind Technician, Energy Analyst, and Project Manager. What's your experience level?",
            "The renewable sector needs diverse skills! From engineering to sales to policy work. What draws you to clean energy?",
            "Excellent choice! Renewable energy jobs are growing 70% faster than average. Are you interested in solar, wind, or emerging technologies?"
        ]);

        this.responses.set('skills', [
            "Let me help assess your skills! What's your educational background and current experience?",
            "Skills assessment is key to finding the right fit. Tell me about your strengths and interests.",
            "I can help identify transferable skills for green careers. What work have you enjoyed most?"
        ]);

        this.responses.set('training', [
            "We offer personalized training programs! Based on your goals, I can recommend courses in sustainability, green tech, or environmental management.",
            "Training is crucial for career transitions. Are you looking for certifications, degree programs, or hands-on workshops?",
            "Our AI-powered learning paths adapt to your pace. What specific skills do you want to develop?"
        ]);

        this.responses.set('salary', [
            "Green job salaries are competitive! Entry-level positions start around $45-60K, with senior roles reaching $100K+. Location and specialization matter most.",
            "Sustainability careers offer great earning potential. Many roles see 15-25% salary premiums due to high demand and specialized skills.",
            "The green economy pays well! Would you like salary ranges for specific roles or locations?"
        ]);

        this.responses.set('companies', [
            "We partner with 500+ green companies! From Tesla and Patagonia to local solar installers and environmental consultancies. What size company interests you?",
            "Our network includes startups, Fortune 500s, and nonprofits. Are you looking for corporate sustainability roles or pure-play green companies?",
            "Great question! We work with companies across all green sectors. Any particular industry or company culture you prefer?"
        ]);

        this.responses.set('location', [
            "Green jobs are everywhere! California, Texas, and New York lead in opportunities, but remote work is common. Where are you located?",
            "Location flexibility is a green job perk! Many roles offer hybrid or remote options. Are you open to relocating for the right opportunity?",
            "The green economy is global! We can help you find opportunities locally or internationally. What's your preference?"
        ]);

        this.responses.set('default', [
            "That's an interesting question! Can you tell me more about what you're looking for?",
            "I'd love to help with that. Could you provide more details about your specific interests?",
            "Let me understand better. Are you asking about career paths, skills, or something else?",
            "I'm here to help! Could you rephrase that or ask about green careers, training, or job opportunities?"
        ]);
    }

    bindEvents() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.querySelector('.chatbot-input button');

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Generate response after delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('p');
        messageContent.textContent = text;
        messageDiv.appendChild(messageContent);

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add to context
        this.context.push({ text, sender, timestamp: Date.now() });
        
        // Keep only last 10 messages in context
        if (this.context.length > 10) {
            this.context.shift();
        }
    }

    showTyping() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        // Add typing animation styles
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 8px 0;
            }
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                animation: typing 1.4s infinite ease-in-out;
            }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Analyze message for keywords
        const keywords = this.extractKeywords(lowerMessage);
        const category = this.categorizeMessage(keywords);
        
        // Get appropriate response
        const responses = this.responses.get(category) || this.responses.get('default');
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        // Add personalization based on context
        return this.personalizeResponse(response, keywords);
    }

    extractKeywords(message) {
        const keywordMap = {
            greeting: ['hello', 'hi', 'hey', 'start', 'begin'],
            green_jobs: ['green job', 'sustainable career', 'environmental job', 'eco job', 'climate job'],
            renewable_energy: ['solar', 'wind', 'renewable', 'clean energy', 'energy'],
            skills: ['skill', 'experience', 'qualification', 'background', 'ability'],
            training: ['training', 'course', 'learn', 'education', 'certification'],
            salary: ['salary', 'pay', 'money', 'income', 'wage', 'compensation'],
            companies: ['company', 'employer', 'organization', 'business', 'firm'],
            location: ['location', 'where', 'remote', 'city', 'country', 'place']
        };

        const foundKeywords = [];
        for (const [category, words] of Object.entries(keywordMap)) {
            for (const word of words) {
                if (message.includes(word)) {
                    foundKeywords.push(category);
                    break;
                }
            }
        }

        return foundKeywords;
    }

    categorizeMessage(keywords) {
        if (keywords.length === 0) return 'default';
        
        // Priority order for categories
        const priority = [
            'greeting', 'green_jobs', 'renewable_energy', 
            'skills', 'training', 'salary', 'companies', 'location'
        ];

        for (const category of priority) {
            if (keywords.includes(category)) {
                return category;
            }
        }

        return keywords[0] || 'default';
    }

    personalizeResponse(response, keywords) {
        // Add context-aware personalization
        const userMessages = this.context.filter(msg => msg.sender === 'user');
        
        if (userMessages.length === 0) {
            return response;
        }

        // Simple personalization based on previous messages
        if (keywords.includes('salary') && userMessages.some(msg => msg.text.includes('entry'))) {
            return response + " Since you mentioned entry-level, I'd recommend starting with internships or junior positions to build experience.";
        }

        if (keywords.includes('location') && userMessages.some(msg => msg.text.includes('remote'))) {
            return response + " I noticed you're interested in remote work - many green companies offer flexible arrangements!";
        }

        return response;
    }

    // Quick response buttons
    addQuickResponses() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const quickResponsesDiv = document.createElement('div');
        quickResponsesDiv.className = 'quick-responses';
        quickResponsesDiv.innerHTML = `
            <div class="quick-response-buttons">
                <button onclick="chatbot.handleQuickResponse('green_jobs')">Green Jobs</button>
                <button onclick="chatbot.handleQuickResponse('skills')">Skills Assessment</button>
                <button onclick="chatbot.handleQuickResponse('training')">Training Programs</button>
                <button onclick="chatbot.handleQuickResponse('salary')">Salary Info</button>
            </div>
        `;

        // Add styles for quick responses
        const style = document.createElement('style');
        style.textContent = `
            .quick-responses {
                margin: 1rem 0;
                padding: 1rem;
                background: rgba(16, 185, 129, 0.1);
                border-radius: 8px;
            }
            .quick-response-buttons {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            .quick-response-buttons button {
                padding: 0.5rem 1rem;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background-color 0.2s;
            }
            .quick-response-buttons button:hover {
                background: var(--primary-dark);
            }
        `;
        document.head.appendChild(style);

        messagesContainer.appendChild(quickResponsesDiv);
    }

    handleQuickResponse(category) {
        const responses = this.responses.get(category);
        if (responses) {
            const response = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(response, 'bot');
        }
    }

    // Initialize welcome message
    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hello! I'm your AI career assistant. How can I help you find your perfect green career today?", 'bot');
            this.addQuickResponses();
        }, 500);
    }
}

// Initialize chatbot when modal opens
function initChatbot() {
    if (!window.chatbot) {
        window.chatbot = new SkillConnectChatbot();
        window.chatbot.showWelcomeMessage();
    }
}

// Override the openModal function to initialize chatbot
const originalOpenModal = window.openModal;
window.openModal = function(modalId) {
    originalOpenModal(modalId);
    if (modalId === 'chatbot') {
        initChatbot();
    }
};

// Global sendMessage function for HTML onclick
window.sendMessage = function() {
    if (window.chatbot) {
        window.chatbot.sendMessage();
    }
};