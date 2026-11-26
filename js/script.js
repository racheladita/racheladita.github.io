const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 200,
    disable: reduceMotion,
});

const navbar = document.getElementById('mainNav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                const active = link.getAttribute('href') === '#' + id;
                link.classList.toggle('active', active);
                if (active) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show') && window.bootstrap) {
            window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        }
    });
});

function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container || reduceMotion) return;

    const colors = ['#6e8efb', '#a777e3', '#2ec9b0', '#3ec6e0', '#e8b15a'];

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 200 + 40;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = colors[i % colors.length];
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

createParticles();

if (reduceMotion && window.bootstrap) {
    document.querySelectorAll('.carousel').forEach(el => {
        window.bootstrap.Carousel.getOrCreateInstance(el).pause();
    });
}

const projectGrid = document.getElementById('projectGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

if (projectGrid) {
    const projectItems = projectGrid.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(item => {
                const selected = item === btn;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-pressed', selected ? 'true' : 'false');
            });

            let shown = 0;
            projectItems.forEach(item => {
                const show = filter === 'all' || item.dataset.category === filter;
                item.classList.remove('is-revealing');
                item.classList.toggle('is-hidden', !show);
                if (!show || reduceMotion) return;
                item.style.setProperty('--reveal-delay', `${shown * 55}ms`);
                shown += 1;
            });

            if (!reduceMotion) {
                void projectGrid.offsetWidth;
                projectItems.forEach(item => {
                    if (!item.classList.contains('is-hidden')) {
                        item.classList.add('is-revealing');
                    }
                });
            }

            if (window.AOS) {
                window.AOS.refresh();
            }
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
    });
});

const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
