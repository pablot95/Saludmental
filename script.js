document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            navbar.style.padding = "0";
        } else {
            navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    const modal = document.getElementById('modal-info');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalIcon = document.getElementById('modal-icon');
    const closeBtn = document.querySelector('.close-modal');
    const specialtyCards = document.querySelectorAll('.specialty-card');

    const modalData = {
        'psicologia': {
            title: 'Psicología',
            text: 'En A.I.Sa.M, la Psicología ofrece un espacio de escucha, contención y acompañamiento profesional a niños, adolescentes y adultos. A través de abordajes individuales y grupales, trabajamos sobre las emociones, pensamientos y conductas, promoviendo el bienestar emocional y el fortalecimiento de recursos personales.',
            icon: 'fa-comments'
        },
        'psiquiatria': {
            title: 'Psiquiatría',
            text: 'La Psiquiatría en A.I.Sa.M aborda los padecimientos de la salud mental desde una mirada médica integral. Realizamos evaluación, diagnóstico y tratamiento, con seguimiento profesional continuo y, cuando es necesario, tratamiento farmacológico, dentro de un enfoque humano e interdisciplinario.',
            icon: 'fa-user-md'
        },
        'to': {
            title: 'Terapia Ocupacional',
            text: 'En A.I.Sa.M, la Terapia Ocupacional acompaña a personas de todas las edades en el desarrollo de la autonomía y la participación en la vida cotidiana. Mediante intervenciones individuales y grupales, se fortalecen habilidades funcionales, sociales y adaptativas, favoreciendo la inclusión y la calidad de vida.',
            icon: 'fa-hands-helping'
        },
        'psicopedagogia': {
            title: 'Psicopedagogía',
            text: 'La Psicopedagogía en A.I.Sa.M acompaña los procesos de aprendizaje en niños, adolescentes y adultos. Abordamos dificultades y potenciamos capacidades cognitivas y educativas desde una mirada integral, articulando con la familia, el ámbito educativo y el equipo interdisciplinario.',
            icon: 'fa-shapes'
        },
        'nutricion': {
            title: 'Nutrición',
            text: 'En A.I.Sa.M, la Nutrición forma parte del abordaje integral de la salud. Promovemos una alimentación consciente y personalizada, teniendo en cuenta hábitos, contexto y salud mental, como base para el bienestar físico y emocional.',
            icon: 'fa-apple-alt'
        },
        'neurologia': {
            title: 'Neurología',
            text: 'La Neurología se ocupa del diagnóstico y tratamiento de trastornos del sistema nervioso, brindando una atención especializada para diversas patologías neurológicas.',
            icon: 'fa-brain'
        },
        'clinica': {
            title: 'Clínica Médica',
            text: 'Brindamos atención clínica integral, realizando diagnósticos, tratamientos y seguimientos de diversas afecciones médicas para el cuidado general de la salud.',
            icon: 'fa-stethoscope'
        },
        'infectologia': {
            title: 'Infectología',
            text: 'La especialidad de Infectología se dedica a la prevención, diagnóstico y tratamiento de enfermedades infecciosas, cuidando la salud de nuestros pacientes.',
            icon: 'fa-virus'
        }
    };

    specialtyCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-modal');
            const data = modalData[type];
            if (data) {
                modalTitle.textContent = data.title;
                modalText.textContent = data.text;
                modalIcon.className = `fas ${data.icon}`;
                
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const canvas = document.getElementById('neuroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const particleColor = 'rgba(255, 255, 255, 0.9)';
        const lineColor = '255, 255, 255';

        let particleCount = 70;
        const connectionDistance = 160;
        
        function resize() {
            const parent = canvas.parentElement;
            if (parent) {
                width = canvas.width = parent.offsetWidth;
                height = canvas.height = parent.offsetHeight;
                
                if (width < 768) {
                    particleCount = 45;
                } else {
                    particleCount = 85;
                }
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 2.0;
                this.vy = (Math.random() - 0.5) * 2.0;
                this.size = Math.random() * 3 + 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    
                    if (distance < connectionDistance) {
                        let opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(${lineColor}, ${opacity * 0.6})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
             resize();
             initParticles();
        });

        resize();
        initParticles();
        animate();
    }
});
