document.addEventListener('DOMContentLoaded', () => {
  const cases = document.querySelectorAll('.case');

  cases.forEach(caseEl => {
    caseEl.addEventListener('click', () => {
      if (!caseEl.classList.contains('open')) {
        caseEl.classList.add('open');
      }
    });
  });
});

