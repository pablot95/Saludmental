document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menú Hamburguesa ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Cerrar menú al hacer click en un link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Efecto Navbar Scroll ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            navbar.style.padding = "0"; // Compactar ligeramente si fuera necesario
        } else {
            navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
        }
    });

    // --- Animación Fade-in al hacer Scroll (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // El elemento debe estar 15% visible para activarse
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Modal Logic ---
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
            icon: 'fa-brain'
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
                // Timeout para permitir que el display:flex se aplique antes de la opacidad (transición)
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
        }, 300); // Esperar a que termine la transición
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Cerrar al hacer click fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Smooth Scroll para enlaces internos (Safari/antiguos soporte) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajustar offset por el navbar fijo
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
});
