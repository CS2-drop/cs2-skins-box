document.addEventListener('DOMContentLoaded', function() {
  // Объект с набором скинов для каждого кейса
  const casesData = {
    "1": [
      {name: "Skin A1", img: ""},
      {name: "Skin A2", img: ""},
      {name: "Skin A3", img: ""},
      {name: "Skin A4", img: ""},
      {name: "Skin A5", img: ""}
    ],
    "2": [
      {name: "Skin B1", img: "https://via.placeholder.com/150?text=Skin+B1"},
      {name: "Skin B2", img: "https://via.placeholder.com/150?text=Skin+B2"},
      {name: "Skin B3", img: "https://via.placeholder.com/150?text=Skin+B3"},
      {name: "Skin B4", img: "https://via.placeholder.com/150?text=Skin+B4"},
      {name: "Skin B5", img: "https://via.placeholder.com/150?text=Skin+B5"}
    ],
    "3": [
      {name: "Skin C1", img: "https://via.placeholder.com/150?text=Skin+C1"},
      {name: "Skin C2", img: "https://via.placeholder.com/150?text=Skin+C2"},
      {name: "Skin C3", img: "https://via.placeholder.com/150?text=Skin+C3"},
      {name: "Skin C4", img: "https://via.placeholder.com/150?text=Skin+C4"},
      {name: "Skin C5", img: "https://via.placeholder.com/150?text=Skin+C5"}
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
      if (animationInProgress) return; // не допускаем повторного клика во время анимации
      const caseDiv = this.closest('.case');
      const caseId = caseDiv.getAttribute('data-case');
      openCase(caseId);
    });
  });

  // Закрытие модального окна
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

    const skins = casesData[caseId];
    // Собираем длинный ряд скинов для плавной анимации (повторяем массив несколько раз)
    let reel = [];
    const repeatCount = 10; // число повторов для эффекта бесконечной прокрутки
    for (let i = 0; i < repeatCount; i++) {
      reel = reel.concat(skins);
    }

    // Добавляем изображения скинов в ленту
    reel.forEach((skin, index) => {
      const img = document.createElement('img');
      img.src = skin.img;
      img.alt = skin.name;
      skinsTrack.appendChild(img);
    });

    // Показываем модальное окно
    modal.classList.remove('hidden');

    // Принудительный reflow для применения первоначального состояния
    void skinsTrack.offsetWidth;

    // Выбираем случайный индекс продукта во второй половине ленты для реалистичного эффекта
    const minIndex = Math.floor(reel.length / 2);
    const maxIndex = reel.length - 1;
    const targetIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

    // Допустим, ширина каждого элемента (150px + маргины по 10px с каждой стороны = 170px)
    const itemWidth = 170;
    // Вычисляем смещение так, чтобы выбранный скин оказался по центру контейнера
    const container = document.querySelector('.animation-container');
    const containerWidth = container.offsetWidth;
    const targetOffset = targetIndex * itemWidth - (containerWidth / 2 - itemWidth / 2);

    // Запускаем анимацию прокрутки ленты скинов
    setTimeout(() => {
      skinsTrack.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
      skinsTrack.style.transform = `translateX(-${targetOffset}px)`;
    }, 50);

    // После завершения анимации выводим результат открытия кейса
    skinsTrack.addEventListener('transitionend', function handler() {
      skinsTrack.removeEventListener('transitionend', handler);
      const winningSkin = reel[targetIndex];
      resultDiv.innerHTML = `<p>Поздравляем! Вы получили: <strong>${winningSkin.name}</strong></p>
                             <img src="${winningSkin.img}" alt="${winningSkin.name}" style="width:200px; border:2px solid #ff6f61; border-radius:10px;">`;
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
