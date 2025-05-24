document.addEventListener('DOMContentLoaded', function() {
  /* -------------- Анімація при прокручуванні (Scroll Reveal) -------------- */
  const revealElements = document.querySelectorAll('.case');

  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  /* -------------- Логіка відкриття кейсу -------------- */
  const openCaseButtons = document.querySelectorAll('.open-case-btn');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const animationContainer = document.querySelector('.animation-container');
  const resultDiv = document.getElementById('result');
  let animationInProgress = false;

  // Дані про кейси та скіни
  const casesData = {
    "1": [
      { name: "Скін A1", img: "images/skins/Skin%20A1.jpg" },
      { name: "Скін A2", img: "images/skins/Skin%20A2.jpg" },
      { name: "Скін A3", img: "images/skins/Skin%20A3.jpg" },
      { name: "Скін A4", img: "images/skins/Skin%20A4.jpg" },
      { name: "Скін A5", img: "images/skins/Skin%20A5.jpg" }
    ],
    "2": [
      { name: "Скін B1", img: "https://via.placeholder.com/150?text=Skin+B1" },
      { name: "Скін B2", img: "https://via.placeholder.com/150?text=Skin+B2" },
      { name: "Скін B3", img: "https://via.placeholder.com/150?text=Skin+B3" },
      { name: "Скін B4", img: "https://via.placeholder.com/150?text=Skin+B4" },
      { name: "Скін B5", img: "https://via.placeholder.com/150?text=Skin+B5" }
    ],
    "3": [
      { name: "Скін C1", img: "https://via.placeholder.com/150?text=Skin+C1" },
      { name: "Скін C2", img: "https://via.placeholder.com/150?text=Skin+C2" },
      { name: "Скін C3", img: "https://via.placeholder.com/150?text=Skin+C3" },
      { name: "Скін C4", img: "https://via.placeholder.com/150?text=Skin+C4" },
      { name: "Скін C5", img: "https://via.placeholder.com/150?text=Skin+C5" }
    ]
  };

  openCaseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (animationInProgress) return;
      const caseDiv = this.closest('.case');
      const caseId = caseDiv.getAttribute('data-case');
      openCase(caseId);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  function openCase(caseId) {
    animationInProgress = true;
    resultDiv.innerHTML = '';
    animationContainer.innerHTML = ''; // Очищаємо попередню анімацію

    const skins = casesData[caseId];
    const winningIndex = Math.floor(Math.random() * skins.length);
    const winningSkin = skins[winningIndex];

    // Створюємо зображення з анімацією "падіння з відскоком"
    const animImg = document.createElement('img');
    animImg.src = winningSkin.img;
    animImg.alt = winningSkin.name;
    animImg.classList.add('drop-animation');

    animationContainer.appendChild(animImg);
    modal.classList.remove('hidden');

    animImg.addEventListener('animationend', function handler() {
      animImg.removeEventListener('animationend', handler);
      resultDiv.innerHTML = `<p>Вітаємо! Ви отримали: <strong>${winningSkin.name}</strong></p>
                             <img src="${winningSkin.img}" alt="${winningSkin.name}" style="width:200px; border:2px solid #ff6f61; border-radius:10px;">`;
      animationInProgress = false;
    });
  }

  function closeModal() {
    modal.classList.add('hidden');
    animationContainer.innerHTML = '';
    resultDiv.innerHTML = '';
    animationInProgress = false;
  }
});
