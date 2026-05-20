// ===========================
// Initialize AOS
// ===========================
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 200,
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ===========================
// Close mobile menu on click
// ===========================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse.classList.contains('show')) {
            new bootstrap.Collapse(collapse).hide();
        }
    });
});

// ===========================
// Hero Particles
// ===========================
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 200 + 40;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

createParticles();

// ===========================
// Project Filtering
// ===========================
const projectGrid = document.getElementById('projectGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

if (projectGrid) {
    const projectItems = projectGrid.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectItems.forEach(item => {
                item.classList.remove('aos-animate');
            });

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    let visibleIndex = 0;
                    projectItems.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'block';
                            
                            setTimeout(() => {
                                item.classList.add('aos-animate');
                            }, visibleIndex * 100);
                            visibleIndex++;
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    setTimeout(() => {
                        AOS.refresh();
                    }, 100);
                });
            });
        });
    });
}

// ===========================
// Smooth Scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// Footer Dynamic Year
// ===========================
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
