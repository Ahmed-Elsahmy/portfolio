// Ahmed Elshamy Portfolio - JavaScript

// Loading Screen
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');

// Loading messages
const loadingMessages = [
  'Loading...',
  'Initializing...',
  'Preparing portfolio...',
  'Almost ready...',
  'Welcome!'
];

// Simulate loading progress
let progress = 0;
let messageIndex = 0;

function updateLoadingProgress() {
  progress += Math.random() * 15;
  if (progress > 100) progress = 100;
  
  progressBar.style.width = progress + '%';
  
  // Update loading text
  if (progress > 20 && messageIndex < 1) {
    loadingText.textContent = loadingMessages[1];
    messageIndex = 1;
  } else if (progress > 40 && messageIndex < 2) {
    loadingText.textContent = loadingMessages[2];
    messageIndex = 2;
  } else if (progress > 60 && messageIndex < 3) {
    loadingText.textContent = loadingMessages[3];
    messageIndex = 3;
  } else if (progress > 80 && messageIndex < 4) {
    loadingText.textContent = loadingMessages[4];
    messageIndex = 4;
  }
  
  if (progress < 100) {
    setTimeout(updateLoadingProgress, 200);
  } else {
    // Hide loading screen after a delay
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000);
  }
}

// Start loading simulation
setTimeout(updateLoadingProgress, 500);

// Initialize AOS after loading
setTimeout(() => {
  AOS.init({ 
    duration: 800, 
    once: true,
    offset: 100,
    easing: 'ease-in-out'
  });
}, 2000);

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenuButton.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when clicking on links
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Particles background effect
const particlesCanvas = document.getElementById("particles-canvas");
const particlesCtx = particlesCanvas.getContext("2d");

let particles = [];
let mouse = { x: 0, y: 0 };

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * particlesCanvas.width;
    this.y = Math.random() * particlesCanvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = Math.random() > 0.5 ? '#00FFFF' : '#0080FF';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > particlesCanvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > particlesCanvas.height) this.vy *= -1;

    // Keep particles in bounds
    this.x = Math.max(0, Math.min(particlesCanvas.width, this.x));
    this.y = Math.max(0, Math.min(particlesCanvas.height, this.y));
  }

  draw() {
    particlesCtx.beginPath();
    particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    particlesCtx.fillStyle = this.color;
    particlesCtx.globalAlpha = this.opacity;
    particlesCtx.fill();
  }
}

// Initialize particles
function initParticles() {
  particles = [];
  const particleCount = Math.floor((particlesCanvas.width * particlesCanvas.height) / 10000);
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Resize canvas
function resizeParticlesCanvas() {
  particlesCanvas.height = window.innerHeight;
  particlesCanvas.width = window.innerWidth;
  initParticles();
}

resizeParticlesCanvas();
window.addEventListener('resize', resizeParticlesCanvas);

// Mouse move event
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Draw particles and connections
function drawParticles() {
  particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  
  // Update and draw particles
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  // Draw connections
  particlesCtx.globalAlpha = 0.1;
  particlesCtx.strokeStyle = '#00FFFF';
  particlesCtx.lineWidth = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        particlesCtx.beginPath();
        particlesCtx.moveTo(particles[i].x, particles[i].y);
        particlesCtx.lineTo(particles[j].x, particles[j].y);
        particlesCtx.stroke();
      }
    }
  }

  // Draw mouse connections
  particlesCtx.globalAlpha = 0.2;
  particles.forEach(particle => {
    const dx = mouse.x - particle.x;
    const dy = mouse.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      particlesCtx.beginPath();
      particlesCtx.moveTo(mouse.x, mouse.y);
      particlesCtx.lineTo(particle.x, particle.y);
      particlesCtx.stroke();
    }
  });

  requestAnimationFrame(drawParticles);
}

// Start particles animation
drawParticles();

// Typing effect
const roles = [".NET Developer", "Web Developer", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  let displayText = currentRole.substring(0, charIndex);
  document.getElementById("typing").textContent = displayText;
  
  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeEffect, 1000);
  }
}

typeEffect();

// Footer year
document.getElementById("footer").innerHTML = `&copy; ${new Date().getFullYear()} Ahmed Elshamy. All rights reserved.`;

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add different animations based on element type
      if (entry.target.classList.contains('skill-card')) {
        entry.target.classList.add('animate-bounce-in');
      } else if (entry.target.classList.contains('project-card')) {
        entry.target.classList.add('animate-scale-in');
      } else if (entry.target.classList.contains('contact-icon')) {
        entry.target.classList.add('animate-float');
      } else if (entry.target.classList.contains('section-title')) {
        entry.target.classList.add('animate-slide-in-down');
      } else {
        entry.target.classList.add('animate-fade-in');
      }
    }
  });
}, observerOptions);

