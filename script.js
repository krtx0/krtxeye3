// Main JavaScript for VisionCare Optometry Clinic Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Change icon based on menu state
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-2xl';
            } else {
                icon.className = 'fas fa-times text-2xl';
            }
        });
    }
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scroll', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('nav-scroll', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('opacity-0');
                backToTopBtn.classList.remove('opacity-100');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(appointmentForm);
            const name = appointmentForm.querySelector('input[type="text"]').value;
            
            // Show success message
            alert(`Thank you, ${name}! Your appointment request has been submitted. We will contact you within 24 hours to confirm.`);
            
            // Reset form
            appointmentForm.reset();
            
            // In a real application, you would send the form data to a server here
            // Example using fetch:
            /*
            fetch('/submit-appointment', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Appointment request submitted successfully!');
                appointmentForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again or call us directly.');
            });
            */
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuBtn.querySelector('i');
                    icon.className = 'fas fa-bars text-2xl';
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-hover');
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Doctor cards animation
    const doctorObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialize doctor cards with hidden state
    document.querySelectorAll('.bg-white.rounded-2xl.shadow-lg.overflow-hidden').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        doctorObserver.observe(card);
    });
    
    // Eye care tips API integration (optional feature)
    // Fetch eye health tips from a public API
    function fetchEyeCareTips() {
        // Using a health tips API as an example
        // Note: In a real implementation, you would use a proper API endpoint
        // For demo purposes, we'll use mock data
        
        const tips = [
            "Take regular breaks from screens: Follow the 20-20-20 rule - every 20 minutes, look at something 20 feet away for 20 seconds.",
            "Wear sunglasses with UV protection to shield your eyes from harmful ultraviolet rays.",
            "Eat a diet rich in leafy greens, fish, and nuts to support eye health.",
            "Get regular comprehensive eye exams, even if you don't wear glasses.",
            "Quit smoking to reduce your risk of cataracts and macular degeneration.",
            "Maintain a healthy weight to lower your risk of diabetes-related eye problems.",
            "Practice good contact lens hygiene to prevent infections.",
            "Use proper lighting when reading to reduce eye strain.",
            "Stay hydrated to help prevent dry eyes.",
            "Know your family's eye health history as many conditions are hereditary."
        ];
        
        // Display a random tip
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        // Create a tip banner
        const tipBanner = document.createElement('div');
        tipBanner.className = 'fixed bottom-0 left-0 right-0 bg-blue-100 text-blue-800 p-4 shadow-lg z-40 hidden md:block';
        tipBanner.innerHTML = `
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center">
                    <i class="fas fa-lightbulb text-blue-600 mr-3"></i>
                    <span class="font-medium">Eye Care Tip:</span>
                    <span class="ml-2">${randomTip}</span>
                </div>
                <button id="closeTip" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(tipBanner);
        
        // Close tip functionality
        document.getElementById('closeTip')?.addEventListener('click', function() {
            tipBanner.style.display = 'none';
        });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (tipBanner.style.display !== 'none') {
                tipBanner.style.opacity = '0';
                tipBanner.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    tipBanner.style.display = 'none';
                }, 500);
            }
        }, 10000);
    }
    
    // Call the function to show eye care tips
    setTimeout(fetchEyeCareTips, 3000);
    
    // Form validation enhancement
    const formInputs = document.querySelectorAll('.appointment-form input, .appointment-form select, .appointment-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '' && this.checkValidity()) {
                this.classList.add('border-green-500');
                this.classList.remove('border-red-500');
            } else if (this.hasAttribute('required') && this.value.trim() === '') {
                this.classList.add('border-red-500');
                this.classList.remove('border-green-500');
            } else {
                this.classList.remove('border-green-500', 'border-red-500');
            }
        });
    });
    
    // Initialize current year in footer
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    document.querySelector('footer p:first-of-type')?.appendChild(yearSpan);
});