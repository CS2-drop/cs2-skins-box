document.addEventListener('DOMContentLoaded', () => {
  const cases = document.querySelectorAll('.case');

  cases.forEach(caseEl => {
    caseEl.addEventListener('click', function () {
      // Если кейс уже открыт – закрываем его
      if (this.classList.contains('open')) {
        this.classList.remove('open');
        const skinContainer = this.querySelector('.skin-container');
        skinContainer.classList.remove('animate');
        // Сбросим transform, чтобы при повторном открытии анимация начиналась с начала
        skinContainer.style.transform = 'translateX(0)';
      } else {
        // Закрываем ранее открытые кейсы (если нужно, чтобы был открыт только один)
        cases.forEach(item => {
          if (item !== this && item.classList.contains('open')) {
            item.classList.remove('open');
            item.querySelector('.skin-container').classList.remove('animate');
            item.querySelector('.skin-container').style.transform = 'translateX(0)';
          }
        });
        // Открываем выбранный кейс
        this.classList.add('open');
        const skinContainer = this.querySelector('.skin-container');
        // Для перезапуска анимации сразу убираем класс animate, затем через короткую задержку добавляем его
        skinContainer.classList.remove('animate');
        void skinContainer.offsetWidth; // перезапуск рефлоу
        skinContainer.classList.add('animate');
      }
    });
  });
});
