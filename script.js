document.addEventListener('DOMContentLoaded', function() {
  // Набор скинов для каждого кейса
  const casesData = {
    "1": [
      { name: "Skin A1", img: "images/skins/Skin%20A1.jpg" },
      { name: "Skin A2", img: "images/skins/Skin%20A2.jpg" },
      { name: "Skin A3", img: "images/skins/Skin%20A3.jpg" },
      { name: "Skin A4", img: "images/skins/Skin%20A4.jpg" },
      { name: "Skin A5", img: "images/skins/Skin%20A5.jpg" }
    ],
    "2": [
      { name: "Skin B1", img: "https://via.placeholder.com/150?text=Skin+B1" },
      { name: "Skin B2", img: "https://via.placeholder.com/150?text=Skin+B2" },
      { name: "Skin B3", img: "https://via.placeholder.com/150?text=Skin+B3" },
      { name: "Skin B4", img: "https://via.placeholder.com/150?text=Skin+B4" },
      { name: "Skin B5", img: "https://via.placeholder.com/150?text=Skin+B5" }
    ],
    "3": [
      { name: "Skin C1", img: "https://via.placeholder.com/150?text=Skin+C1" },
      { name: "Skin C2", img: "https://via.placeholder.com/150?text=Skin+C2" },
      { name: "Skin C3", img: "https://via.placeholder.com/150?text=Skin+C3" },
      { name: "Skin C4", img: "https://via.placeholder.com/150?text=Skin+C4" },
      { name: "Skin C5", img: "https://via.placeholder.com/150?text=Skin+C5" }
    ]
  };

  // Элементы модального окна и кнопок
  const openCaseButtons = document.querySelectorAll('.open-case-btn');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const animationContainer = document.querySelector('.animation-container');
  const resultDiv = document.getElementById('result');
  let animationInProgress = false;

  // Обработчик для открытия кейса
  openCaseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (animationInProgress) return;
      const caseDiv = this.closest('.case');
      const caseId = caseDiv.getAttribute('data-case');
      openCase(caseId);
    });
  });

  // Закрытие модального окна при клике на кнопку, вне содержимого или по Escape
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  function openCase(caseId) {
    animationInProgress = true;
    resultDiv.innerHTML = '';
    animationContainer.innerHTML = ''; // очищаем предыдущую анимацию

    const skins = casesData[caseId];
    const winningIndex = Math.floor(Math.random() * skins.length);
    const winningSkin = skins[winningIndex];

    // Создаём изображение с анимацией dropBounce
    const animImg = document.createElement('img');
    animImg.src = winningSkin.img || 'https://via.placeholder.com/150?text=No+Image';
    animImg.alt = winningSkin.name;
    animImg.classList.add('drop-animation');

    animationContainer.appendChild(animImg);
    modal.classList.remove('hidden');

    animImg.addEventListener('animationend', function handler() {
      animImg.removeEventListener('animationend', handler);
      resultDiv.innerHTML = `<p>Поздравляем! Вы получили: <strong>${winningSkin.name}</strong></p>
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

  // Scroll Reveal: добавление эффекта появления для кейсов
  const revealElements = document.querySelectorAll('.case');
  const observerOptions = { root: null, threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
});
