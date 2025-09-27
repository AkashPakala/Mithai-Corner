// Product Data
const products = [
    {
        id: 1,
        name: "Gulab Jamun",
        category: "traditional",
        price: "₹120",
        description: "Soft, spongy milk dumplings soaked in rose-flavored sugar syrup",
        image: "photos/gulab-jamun.jpg",
        icon: "fas fa-candy-cane",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Rasgulla",
        category: "traditional",
        price: "₹100",
        description: "Spongy cottage cheese balls in light sugar syrup",
        image: "photos/rasgulla.jpg",
        icon: "fas fa-circle",
        badge: "Popular"
    },
    {
        id: 3,
        name: "Kaju Katli",
        category: "traditional",
        price: "₹200",
        description: "Diamond-shaped cashew fudge with silver leaf",
        image: "photos/kaju-katli.jpg",
        icon: "fas fa-gem",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Ladoo",
        category: "traditional",
        price: "₹80",
        description: "Round sweet balls made with gram flour and sugar",
        image: "photos/ladoo.jpg",
        icon: "fas fa-circle",
        badge: "Classic"
    },
    {
        id: 5,
        name: "Barfi",
        category: "traditional",
        price: "₹150",
        description: "Dense milk-based sweet with nuts and cardamom",
        image: "photos/barfi.jpg",
        icon: "fas fa-square",
        badge: "Traditional"
    },
    {
        id: 6,
        name: "Jalebi",
        category: "traditional",
        price: "₹90",
        description: "Crispy, spiral-shaped sweet soaked in syrup",
        image: "photos/jalebi.jpg",
        icon: "fas fa-circle",
        badge: "Crispy"
    },
    {
        id: 7,
        name: "Diwali Special Mix",
        category: "festival",
        price: "₹500",
        description: "Assorted sweets perfect for Diwali celebrations",
        image: "photos/diwali-mix.jpg",
        icon: "fas fa-gift",
        badge: "Festival"
    },
    {
        id: 8,
        name: "Holi Gujiya",
        category: "festival",
        price: "₹180",
        description: "Sweet dumplings filled with khoya and dry fruits",
        image: "photos/holi-gujiya.jpg",
        icon: "fas fa-circle",
        badge: "Holi Special"
    },
    {
        id: 9,
        name: "Raksha Bandhan Thali",
        category: "festival",
        price: "₹350",
        description: "Special thali with traditional sweets for siblings",
        image: "photos/rakhi-thali.jpg",
        icon: "fas fa-heart",
        badge: "Rakhi Special"
    },
    {
        id: 10,
        name: "Chocolate Barfi",
        category: "modern",
        price: "₹220",
        description: "Traditional barfi with rich chocolate flavor",
        image: "photos/chocolate-barfi.jpg",
        icon: "fas fa-cookie-bite",
        badge: "Modern"
    },
    {
        id: 11,
        name: "Fusion Ladoo",
        category: "modern",
        price: "₹160",
        description: "Traditional ladoo with modern ingredients",
        image: "photos/fusion-ladoo.jpg",
        icon: "fas fa-star",
        badge: "Fusion"
    },
    {
        id: 12,
        name: "Sugar-Free Sweets",
        category: "modern",
        price: "₹180",
        description: "Healthy sweets made with natural sweeteners",
        image: "photos/sugar-free-sweets.jpg",
        icon: "fas fa-leaf",
        badge: "Healthy"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    setupSmoothScrolling();
});

// Display products in the grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="product-icon-fallback" style="display: none;">
                <i class="${product.icon}"></i>
            </div>
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
            <div class="product-actions">
                <button class="btn-small" onclick="showInterest('${product.name}')">
                    <i class="fas fa-heart"></i> Interested
                </button>
                <button class="btn-small" onclick="addToCart('${product.name}')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter products by category
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Show interest in a product
function showInterest(productName) {
    // Scroll to contact form
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Pre-fill the message field
    setTimeout(() => {
        const messageField = document.getElementById('message');
        messageField.value = `I'm interested in ${productName}. Please provide more details about availability and pricing.`;
        messageField.focus();
    }, 500);
    
    // Show a toast notification
    showToast(`Great choice! We'll help you with ${productName}`);
}

// Add to cart functionality
function addToCart(productName) {
    // In a real application, this would add to cart
    showToast(`${productName} added to your interest list!`);
}

// Show toast notification
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterProducts(e.target.dataset.filter);
        });
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Modal close functionality
    const closeModal = document.querySelector('.close');
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModalFunction();
        }
    });
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (in real app, this would be an API call)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        contactForm.reset();
        
        // Log the data (in real app, send to server)
        console.log('Form submitted:', data);
        
    }, 2000);
}

// Validate form data
function validateForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!data.email.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email');
    }
    
    if (!data.interest) {
        errors.push('Please select your interest');
    }
    
    if (!data.message.trim()) {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        showToast(errors.join(', '));
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success modal
function showSuccessModal() {
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunction() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Global function for modal close (called from HTML)
function closeModal() {
    closeModalFunction();
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.product-card, .feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation
    animateOnScroll();
});

// Add hover effects for product cards
document.addEventListener('DOMContentLoaded', function() {
    // This will be called after products are loaded
    setTimeout(() => {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }, 100);
});

// Add search functionality (bonus feature)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search sweets...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        border: 2px solid #d4af37;
        border-radius: 25px;
        font-size: 1rem;
        margin: 0 auto 2rem;
        display: block;
        outline: none;
        transition: all 0.3s ease;
    `;
    
    // Insert search input before products grid
    const productsSection = document.querySelector('.products .container');
    const productsTitle = productsSection.querySelector('h2');
    productsTitle.insertAdjacentElement('afterend', searchInput);
    
    // Add search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    addSearchFunctionality();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && successModal.style.display === 'block') {
        closeModalFunction();
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Add form field animations
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    animateOnScroll();
}, 10);

window.removeEventListener('scroll', animateOnScroll);
window.addEventListener('scroll', debouncedScrollHandler);
