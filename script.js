// Navigation bar functions
// Those two functions will work on hiding the navigation bar on the 
// phone version whenever the user is not on the very top of the page 
addEventListener("resize", ()=> {
    if (window.matchMedia("(max-width:600px)").matches){
        currentY = window.scrollY;  
        full_height = document.body.scrollHeight - document.documentElement.clientHeight;
        if (currentY > 10){
            document.getElementById("h_navigation_section_buttons").style.display = "none"
        }
    }

})

addEventListener("scroll", ()=>{
    currentY = window.scrollY;  
    full_height = document.body.scrollHeight - document.documentElement.clientHeight;
    if (window.matchMedia("(max-width:600px)").matches){
        if (currentY > 5){
            document.getElementById("h_navigation_section_buttons").style.display = "none"
        }else{
            document.getElementById("h_navigation_section_buttons").style.display = "flex"
        }
    }else {
        document.getElementById("h_navigation_section_buttons").style.display = "flex"
    }
})

// Home page related java script functions
// lightbox functions
let currentImageIndex = 0;
let displayImage = document.getElementById("home_lightbox_display_image"); 
let max_image = 5;
let closed_lightbox_images = document.querySelectorAll(".home_light_box_images > img")

// Closed light box functions, those functions are for the navigation
// between the images while the light box is closed or opened
function closeLightBox(){
    document.getElementById("home_opened_lightbox").style.display = "none";
}

function openLightBox(index){
    displayImage.dataset.displayindex = index;
    displayImage.src = `images/happyCustomer${displayImage.dataset.displayindex}.jpg`;
    document.getElementById("home_opened_lightbox").style.display = "flex";
}

function openlightboxnext(){
    if (displayImage.dataset.displayindex < max_image){
        ++displayImage.dataset.displayindex;
        displayImage.src = `images/happyCustomer${displayImage.dataset.displayindex}.jpg`;
    }else {
        displayImage.dataset.displayindex = 1;
        displayImage.src = `images/happyCustomer${displayImage.dataset.displayindex}.jpg`;
    }
}

function openlightboxprevious(){
    if (displayImage.dataset.displayindex > 1){
        --displayImage.dataset.displayindex;
        displayImage.src = `images/happyCustomer${displayImage.dataset.displayindex}.jpg`;
    }else {
        displayImage.dataset.displayindex = max_image;
        displayImage.src = `images/happyCustomer${displayImage.dataset.displayindex}.jpg`;
    }
}

function closedlightboxnext() {
    closed_lightbox_images.forEach(image => {
        if (image.dataset.index < max_image){
            // ++image.dataset.index
            image.setAttribute('onclick',`openLightBox('${++image.dataset.index}')`)
            image.src = `images/happyCustomer${image.dataset.index}.jpg`
        }else {
            image.dataset.index = 1
            image.setAttribute('onclick',`openLightBox('1')`)
            image.src = `images/happyCustomer1.jpg`
        }
    });    
}

function closedlightboxprevious() {
    closed_lightbox_images.forEach(image => {
        if (image.dataset.index > 1){
            // ++image.dataset.index
            image.setAttribute('onclick',`openLightBox('${--image.dataset.index}')`)
            image.src = `images/happyCustomer${image.dataset.index}.jpg`
        }else {
            image.dataset.index = max_image
            image.setAttribute('onclick',`openLightBox('${max_image}')`)
            image.src = `images/happyCustomer${max_image}.jpg`
        }
    });    
}

// This part will work on starting the statistics counter whenever the user reaches this section while scrolling
let statisticsContainer = document.getElementById("statistics_container")
let statistics = document.querySelectorAll(".statistic_box p:first-of-type");
let increasing = false;

function start_increasing(){
    currentY = window.scrollY;  
    try{
       let rect = statisticsContainer.getBoundingClientRect();
    full_height = document.body.scrollHeight - document.documentElement.clientHeight;


    if (rect.y  < window.scrollY  && !(increasing)) { 
        increasing = true
        setTimeout(()=>{
            setInterval(()=>{            
            statistics.forEach((statistic)=>{
                if (statistic.innerHTML != statistic.dataset.max) {
                    statistic.innerHTML = Number(statistic.innerHTML) + 1;
                }
            })
        }, 30)
        }, 1000)
        
        
    }     
    }catch(error){
        console.log(error)
    }
}
addEventListener("scroll", ()=>{
    start_increasing();
})

