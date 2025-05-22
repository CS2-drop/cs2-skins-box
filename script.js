document.addEventListener('DOMContentLoaded', function() {
  // Объект с набором скинов для каждого кейса
  const casesData = {
    "1": [
      { name: "Skin A1", img: "images/skins/Skin A1.jpg" },
      { name: "Skin A2", img: "images/skins/Skin A2.jpg" },
      { name: "Skin A3", img: "images/skins/Skin A3.jpg" },
      { name: "Skin A4", img: "images/skins/Skin A4.jpg" },
      { name: "Skin A5", img: "images/skins/Skin A5.jpg" }
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

  const openCaseButtons = document.querySelectorAll('.open-case-btn');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const skinsTrack = document.getElementById('skinsTrack');
  const resultDiv = document.getElementById('result');
  let animationInProgress = false;

  // Назначаем обработчики клика для каждой кнопки открытия кейса
  openCaseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (animationInProgress) return; // Не допускаем повторного клика во время анимации
      const caseDiv = this.closest('.case');
      const caseId = caseDiv.getAttribute('data-case');
      openCase(caseId);
    });
  });

  // Закрытие модального окна при клике на кнопку или по полю вне содержимого
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) { 
      closeModal(); 
    }
  });

  function openCase(caseId) {
    animationInProgress = true;
    resultDiv.innerHTML = '';
    skinsTrack.style.transition = 'none';
    skinsTrack.style.transform = 'translateX(0)';
    // Очищаем предыдущие скины
    skinsTrack.innerHTML = '';

    // Получаем набор скинов для выбранного кейса и формируем длинный массив для анимации
    const skins = casesData[caseId];
    let reel = [];
    const repeatCount = 10; // число повторов для эффекта бесконечной прокрутки
    for (let i = 0; i < repeatCount; i++) {
      reel = reel.concat(skins);
    }

    // Добавляем изображения скинов в ленту
    reel.forEach((skin) => {
      const img = document.createElement('img');
      // Если skin.img пустой, используем запасной URL для placeholder
      img.src = skin.img ? skin.img : 'https://via.placeholder.com/150?text=No+Image';
      img.alt = skin.name;
      skinsTrack.appendChild(img);
    });

    // Показываем модальное окно
    modal.classList.remove('hidden');

    // Принудительный reflow для корректного применения стилей
    void skinsTrack.offsetWidth;

    // Ждём загрузки всех изображений в ленте
    const images = Array.from(skinsTrack.querySelectorAll('img'));
    Promise.all(images.map(img => {
      return img.complete
        ? Promise.resolve()
        : new Promise(resolve => { 
            img.onload = resolve;
            img.onerror = resolve;
          });
    })).then(() => {
      calculateAndAnimate(reel);
    });
  }

  // Функция для вычисления размеров и запуска анимации
  function calculateAndAnimate(reel) {
    // Вычисляем реальную ширину первого элемента скина с учётом margin
    let itemWidth = 170; // значение по умолчанию
    const firstImg = skinsTrack.querySelector('img');
    if (firstImg) {
      const rect = firstImg.getBoundingClientRect();
      const computedStyle = getComputedStyle(firstImg);
      const marginLeft = parseFloat(computedStyle.marginLeft);
      const marginRight = parseFloat(computedStyle.marginRight);
      itemWidth = rect.width + marginLeft + marginRight;
    }

    // Вычисляем ширину контейнера анимации (без учета бордеров)
    const container = document.querySelector('.animation-container');
    const containerWidth = container.clientWidth;

    // Выбираем случайный индекс скина из второй половины ленты для эффекта
    const minIndex = Math.floor(reel.length / 2);
    const maxIndex = reel.length - 1;
    const targetIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

    // Вычисляем смещение так, чтобы выбранный скин оказался по центру контейнера:
    // (левый край элемента + половина его ширины) минус половина ширины контейнера.
    const targetOffset = targetIndex * itemWidth + (itemWidth / 2) - (containerWidth / 2);

    // Запускаем анимацию прокрутки ленты скинов с задержкой в 50 мс
    setTimeout(() => {
      skinsTrack.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
      skinsTrack.style.transform = `translateX(-${targetOffset}px)`;
    }, 50);

    // После завершения анимации выводим результат
    skinsTrack.addEventListener('transitionend', function handler() {
      skinsTrack.removeEventListener('transitionend', handler);
      const winningSkin = reel[targetIndex];
      const skinImage = winningSkin.img ? winningSkin.img : 'https://via.placeholder.com/150?text=No+Image';
      resultDiv.innerHTML = `<p>Поздравляем! Вы получили: <strong>${winningSkin.name}</strong></p>
                             <img src="${skinImage}" alt="${winningSkin.name}" style="width:200px; border:2px solid #ff6f61; border-radius:10px;">`;
      animationInProgress = false;
    });
  }

  function closeModal() {
    modal.classList.add('hidden');
    skinsTrack.style.transition = 'none';
    skinsTrack.style.transform = 'translateX(0)';
    animationInProgress = false;
  }
});
