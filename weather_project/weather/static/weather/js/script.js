document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form');
    const loadingElement = document.getElementById('loading');
    const weatherInfo = document.getElementById('weather-info');
    const cityInput = document.getElementById('city-input');
    const searchButton = document.querySelector('.search-button');

    // Add input validation and formatting
    cityInput.addEventListener('input', function(e) {
        // Remove numbers and special characters
        this.value = this.value.replace(/[^a-zA-Z\s-]/g, '');
        
        // Capitalize first letter of each word
        this.value = this.value.replace(/\b\w/g, letter => letter.toUpperCase());
        
        // Enable/disable search button based on input
        searchButton.disabled = !this.value.trim();
    });

    // Add form submission handling with loading animation
    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!cityInput.value.trim()) {
            showError('Please enter a city name');
            return;
        }

        // Show loading spinner with fade effect
        loadingElement.style.display = 'block';
        loadingElement.style.opacity = '0';
        setTimeout(() => loadingElement.style.opacity = '1', 10);

        if (weatherInfo) {
            weatherInfo.style.opacity = '0';
        }

        // Submit the form after loading animation
        setTimeout(() => {
            this.submit();
        }, 500);
    });

    // Add temperature unit toggle with animation
    let isCelsius = true;
    const temperatureElement = document.getElementById('temperature');
    if (temperatureElement) {
        temperatureElement.addEventListener('click', function() {
            const temperature = parseFloat(this.textContent);
            this.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (isCelsius) {
                    // Convert to Fahrenheit
                    this.textContent = `${Math.round((temperature * 9/5) + 32)}°F`;
                } else {
                    // Convert to Celsius
                    this.textContent = `${Math.round((temperature - 32) * 5/9)}°C`;
                }
                this.style.transform = 'scale(1)';
                isCelsius = !isCelsius;
            }, 150);
        });
    }

    // Add touch support for temperature toggle
    if (temperatureElement) {
        temperatureElement.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent double-tap zoom on mobile
        });
    }

    // Improve mobile input experience
    cityInput.addEventListener('focus', function() {
        // Scroll the input into view on mobile
        setTimeout(() => {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Reset any necessary styles or layouts
        setTimeout(() => {
            if (weatherInfo) {
                weatherInfo.style.opacity = '1';
                weatherInfo.style.transform = 'none';
            }
        }, 100);
    });

    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Improve mobile scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Handle scroll-based animations or effects
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle mobile keyboard showing/hiding
    const originalHeight = window.innerHeight;
    window.addEventListener('resize', function() {
        if (window.innerHeight < originalHeight) {
            // Keyboard is showing
            document.body.style.height = 'auto';
        } else {
            // Keyboard is hidden
            document.body.style.height = '100vh';
        }
    });

    // Add pull-to-refresh prevention
    document.body.addEventListener('touchmove', function(e) {
        if (window.pageYOffset === 0) {
            e.preventDefault();
        }
    }, { passive: false });

    // Add weather animation based on condition
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) {
        const weatherCondition = weatherIcon.getAttribute('data-condition').toLowerCase();
        const body = document.body;
        
        if (weatherCondition.includes('rain')) {
            body.style.background = 'linear-gradient(135deg, #1c92d2, #f2fcfe)';
        } else if (weatherCondition.includes('cloud')) {
            body.style.background = 'linear-gradient(135deg, #606c88, #3f4c6b)';
        } else if (weatherCondition.includes('clear')) {
            body.style.background = 'linear-gradient(135deg, #00feba, #5b548a)';
        } else if (weatherCondition.includes('snow')) {
            body.style.background = 'linear-gradient(135deg, #E3FDF5, #FFE6FA)';
        } else if (weatherCondition.includes('thunder')) {
            body.style.background = 'linear-gradient(135deg, #090909, #4B515D)';
        }
    }

    // Add city autocomplete with popular cities
    const popularCities = [
        'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
        'Berlin', 'Moscow', 'Dubai', 'Singapore', 'Rome',
        'Mumbai', 'Beijing', 'Toronto', 'Seoul', 'Madrid',
        'Amsterdam', 'Vienna', 'Bangkok', 'Cairo', 'Rio de Janeiro'
    ];

    // Create and append datalist for autocomplete
    const datalist = document.createElement('datalist');
    datalist.id = 'city-suggestions';
    popularCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });
    document.body.appendChild(datalist);
    cityInput.setAttribute('list', 'city-suggestions');

    // Add error message display function
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const form = document.getElementById('weather-form');
        form.insertAdjacentElement('afterend', errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Add hover effects for weather details
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
