// ==========================================
// MATRIX RAIN EFFECT
// ==========================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#2d7a5f';
    ctx.font = fontSize + 'px monospace';
    
    drops.forEach((y, i) => {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==========================================
// NAVIGATION MOBILE
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar-3d');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// TYPING ANIMATION
// ==========================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = "Créateurs de Sites Web Premium";
    let i = 0;
    typingText.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// ==========================================
// CODE ANIMATION
// ==========================================
const codeAnimation = document.getElementById('codeAnimation');
if (codeAnimation) {
    const codeLines = [
        "const webForge = {",
        "  design: '3D Premium',",
        "  animations: 'Spectacular',",
        "  performance: '100%',",
        "  satisfaction: '💚'",
        "};"
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeCode() {
        if (lineIndex < codeLines.length) {
            if (charIndex < codeLines[lineIndex].length) {
                codeAnimation.textContent += codeLines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeCode, 50);
            } else {
                codeAnimation.textContent += '\n';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeCode, 200);
            }
        }
    }
    
    setTimeout(typeCode, 2000);
}

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value-3d');
            if (statValue && !statValue.classList.contains('animated')) {
                animateCounter(statValue);
                statValue.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card-3d').forEach(card => {
    statObserver.observe(card);
});

// ==========================================
// 3D TILT EFFECT
// ==========================================
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.05, 1.05, 1.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ==========================================
// PROGRESS BARS ANIMATION
// ==========================================
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-fill-3d');
            if (progressBar && !progressBar.classList.contains('animated')) {
                const targetWidth = progressBar.dataset.progress;
                progressBar.style.width = targetWidth + '%';
                progressBar.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.capacite-card-3d').forEach(card => {
    progressObserver.observe(card);
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// TEMPLATE SELECTION & PAYMENT
// ==========================================
function selectTemplate(name, price) {
    const modal = document.getElementById('paymentModal');
    const summary = document.getElementById('paymentSummary');
    
    const tva = price * 0.2;
    const total = price * 1.2;
    
    summary.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <div>
                <h3 style="color: var(--neon-mint); margin-bottom: 0.5rem; font-size: 1.5rem;">${name}</h3>
                <p style="color: var(--text-secondary); margin: 0;">Template Premium 3D</p>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 0.9rem; color: var(--text-secondary);">Prix HT</div>
                <div style="font-size: 2.5rem; font-weight: 700; color: var(--neon-mint);">${price}€</div>
            </div>
        </div>
        <div style="padding: 1.5rem; background: var(--card-bg); border-radius: 15px; border: 1px solid var(--border-glass);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: var(--text-secondary);">
                <span>Sous-total HT</span>
                <span style="color: var(--text-primary);">${price.toFixed(2)}€</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: var(--text-secondary);">
                <span>TVA (20%)</span>
                <span style="color: var(--text-primary);">${tva.toFixed(2)}€</span>
            </div>
            <div style="border-top: 2px solid var(--border-glass); margin-top: 1rem; padding-top: 1rem; display: flex; justify-content: space-between; font-weight: 700; font-size: 1.3rem;">
                <span>Total TTC</span>
                <span style="color: var(--neon-mint);">${total.toFixed(2)}€</span>
            </div>
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(45, 122, 95, 0.1); border-radius: 10px; text-align: center;">
            <span style="color: var(--neon-mint);">🔒 Paiement 100% sécurisé avec Stripe</span>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Payment form submission
const paymentForm = document.querySelector('.payment-form-3d');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = paymentForm.querySelector('.pay-btn-3d');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Traitement en cours...';
        btn.disabled = true;
        
        setTimeout(() => {
            closePaymentModal();
            showNotification('✅ Paiement réussi ! Vous allez recevoir un email de confirmation.', 'success');
            btn.textContent = originalText;
            btn.disabled = false;
            paymentForm.reset();
        }, 2500);
    });
}

// Close modal on outside click
document.getElementById('paymentModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'paymentModal') {
        closePaymentModal();
    }
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2d7a5f, #4ecca3)' : 'linear-gradient(135deg, #ff6b6b, #ee5a6f)'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 1rem;
        backdrop-filter: blur(10px);
    `;
    
    notification.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span style="flex: 1;">${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1;">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.', 'success');
        contactForm.reset();
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card-3d, .template-card-3d, .capacite-card-3d, .valeur-card-3d, .info-card-3d'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(el);
    });
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePaymentModal();
        if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ==========================================
// LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log(
    '%c🌿 WebForge Premium 3D',
    'color: #2d7a5f; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log(
    '%c✨ Animations spectaculaires • Design futuriste • Code propre',
    'color: #4ecca3; font-size: 14px;'
);

// ==========================================
// EXPORTS
// ==========================================
window.selectTemplate = selectTemplate;
window.closePaymentModal = closePaymentModal;
window.showNotification = showNotification;

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll animations handled by observer
            ticking = false;
        });
        ticking = true;
    }
});