// Shop page related Javascript
// Get elements
const priceSlider = document.getElementById("priceRange"); // Make sure the ID matches the HTML
const priceValue = document.getElementById("priceValue"); // Make sure the ID matches the HTML
const categoryButtons = document.querySelectorAll(".categorybutton");
const ratingButtons = document.querySelectorAll(".ratingbutton");
const cards = document.querySelectorAll(".productcard");

let selectedCategory = "all";
let selectedRating = 0;
let maxPrice = parseInt(priceSlider.value);

// Update price on slider
priceSlider.addEventListener("input", () => {
  maxPrice = parseInt(priceSlider.value);
  priceValue.textContent = maxPrice;
  filterCards();
});

// Handle category filter
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterCards();
  });
});

// Handle rating filter
ratingButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedRating = parseInt(btn.dataset.rating);
    ratingButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterCards();
  });
});

// Filter function
function filterCards() {
  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const cardPrice = parseInt(card.dataset.price);
    const cardRating = parseInt(card.dataset.rating);

    const matchesCategory = selectedCategory === "all" || cardCategory === selectedCategory;
    const matchesPrice = cardPrice <= maxPrice;
    const matchesRating = selectedRating === 0 || cardRating === selectedRating;

    if (matchesCategory && matchesPrice && matchesRating) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Initial filter to load cards correctly on page load
filterCards();







// Contact page related JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.parentElement;
            const arrow = this.querySelector('.faq-arrow');
            
            // Toggle active class
            parent.classList.toggle('.active_faq');
            
            // Toggle arrow direction
            if (arrow && arrow.classList.contains('down')) {
                arrow.classList.remove('down');
                arrow.classList.add('up');
            } else if (arrow) {
                arrow.classList.remove('up');
                arrow.classList.add('down');
            }
        });
    });
    
    
    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    
    // Create error message element function
    function createErrorMessage(inputElement, message) {
        // Check if an error message already exists
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.textContent = message;
            return;
        }
        
        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        // Insert after the input
        inputElement.parentElement.appendChild(errorDiv);
    }
    
    // Remove error message function
    function removeErrorMessage(inputElement) {
        const errorMessage = inputElement.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Validation functions
    function validateName(name) {
        return name.trim().length > 0;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        // Basic phone validation - can be customized based on your requirements
        const phoneRegex = /^\d{1,2}\s\d{5}\s\d{5}$/;
        return phone.trim() === '' || phoneRegex.test(phone);
    }
    
    function validateMessage(message) {
        return message.trim().length > 0;
    }
    
    // Add input event listeners for real-time validation
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        // Name validation
        nameInput.addEventListener('blur', function() {
            if (!validateName(this.value)) {
                createErrorMessage(this, 'Please enter your name');
            } else {
                removeErrorMessage(this);
            }
        });
        
        // Email validation
        emailInput.addEventListener('blur', function() {
            if (!validateEmail(this.value)) {
                createErrorMessage(this, 'Please enter a valid email address');
            } else {
                removeErrorMessage(this);
            }
        });
        
        // Phone validation (optional field)
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !validatePhone(this.value)) {
                createErrorMessage(this, 'Please enter a valid phone number (e.g., 0 88888 88888)');
            } else {
                removeErrorMessage(this);
            }
        });
        
        // Message validation
        messageInput.addEventListener('blur', function() {
            if (!validateMessage(this.value)) {
                createErrorMessage(this, 'Please enter your message');
            } else {
                removeErrorMessage(this);
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validate all fields
            if (!validateName(nameInput.value)) {
                createErrorMessage(nameInput, 'Please enter your name');
                isFormValid = false;
            }
            
            if (!validateEmail(emailInput.value)) {
                createErrorMessage(emailInput, 'Please enter a valid email address');
                isFormValid = false;
            }
            
            if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value)) {
                createErrorMessage(phoneInput, 'Please enter a valid phone number (e.g., 0 88888 88888)');
                isFormValid = false;
            }
            
            if (!validateMessage(messageInput.value)) {
                createErrorMessage(messageInput, 'Please enter your message');
                isFormValid = false;
            }
            
            // If all validations pass
            if (isFormValid) {
                // Here you would normally send the form data to a server
                alert('Message sent successfully!');
                
                // Reset form and error messages
                contactForm.reset();
                messageInput.value = '';
                
                // Remove all error messages
                document.querySelectorAll('.error-message').forEach(el => el.remove());
            }
        });
    }
}); 
