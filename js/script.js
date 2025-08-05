// ===== Dark Mode Toggle =====
const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// Verificăm dacă e salvat dark mode în localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
}

// Când apasă pe buton
toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Salvăm alegerea în localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// ===== Animație skilluri la scroll =====
const skillsSection = document.querySelector('.skills-section');
const skillFills = document.querySelectorAll('.skill-fill');

let skillsPlayed = false;

window.addEventListener('scroll', () => {
  const sectionTop = skillsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100 && !skillsPlayed) {
    skillFills.forEach(bar => {
      const width = bar.classList.contains('html') ? '90%' :
                    bar.classList.contains('css') ? '85%' :
                    bar.classList.contains('js') ? '75%' :
                    bar.classList.contains('ui') ? '70%' : '0';
      bar.style.width = width;
    });
    skillsPlayed = true;
  }
});

// ===== Filtrare proiecte =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Scoatem clasa active de la toate butoanele
    filterButtons.forEach(b => b.classList.remove('active'));
    // Adăugăm clasa active la butonul apăsat
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectItems.forEach(item => {
      if(filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== Slider Testimoniale =====
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');

let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Arătăm primul testimonial la încărcare
showTestimonial(currentTestimonial);

// Formular contact + EmailJS
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevenim trimiterea normală a formularului

  // Trimite emailul folosind EmailJS
  emailjs.sendForm('service_1dqy2eo', 'YOUR_TEMPLATE_ID', this)
    .then(() => {
      alert('Mesaj trimis cu succes! Mulțumesc!');
      contactForm.reset();
    }, (error) => {
      alert('Eroare la trimiterea mesajului. Încearcă iară.');
      console.error('EmailJS error:', error);
    });
});

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


const footerContainer = document.querySelector('.footer-container');

function checkFooterVisible() {
  const rect = footerContainer.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    footerContainer.classList.add('visible');
    window.removeEventListener('scroll', checkFooterVisible);
  }
}

window.addEventListener('scroll', checkFooterVisible);
checkFooterVisible(); // verifică și la încărcare dacă e vizibil
