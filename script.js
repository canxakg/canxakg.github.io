window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal, .skill-card, .project-card');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Sayfa yüklendiğinde hero animasyonunu başlat
window.onload = () => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
};