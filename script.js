document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. FAQ Accordion (Support Page)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 3. Contact Form Submission (Index & Support Pages)
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message...';
            
            // Send request using fetch to FormSubmit
            fetch(form.action || 'https://formsubmit.co/neerajkajallabs@gmail.com', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    submitBtn.innerHTML = '✓ Message Sent!';
                    submitBtn.style.background = '#4CAF50';
                    submitBtn.style.color = '#fff';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                submitBtn.innerHTML = '✗ Error sending. Try again.';
                submitBtn.style.background = '#f44336';
                submitBtn.style.color = '#fff';
            })
            .finally(() => {
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            });
        });
    });

    // 4. Interactive Phone Mockup Simulation (Landing Page)
    const mockupInput = document.querySelector('.mockup-input-text-field');
    const mockupConvertBtn = document.querySelector('.mockup-btn-convert');
    const mockupMicBtn = document.querySelector('.mockup-mic-btn');
    const mockupResultCard = document.querySelector('.mockup-result-card');
    
    // Result elements
    const resDigit = document.querySelector('.res-digit');
    const resEngWord = document.querySelector('.res-eng-word');
    const resPhonetic = document.querySelector('.res-phonetic');
    const resHiWord = document.querySelector('.res-hi-word');
    const resHiDigit = document.querySelector('.res-hi-digit');

    // Database of mock conversions
    const conversions = {
        '5': { digit: '5', engWord: 'Five', phonetic: 'Paanch', hiWord: 'पाँच', hiDigit: '५' },
        '12': { digit: '12', engWord: 'Twelve', phonetic: 'Baarah', hiWord: 'बारह', hiDigit: '१२' },
        '25': { digit: '25', engWord: 'Twenty-five', phonetic: 'Pachis', hiWord: 'पच्चीस', hiDigit: '२५' },
        '55': { digit: '55', engWord: 'Fifty-five', phonetic: 'Pachpan', hiWord: 'पचपन', hiDigit: '५५' },
        '84': { digit: '84', engWord: 'Eighty-four', phonetic: 'Chaurasi', hiWord: 'चौरासी', hiDigit: '८४' },
        '99': { digit: '99', engWord: 'Ninety-nine', phonetic: 'Ninyanve', hiWord: 'निन्यानवे', hiDigit: '९९' }
    };

    function updateMockupResult(number) {
        const cleanNumber = number.trim();
        const data = conversions[cleanNumber] || {
            digit: cleanNumber || '42',
            engWord: 'Forty-two',
            phonetic: 'Bayalis',
            hiWord: 'बयालीस',
            hiDigit: '४२'
        };

        if (mockupResultCard) {
            mockupResultCard.style.display = 'flex';
            resDigit.textContent = data.digit;
            resEngWord.textContent = data.engWord;
            resPhonetic.textContent = data.phonetic;
            resHiWord.textContent = data.hiWord;
            resHiDigit.textContent = data.hiDigit;
        }
    }

    if (mockupConvertBtn && mockupInput) {
        mockupConvertBtn.addEventListener('click', () => {
            const val = mockupInput.value || '55';
            updateMockupResult(val);
        });

        // Trigger on Enter key
        mockupInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const val = mockupInput.value || '55';
                updateMockupResult(val);
            }
        });
    }

    if (mockupMicBtn && mockupInput) {
        mockupMicBtn.addEventListener('click', () => {
            mockupInput.value = '';
            mockupInput.placeholder = 'Listening...';
            mockupMicBtn.style.color = '#4CAF50';
            mockupMicBtn.style.background = 'rgba(76, 175, 80, 0.1)';

            // Select a random number to simulate speech recognition
            const options = ['12', '25', '84', '99'];
            const randomNum = options[Math.floor(Math.random() * options.length)];

            setTimeout(() => {
                mockupInput.placeholder = 'e.g. 55, 84';
                mockupInput.value = randomNum;
                mockupMicBtn.style.color = '';
                mockupMicBtn.style.background = '';
                
                // Auto trigger conversion
                updateMockupResult(randomNum);
            }, 1800);
        });
    }
});
