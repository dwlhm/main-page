document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.querySelector('.typing-text');

  function initCelestialSystem() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    if (!sun || !moon) return;

    function updatePositions() {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibTime = new Date(utc + (3600000 * 7));
      
      const hours = wibTime.getHours();
      const minutes = wibTime.getMinutes();
      const seconds = wibTime.getSeconds();
      
      const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
      const dayProgress = totalSeconds / 86400; // 0 to 1
      
      // Angle: 0 at noon (top), PI at midnight (bottom)
      const angle = (dayProgress - 0.5) * Math.PI * 2;
      
      // Use window dimensions for responsive ellipse orbit
      // rx: 45vw ensures it stays within screen width until exactly at the edges
      // ry: 60vh gives a nice tall arc
      const rx = window.innerWidth * 0.45;
      const ry = window.innerHeight * 0.6;
      
      const centerX = window.innerWidth / 2;
      // Center Y is slightly lower so the top of the arc is at 20vh
      const centerY = window.innerHeight * 0.8; 
      
      // Calculate positions
      const sunX = centerX + Math.sin(angle) * rx;
      const sunY = centerY - Math.cos(angle) * ry;
      
      // Moon is exactly opposite to the sun
      const moonX = centerX - Math.sin(angle) * rx;
      const moonY = centerY + Math.cos(angle) * ry;
      
      sun.style.left = `${sunX}px`;
      sun.style.top = `${sunY}px`;
      moon.style.left = `${moonX}px`;
      moon.style.top = `${moonY}px`;
    }
    
    // Set initial position
    updatePositions();
    
    // Update every minute (60000ms) to save performance
    // It moves so slowly that updating every minute is visually imperceptible
    setInterval(updatePositions, 60000);
    
    // Also update on window resize to ensure correct elliptical radius
    window.addEventListener('resize', updatePositions);
  }
  
  initCelestialSystem();

  const phrases = [
    "I'm Dwi Ilham.",
    "Frontend Developer at Komerce.",
    "I think before I build.",
    "Always asking why, not just how.",
    "Let's build something timeless.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let isComplete = false;
  
  function type() {
    if (isComplete) return;

    const currentPhrase = phrases[phraseIndex];
    
    typingText.style.textDecoration = 'none';

    const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    const text = currentPhrase.substring(0, nextCharIndex);
    
    if (phraseIndex === 1 && text.length > 22) {
      const before = text.substring(0, 22);
      const komercePart = text.substring(22, 29);
      const afterPart = text.substring(29);
      typingText.innerHTML = `${before}<span style="text-decoration: underline; text-underline-offset: 4px;">${komercePart}</span>${afterPart}`;
    } else if (phraseIndex === 4 && text.length > 22) {
      const before = text.substring(0, 22);
      const timelessPart = text.substring(22, 30);
      const afterPart = text.substring(30);
      const sparkles = '<span class="sparkle s1"></span><span class="sparkle s2"></span><span class="sparkle s3"></span>';
      typingText.innerHTML = `${before}<span class="sparkle-hover">${timelessPart}${sparkles}</span>${afterPart}`;
    } else {
      typingText.textContent = text;
    }
    
    if (isDeleting) {
      charIndex--;
      typingDelay = 40; 
    } else {
      charIndex++;
      typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      if (phraseIndex === phrases.length - 1) {
        isComplete = true;
        document.body.classList.remove('loading');
        document.body.classList.add('animation-ready');
        revealName();
        return; 
      }
      isDeleting = true;
      typingDelay = 1200; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      typingDelay = 400;
    }
    
    setTimeout(type, typingDelay + (Math.random() * 30));
  }

  function revealName() {
    const nameContainer = document.querySelector('.hero-name-container');
    if (!nameContainer) return;
    
    const nameStr = "I'm Dwi Ilham";
    nameContainer.innerHTML = '';
    
    nameStr.split('').forEach((char, index) => {
      const span = document.createElement('span');
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      span.className = 'char-reveal';
      nameContainer.appendChild(span);
      
      setTimeout(() => {
        span.classList.add('visible');
      }, index * 40); 
    });

    const jellyImg = document.createElement('img');
    jellyImg.src = 'images/profile.png';
    jellyImg.className = 'jelly-profile';
    jellyImg.alt = 'Profile';
    nameContainer.appendChild(jellyImg);
    
    setTimeout(() => {
      jellyImg.classList.add('visible');
    }, nameStr.length * 40 + 200);
  }

  setTimeout(type, 800);
});
