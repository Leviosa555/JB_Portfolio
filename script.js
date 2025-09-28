window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('pageRefreshed', 'true');
  window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
  const wasRefreshed = sessionStorage.getItem('pageRefreshed');
  
  if (wasRefreshed) {
      sessionStorage.removeItem('pageRefreshed');

      setTimeout(() => {
          const homeSection = document.querySelector('#home');
          if (homeSection) {
              homeSection.scrollIntoView({ behavior: 'smooth' });
          }
          window.scrollTo(0, 0);
      }, 100);
  }
});

document.addEventListener('DOMContentLoaded', () => {

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) {
      document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
      });
      homeLink.classList.add('active');
  }
});
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

createScrollProgressIndicator();

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileMenu.querySelector('i');
      
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      const icon = mobileMenu.querySelector('i');
      
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

function showSuccessModal() {
const modal = document.getElementById('successModal');
modal.classList.add('active');

setTimeout(() => {
    closeSuccessModal();
}, 4000);
}

function closeSuccessModal() {
const modal = document.getElementById('successModal');
modal.classList.remove('active');
}

document.addEventListener('click', (e) => {
const modal = document.getElementById('successModal');
if (e.target === modal) {
    closeSuccessModal();
}
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
e.preventDefault();

const submitBtn = e.target.querySelector('.submit-btn');
const originalText = submitBtn.innerHTML;

const formData = new FormData(e.target);
const templateParams = {
from_name: formData.get('name'),
from_email: formData.get('email'),
message: formData.get('message'),
to_email: 'mbetgeri2000@gmail.com'
};

if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
alert('Please fill in all required fields.');
return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(templateParams.from_email)) {
alert('Please enter a valid email address.');
return;
}

submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
submitBtn.disabled = true;

emailjs.send('service_al3xhrh', 'template_8g39en2', templateParams)
.then((response) => {
  console.log('SUCCESS!', response.status, response.text);
  
  showSuccessModal();
  
  e.target.reset();
  
  submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  
  setTimeout(() => {
    submitBtn.style.background = 'var(--gradient)';
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 3000);
})
.catch((error) => {
  console.error('FAILED...', error);
  
  alert('❌ Sorry, there was an error sending your message. Please try again or contact me directly.');
  
  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
});
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) rotateX(10deg) rotateY(-10deg)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    
    const icon = card.querySelector('.skill-icon');
    if (icon) {
      icon.style.transform = 'translateX(0) translateY(0) scale(1) translateZ(0)';
    }
  });

  card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const x = (e.clientX - cardCenterX) / (cardRect.width / 2);
    const y = (e.clientY - cardCenterY) / (cardRect.height / 2);

    card.style.transform = `translateY(-10px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;

    const icon = card.querySelector('.skill-icon');
    if (icon) {
      icon.style.transform = `translateX(${x * 5}px) translateY(${y * 5}px) scale(1.2) translateZ(20px)`;
    }
  });
});

  window.addEventListener('resize', () => {
    canvas.width = home.offsetWidth;
    canvas.height = home.offsetHeight;
  });


document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-15px) scale(1.02)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    
    const header = card.querySelector('.project-header, .cert-header');
    if (header) {
      const icon = header.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';
      }
    }
  });

  card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const x = (e.clientX - cardCenterX) / (cardRect.width / 2);
    const y = (e.clientY - cardCenterY) / (cardRect.height / 2);

    card.style.transform = `translateY(-15px) scale(1.02) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;

    const header = card.querySelector('.project-header, .cert-header');
    if (header) {
      const icon = header.querySelector('i');
      if (icon) {
        icon.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px) scale(1.2) rotate(${x * 5}deg)`;
      }
    }
  });
});


function createScrollProgressIndicator() {
  const progressContainer = document.createElement('div');
  progressContainer.className = 'scroll-progress-container';
  progressContainer.style.position = 'fixed';
  progressContainer.style.top = '0';
  progressContainer.style.left = '0';
  progressContainer.style.width = '100%';
  progressContainer.style.height = '5px';
  progressContainer.style.zIndex = '2000';

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.style.height = '100%';
  progressBar.style.width = '0';
  progressBar.style.background = 'var(--gradient)';
  progressBar.style.transition = 'width 0.1s';

  progressContainer.appendChild(progressBar);

  document.body.appendChild(progressContainer);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercentage + '%';

    progressBar.style.boxShadow = `0 0 ${10 + scrollPercentage / 5}px var(--primary-color)`;

    const hue = 240 + (scrollPercentage / 100) * 60; // Shift from purple to blue
    progressBar.style.background = `linear-gradient(90deg, hsl(${hue}, 84%, 60%), hsl(${hue + 20}, 84%, 70%))`;
  });
}

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const home = document.querySelector('.home');
  const homeContent = document.querySelector('.home-content');
  const rate = scrolled * -0.5;

  if (home) {
    // Main parallax effect
    home.style.transform = `translateY(${rate}px)`;

    const rotateX = Math.min(scrolled * 0.02, 5);
    homeContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateZ(0)`;

    const opacity = Math.max(1 - scrolled * 0.002, 0.3);
    homeContent.style.opacity = opacity;
  }
});

