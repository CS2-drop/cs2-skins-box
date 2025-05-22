document.addEventListener("DOMContentLoaded", function() {
  // Отримуємо всі блоки та елементи модального вікна
  const boxes = document.querySelectorAll('.box');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeModal = document.getElementById('closeModal');

  // Додаємо обробку кліку по кожному блоку
  boxes.forEach(box => {
    box.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.style.display = 'block';
    });
  });

  // Закриття модального вікна при кліку на кнопку "закрити"
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  // Закриття модального вікна при кліку поза його межами
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});
