document.addEventListener('DOMContentLoaded', () => {
    
    // --- INTRO SEQUENCE ---
    const terminalText = document.getElementById('terminal-text');
    const loadingBar = document.querySelector('.loading-bar');
    const introOverlay = document.getElementById('intro-overlay');
    const body = document.body;
    const navbar = document.getElementById('navbar');

    if (introOverlay) {
        // --- RUN INTRO ON HOME PAGE ---
        const messages = [
            "System.init(user='Can Akgün')",
            "Loading modules: [Python, Django, AI]",
            "Establishing connection...",
            "Access Granted."
        ];

        let msgIndex = 0;
        let charIndex = 0;
        
        function typeText() {
            if (msgIndex < messages.length) {
                if (charIndex < messages[msgIndex].length) {
                    terminalText.textContent += messages[msgIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeText, 30); // Typing speed
                } else {
                    terminalText.textContent += '\n'; 
                    setTimeout(() => {
                        terminalText.textContent = ""; 
                        msgIndex++;
                        charIndex = 0;
                        
                        let progress = (msgIndex / messages.length) * 100;
                        loadingBar.style.width = `${progress}%`;

                        typeText();
                    }, 400); 
                }
            } else {
                setTimeout(finishIntro, 500);
            }
        }

        function finishIntro() {
            introOverlay.style.transition = "transform 0.8s ease-in-out, opacity 0.8s";
            introOverlay.style.transform = "translateY(-100%)";
            introOverlay.style.opacity = "0.9"; 
            
            body.classList.remove('hidden-overflow');
            navbar.style.transform = "translateY(0)";

            triggerHeroAnimations();
        }

        typeText();
    } else {
        // --- NO INTRO (OTHER PAGES) ---
        if(navbar) {
            navbar.style.transform = "translateY(0)";
        }
        // Trigger animations immediately if any exist
        triggerHeroAnimations();
    }


    // --- SCROLL OBSERVING (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Keep animating or stop? Let's stop once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // --- HERO ANIMATIONS TRIGGER ---
    function triggerHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-section .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }

    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- MOUSE PARALLAX EFFECT ON HERO (Subtle) ---
    /*
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const heroTitle = document.querySelector('.hero-title');
        if(heroTitle) {
            heroTitle.style.transform = `translate(-${mouseX * 20}px, -${mouseY * 20}px)`;
        }
    });
    */
   // Leaving mouse parallax out for cleaner performance, keeping outline-text hover only.
});
