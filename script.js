document.addEventListener('DOMContentLoaded', function() {
  // Анимация появления кейсов при прокрутке
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
  revealElements.forEach(el => observer.observe(el));

  // Получаем элементы страницы
  const openCaseButtons = document.querySelectorAll('.open-case-btn');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const animationContainer = document.querySelector('.animation-container');
  const resultDiv = document.getElementById('result');
  let animationInProgress = false;

  // Данные кейсов
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

  // Обработчик для каждой кнопки открытия кейса
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

  // Функция открытия кейса с бесконечным вращением и замедлением
  function openCase(caseId) {
    animationInProgress = true;
    resultDiv.innerHTML = "";
    modal.classList.remove('hidden');

    // Создаем контейнер для дорожки с изображениями
    animationContainer.innerHTML = '<div class="skins-track" id="skinsTrack"></div>';
    const track = document.getElementById('skinsTrack');

    const skins = casesData[caseId];
    const imageWidth = 150;
    // Для эффекта бесконечного вращения создаём две копии набора скинов
    let trackContent = "";
    for (let i = 0; i < 2; i++) {
      skins.forEach(skin => {
        trackContent += `<img src="${skin.img}" alt="${skin.name}" class="drum-skin">`;
      });
    }
    track.innerHTML = trackContent;
    track.style.display = "flex";

    // Бесконечное вращение
    let currentOffset = 0;
    let spinSpeed = 0.5; // пикселей в миллисекунду
    let spinning = true;
    let lastTimestamp = null;
    function infiniteSpin(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      currentOffset += spinSpeed * delta;
      const singleCycle = skins.length * imageWidth;
      // Если достигли конца цикла – сбрасываем
      if (currentOffset >= singleCycle) {
        currentOffset -= singleCycle;
      }
      track.style.transform = `translateX(-${currentOffset}px)`;
      if (spinning) {
        requestAnimationFrame(infiniteSpin);
      }
    }
    requestAnimationFrame(infiniteSpin);

    // Через 3 секунды останавливаем бесконечное вращение и начинаем замедление
    setTimeout(() => {
      spinning = false; // остановка бесконечного вращения
      // Выбираем выигрышный скин случайным образом
      const winningIndex = Math.floor(Math.random() * skins.length);
      const winningSkin = skins[winningIndex];

      const containerWidth = animationContainer.clientWidth;
      const singleCycle = skins.length * imageWidth;
      // Вычисляем, чтобы выигрышный скин оказался в центре контейнера
      const targetCenter = containerWidth / 2 - imageWidth / 2;
      let desiredRemainder = winningIndex * imageWidth - targetCenter;
      if (desiredRemainder < 0) desiredRemainder += singleCycle;
      let remainder = currentOffset % singleCycle;
      let additionalOffset = (desiredRemainder < remainder)
        ? singleCycle - (remainder - desiredRemainder)
        : desiredRemainder - remainder;
      // Добавим еще несколько полных циклов для эффекта (например, 2 цикла)
      const finalTarget = currentOffset + additionalOffset + 2 * singleCycle;

      // Анимация замедления (3000 мс) с экспоненциальной функцией easeOutExpo
      const duration = 3000;
      let startDecelerationTime = null;
      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }
      function decelerate(timestamp) {
        if (!startDecelerationTime) startDecelerationTime = timestamp;
        const elapsed = timestamp - startDecelerationTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const newOffset = currentOffset + (finalTarget - currentOffset) * easedProgress;
        track.style.transform = `translateX(-${newOffset}px)`;
        if (progress < 1) {
          requestAnimationFrame(decelerate);
        } else {
          resultDiv.innerHTML = `
            <p>Вітаємо! Ви отримали: <strong>${winningSkin.name}</strong></p>
            <img src="${winningSkin.img}" alt="${winningSkin.name}" style="width:200px; border:2px solid #ff6f61; border-radius:10px;">
          `;
          animationInProgress = false;
        }
      }
      requestAnimationFrame(decelerate);
    }, 3000);
  }

  function closeModal() {
    modal.classList.add("hidden");
    animationContainer.innerHTML = "";
    resultDiv.innerHTML = "";
    animationInProgress = false;
  }
});
