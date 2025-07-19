// Advanced animation system
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
    }

    setupIntersectionObservers() {
        // Fade in animation observer
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerFadeIn(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Slide in animation observer
        const slideInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerSlideIn(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });

        // Scale animation observer
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScale(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        this.observers.set('fadeIn', fadeInObserver);
        this.observers.set('slideIn', slideInObserver);
        this.observers.set('scale', scaleObserver);

        // Observe elements
        this.observeElements();
    }

    observeElements() {
        // Fade in animations
        document.querySelectorAll('[data-animate="fade-in"]').forEach(el => {
            this.observers.get('fadeIn').observe(el);
        });

        // Slide in animations
        document.querySelectorAll('[data-animate="slide-in"]').forEach(el => {
            this.observers.get('slideIn').observe(el);
        });

        // Scale animations
        document.querySelectorAll('[data-animate="scale"]').forEach(el => {
            this.observers.get('scale').observe(el);
        });

        // Auto-detect elements for animation
        this.autoDetectAnimations();
    }

    autoDetectAnimations() {
        // Automatically add animations to common elements
        document.querySelectorAll('.feature-card').forEach((el, index) => {
            el.setAttribute('data-animate', 'fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
            this.observers.get('fadeIn').observe(el);
        });

        document.querySelectorAll('.sustainability-card').forEach((el, index) => {
            el.setAttribute('data-animate', 'slide-in');
            el.style.animationDelay = `${index * 0.15}s`;
            this.observers.get('slideIn').observe(el);
        });

        document.querySelectorAll('.stat-card').forEach((el, index) => {
            el.setAttribute('data-animate', 'scale');
            el.style.animationDelay = `${index * 0.2}s`;
            this.observers.get('scale').observe(el);
        });
    }

    triggerFadeIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    triggerSlideIn(element) {
        const direction = element.getAttribute('data-direction') || 'left';
        const distance = element.getAttribute('data-distance') || '50px';
        
        element.style.opacity = '0';
        element.style.transform = this.getSlideTransform(direction, distance);
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        });
    }

    triggerScale(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    getSlideTransform(direction, distance) {
        const transforms = {
            left: `translateX(-${distance})`,
            right: `translateX(${distance})`,
            up: `translateY(-${distance})`,
            down: `translateY(${distance})`
        };
        return transforms[direction] || transforms.left;
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            this.updateParallax();
            this.updateProgressBars();
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                this.animateProgressBar(bar);
                bar.classList.add('animated');
            }
        });
    }

    animateProgressBar(bar) {
        const progress = bar.getAttribute('data-progress') || 0;
        const fill = bar.querySelector('.progress-fill');
        
        if (fill) {
            fill.style.width = '0%';
            fill.style.transition = 'width 2s ease-out';
            
            setTimeout(() => {
                fill.style.width = `${progress}%`;
            }, 100);
        }
    }

    setupHoverAnimations() {
        // Magnetic effect for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            this.addMagneticEffect(btn);
        });

        // Tilt effect for cards
        document.querySelectorAll('.feature-card, .sustainability-card').forEach(card => {
            this.addTiltEffect(card);
        });

        // Glow effect for interactive elements
        document.querySelectorAll('.nav-link, .social-links a').forEach(el => {
            this.addGlowEffect(el);
        });
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    }

    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    addGlowEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';
            element.style.transition = 'box-shadow 0.3s ease';
        });

        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = 'none';
        });
    }

    setupLoadingAnimations() {
        // Skeleton loading for images
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.setupLazyLoading(img);
        });

        // Stagger animations for lists
        document.querySelectorAll('.stagger-animation').forEach(container => {
            this.setupStaggerAnimation(container);
        });
    }

    setupLazyLoading(img) {
        const placeholder = document.createElement('div');
        placeholder.className = 'loading-shimmer';
        placeholder.style.width = img.getAttribute('width') || '100%';
        placeholder.style.height = img.getAttribute('height') || '200px';
        placeholder.style.borderRadius = '8px';
        
        img.parentNode.insertBefore(placeholder, img);
        img.style.display = 'none';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const src = img.getAttribute('data-src');
                    img.src = src;
                    
                    img.onload = () => {
                        placeholder.remove();
                        img.style.display = 'block';
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.5s ease';
                        
                        requestAnimationFrame(() => {
                            img.style.opacity = '1';
                        });
                    };
                    
                    observer.unobserve(img);
                }
            });
        });

        observer.observe(img);
    }

    setupStaggerAnimation(container) {
        const children = container.children;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(container);
                }
            });
        });

        // Initialize children
        Array.from(children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.5s ease';
        });

        observer.observe(container);
    }

    // Public methods for manual animation control
    animateElement(element, animation, options = {}) {
        const animations = {
            fadeIn: () => this.triggerFadeIn(element),
            slideIn: () => this.triggerSlideIn(element),
            scale: () => this.triggerScale(element),
            bounce: () => this.addBounceAnimation(element),
            pulse: () => this.addPulseAnimation(element)
        };

        if (animations[animation]) {
            animations[animation]();
        }
    }

    addBounceAnimation(element) {
        element.style.animation = 'bounce 1s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }

    addPulseAnimation(element) {
        element.style.animation = 'pulse 2s infinite';
    }

    removeAnimation(element) {
        element.style.animation = '';
        element.style.transform = '';
        element.style.opacity = '';
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}