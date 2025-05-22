document.addEventListener("DOMContentLoaded", () => {
  const cases = document.querySelectorAll('.case');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = document.querySelector('.close');

  // Обработчик клика по кейсу – открывает модальное окно с информацией
  cases.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      const description = item.getAttribute('data-description');
      modalTitle.textContent = title;
      modalDesc.textContent = description;
      modal.style.display = 'flex';
    });
  });

  // Закрытие модального окна по клику на крестик
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закрытие модального окна, если клик произошёл вне его содержимого
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