// Observe different elements with different animations
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

document.querySelectorAll('.card-hover').forEach(card => {
  observer.observe(card);
});

document.querySelectorAll('h2').forEach(title => {
  title.classList.add('section-title');
  observer.observe(title);
});

// Add scroll-based parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add mouse follow effect for particles
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseMoving = true;
  
  // Add ripple effect on mouse move
  createRipple(e.clientX, e.clientY);
});

// Ripple effect function
function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: fixed;
    width: 4px;
    height: 4px;
    background: rgba(0, 255, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    animation: rippleEffect 0.6s ease-out;
  }
  
  @keyframes rippleEffect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(20);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible');
    backToTopButton.classList.remove('opacity-100', 'visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add loading states for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + this.textContent;
  });
});

// Enhanced hover effects for project cards
document.querySelectorAll('.card-hover').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
    this.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
    
    // Add glow effect to icons
    const icons = this.querySelectorAll('.fas, .fab');
    icons.forEach(icon => {
      icon.style.transform = 'scale(1.2) rotate(5deg)';
      icon.style.color = '#00FFFF';
    });
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '';
    
    // Reset icons
    const icons = this.querySelectorAll('.fas, .fab');
    icons.forEach(icon => {
      icon.style.transform = '';
      icon.style.color = '';
    });
  });
});

// Add click animations
document.querySelectorAll('button, .card-hover').forEach(element => {
  element.addEventListener('click', function() {
    this.classList.add('animate-wobble');
    setTimeout(() => {
      this.classList.remove('animate-wobble');
    }, 1000);
  });
});

// Add typing animation to text elements
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Add floating animation to specific elements
document.querySelectorAll('.animate-float').forEach(element => {
  element.style.animationDelay = Math.random() * 2 + 's';
});

// Add stagger animation to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
  card.style.animationDelay = (index * 0.1) + 's';
});

// Add stagger animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.animationDelay = (index * 0.2) + 's';
});

// Add magnetic effect to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !subject || !message) {
      showError('Please fill in all fields');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
      // Send email using EmailJS or similar service
      await sendEmail(name, email, subject, message);
      showSuccess();
      contactForm.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      showError('Failed to send message. Please try again or contact me directly.');
    } finally {
      setLoadingState(false);
    }
  });
}