document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      item.style.animation = '';
    }, 500);
  });
});

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

let ticking = false;

function updateScrollEffects() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Parallax effect
  const scrolled = window.pageYOffset;
  const home = document.querySelector('.home');
  const rate = scrolled * -0.2;

  if (home) {
    home.style.transform = `translateY(${rate}px)`;
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const body = document.body;
  
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  preloader.classList.remove('hidden');
  body.classList.remove('loaded');
  body.style.overflow = 'hidden';
  
  setTimeout(() => {
      createParticles();
      const canvas = document.getElementById('particles-canvas');
      if (canvas) {
          canvas.style.opacity = '0';
      }
  }, 100);
  
  window.addEventListener('load', () => {
      setTimeout(() => {
          const canvas = document.getElementById('particles-canvas');
          if (canvas) {
              canvas.style.transition = 'opacity 0.5s ease-in-out';
              canvas.style.opacity = '0.7';
          }
          
          preloader.style.transition = 'opacity 0.5s ease-out';
          preloader.style.opacity = '0';
          
          setTimeout(() => {
              preloader.classList.add('hidden');
              body.classList.add('loaded');
              body.style.overflow = 'auto';
              window.scrollTo(0, 0);
          }, 500);
      }, 500);
  });
  
  setTimeout(() => {
      const canvas = document.getElementById('particles-canvas');
      if (canvas) {
          canvas.style.transition = 'opacity 1s ease-in-out';
          canvas.style.opacity = '0.7';
      }
      
      preloader.style.transition = 'opacity 1s ease-out';
      preloader.style.opacity = '0';
      
      setTimeout(() => {
          preloader.classList.add('hidden');
          body.classList.add('loaded');
          body.style.overflow = 'auto';
          window.scrollTo(0, 0);
      }, 1000);
  }, 2000);
});

  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) {
    homeLink.classList.add('active');
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap';
  link.as = 'style';
  document.head.appendChild(link);

  // Initialize section titles with data-text attribute for the text stroke effect
  document.querySelectorAll('.section-title').forEach(title => {
    title.setAttribute('data-text', title.textContent);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });
document.addEventListener('DOMContentLoaded', function() {
  const certificates = {
      freecodecamp: {
          title: 'Ethical Hacking',
          organization: 'Udemy',
          date: 'December 2023',
          skills: 'Kali Linux, Metasploit Framework, Pentesting, OSINT, BurpSuite, SQL Injection',
          downloadUrl: 'https://www.udemy.com/certificate/UC-bbac9733-86b5-4b60-8f53-0de75042427a/' // Replace with actual URL
      },
      cisco: {
          title: 'Cybersecurity',
          organization: 'Asian Development Bank',
          date: 'January 2024',
          skills: 'Network Security, Threat Analysis, Security Protocols, Risk Assessment',
          downloadUrl: 'https://elearning-adbi.org/certificate-verifier/?code=129125-175-178-5379' // Replace with actual URL
      },
      aws: {
          title: 'AWS Cloud Practitioner',
          organization: 'Amazon Web Services',
          date: 'February 2024',
          skills: 'AWS Services, Cloud Architecture, Cloud Security, Cost Management',
          downloadUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_6QnnquKKPZBx3qNWc_1746004033147_completion_certificate.pdf' // Replace with actual URL
      },
      tcs: {
        title: 'TCS iON Career Edge',
        organization: 'Tata Consultancy Services',
        date: 'February 2024',
        skills: 'Ethics, Professionalism, Discipline, Soft Skills',
        downloadUrl: 'https://drive.google.com/file/d/1L0D_B86O0sUr6jwl4R78M3AGbM4LImqv/view?usp=drivesdk' // Replace with actual URL
    },
      british: {
        title: 'Data Science Job Simulation',
        organization: 'British Airlines',
        date: 'February 2024',
        skills: 'Data Analytics, Data Cleaning, Understanding Data, Cost Management',
        downloadUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/tMjbs76F526fF5v3G/NjynCWzGSaWXQCxSX_tMjbs76F526fF5v3G_6QnnquKKPZBx3qNWc_1746556066444_completion_certificate.pdf' // Replace with actual URL
    }
  };
  const modal = document.getElementById('certModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const downloadBtn = document.getElementById('downloadBtn');
  const closeBtn = document.getElementById('modalClose');
  document.querySelectorAll('.cert-view-btn').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const certId = this.getAttribute('data-cert');
          showCertificate(certId);
      });
  });

  function showCertificate(certId) {
      const cert = certificates[certId];
      
      if (cert) {
          modalTitle.textContent = cert.title;
          modalBody.innerHTML = `
              <div class="cert-details">
                  <div class="cert-info">
                      <p><strong>Issued by:</strong> ${cert.organization}</p>
                      <p><strong>Date Issued:</strong> ${cert.date}</p>
                      <p><strong>Skills Covered:</strong> ${cert.skills}</p>
                  </div>
              </div>
          `;
          
          downloadBtn.onclick = function() {
              if (cert.downloadUrl && cert.downloadUrl !== '#') {
                  window.open(cert.downloadUrl, '_blank', 'noopener,noreferrer');
              } else {
                  alert('Certificate download URL is not available. Please contact me for a copy.');
              }
          };
          
          // Show modal
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
      }
  }

  // Close modal function
  function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
  }

  // Close modal events
  if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
  }
  
  // Close when clicking outside modal
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });
  
  // Close with Escape key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
          closeModal();
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { 
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
});
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.classList.add('animate');
              }, index * 100);
          } else {
              entry.target.classList.remove('animate');
          }
      });
  }, {
      threshold: [0, 0.1, 0.5], 
      rootMargin: '0px 0px -50px 0px'
  });

  timelineItems.forEach(item => {
      timelineObserver.observe(item);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const words = ["interactive", "secure", "innovative", "engaging", "dynamic"];
  let index = 0;
  const wordSpan = document.querySelector(".changing-word");
  if (!wordSpan) return; // safety

  let intervalId = null;
  const mq = window.matchMedia('(min-width: 769px)'); // desktop and up

  function setFixedWidthForLongestWord() {
    wordSpan.style.width = '';
    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));
    const temp = document.createElement('span');
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'nowrap';
    temp.textContent = longestWord;
    document.body.appendChild(temp);
    const fixedWidth = temp.offsetWidth;
    document.body.removeChild(temp);

    wordSpan.style.width = fixedWidth + 'px';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.boxSizing = 'content-box';
  }

  function startRotation() {
    if (intervalId) return;
    setFixedWidthForLongestWord();
    wordSpan.textContent = words[index];
    wordSpan.style.opacity = 1;

    intervalId = setInterval(() => {
      wordSpan.style.opacity = 0;
      setTimeout(() => {
        index = (index + 1) % words.length;
        wordSpan.textContent = words[index];
        wordSpan.style.opacity = 1;
      }, 500);
    }, 2000);
  }

  function stopRotation() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    index = 0;
    wordSpan.textContent = words[index];
    wordSpan.style.opacity = 1;
    wordSpan.style.width = '';
    wordSpan.style.display = '';
  }

  function handleMqChange(e) {
    if (e.matches) startRotation();
    else stopRotation();
  }

  // Initial run
  if (mq.matches) startRotation();
  else stopRotation();

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', handleMqChange);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(handleMqChange);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll(".timeline-item").forEach(item => {
    timelineObserver.observe(item);
  });
});