// Function to send email
async function sendEmail(name, email, subject, message) {
  const mailtoSubject = `Portfolio Contact: ${subject}`;
  const mailtoBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
  const mailtoLink = `mailto:ae0891821@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
  
  // Check if we should show the modal
  const shouldShowModal = await checkEmailClientSupport();
  
  if (shouldShowModal) {
    // Show modal with options
    showAlternativeOptions(name, email, subject, message);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  } else {
    // Try to open email client directly
    try {
      window.location.href = mailtoLink;
      
      // Show success message after a delay
      setTimeout(() => {
        showSuccess();
      }, 2000);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    } catch (error) {
      console.error('Error opening email client:', error);
      showAlternativeOptions(name, email, subject, message);
      throw error;
    }
  }
}

// Function to check if email client is supported
async function checkEmailClientSupport() {
  // Check if we're on mobile (where mailto often doesn't work well)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check if we're on Edge (which has issues with mailto)
  const isEdge = /Edg/i.test(navigator.userAgent);
  
  // Check if we're on a browser that typically doesn't support mailto well
  const isProblematicBrowser = isMobile || isEdge;
  
  // For problematic browsers, always show the modal
  if (isProblematicBrowser) {
    return true; // Show modal
  }
  
  // For other browsers, try direct email first
  return false; // Don't show modal, try direct email
}

// Function to show alternative contact options
function showAlternativeOptions(name, email, subject, message) {
  // Create modal with contact options
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-gray-900 rounded-xl border border-gray-700 p-6 max-w-md w-full">
      <div class="text-center mb-6">
        <i class="fas fa-envelope text-4xl text-cyan-400 mb-4"></i>
        <h3 class="text-xl font-semibold text-white mb-2">Choose Contact Method</h3>
        <p class="text-gray-400 text-sm">Select your preferred way to contact me:</p>
      </div>
      
      <!-- Quick Actions -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <button onclick="tryEmailClient('${name}', '${email}', '${subject}', '${message}')" class="bg-cyan-500 text-black font-semibold py-3 px-4 rounded-lg hover:bg-cyan-400 transition">
          <i class="fas fa-envelope mr-2"></i>Try Email
        </button>
        <button onclick="openWhatsApp('${name}', '${subject}', '${message}')" class="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-400 transition">
          <i class="fab fa-whatsapp mr-2"></i>WhatsApp
        </button>
      </div>
      
      <div class="text-center mb-4">
        <span class="text-gray-400 text-sm">Or copy the details manually:</span>
      </div>
      
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">To:</label>
          <div class="flex items-center bg-gray-800 p-3 rounded-lg">
            <span class="text-cyan-400 font-mono text-sm">ae0891821@gmail.com</span>
            <button onclick="copyToClipboard('ae0891821@gmail.com')" class="ml-auto text-cyan-400 hover:text-cyan-300">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Subject:</label>
          <div class="flex items-center bg-gray-800 p-3 rounded-lg">
            <span class="text-white text-sm">Portfolio Contact: ${subject}</span>
            <button onclick="copyToClipboard('Portfolio Contact: ${subject}')" class="ml-auto text-cyan-400 hover:text-cyan-300">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Message:</label>
          <div class="bg-gray-800 p-3 rounded-lg">
            <pre class="text-white text-sm whitespace-pre-wrap">Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}</pre>
            <button onclick="copyMessage()" class="mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
              <i class="fas fa-copy mr-1"></i>Copy Full Message
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button onclick="closeModal()" class="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">
          Close
        </button>
        <button onclick="openWhatsApp('${name}', '${subject}', '${message}')" class="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400 transition">
          <i class="fab fa-whatsapp mr-2"></i>WhatsApp
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Store message data globally for copying
  window.messageData = {
    name, email, subject, message
  };
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Copied to clipboard!', 'success');
  });
}

// Function to copy full message
function copyMessage() {
  const { name, email, subject, message } = window.messageData;
  const fullMessage = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
  copyToClipboard(fullMessage);
}

// Function to try email client
function tryEmailClient(name, email, subject, message) {
  const mailtoSubject = `Portfolio Contact: ${subject}`;
  const mailtoBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
  const mailtoLink = `mailto:ae0891821@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
  
  // Try to open email client
  window.location.href = mailtoLink;
  
  // Close modal and show success message
  closeModal();
  setTimeout(() => {
    showSuccess();
  }, 1000);
}

// Function to open WhatsApp
function openWhatsApp(name, subject, message) {
  const whatsappMessage = `Hello Ahmed,\n\nI'm ${name} and I'd like to discuss: ${subject}\n\n${message}`;
  const whatsappUrl = `https://wa.me/201004542726?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, '_blank');
  closeModal();
}

// Function to close modal
function closeModal() {
  const modal = document.querySelector('.fixed.inset-0');
  if (modal) {
    modal.remove();
  }
}

// Function to show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${
    type === 'success' ? 'bg-green-500' : 'bg-blue-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Function to show loading state
function setLoadingState(loading) {
  if (loading) {
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fas fa-spinner fa-spin ml-2';
    hideMessages();
  } else {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.className = 'fas fa-paper-plane ml-2';
  }
}

// Function to show success message
function showSuccess() {
  successMessage.classList.remove('hidden');
  errorMessage.classList.add('hidden');
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
}

// Function to show error message
function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  successMessage.classList.add('hidden');
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

// Function to hide all messages
function hideMessages() {
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');
}

// Form validation on input
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('input', function() {
    // Remove error styling
    this.classList.remove('border-red-500');
    this.classList.add('border-gray-600');
    
    // Hide error message
    hideMessages();
  });
  
  input.addEventListener('blur', function() {
    // Validate on blur
    if (this.hasAttribute('required') && !this.value.trim()) {
      this.classList.add('border-red-500');
      this.classList.remove('border-gray-600');
    }
  });
});

// Add smooth reveal animation for elements
function revealElements() {
  const elements = document.querySelectorAll('.card-hover');
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', () => {
  revealElements();
});

// Performance optimization: Pause particles animation when not visible
let isParticlesVisible = true;
const particlesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    isParticlesVisible = entry.isIntersecting;
    if (!isParticlesVisible) {
      // Pause particles animation
      particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    }
  });
});

particlesObserver.observe(particlesCanvas);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobileMenu.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could be used for navigation
      console.log('Swipe up detected');
    } else {
      // Swipe down - could be used for navigation
      console.log('Swipe down detected');
    }
  }
}
