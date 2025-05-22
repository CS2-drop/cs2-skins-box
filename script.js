// Проста обробка кліку по кожному блоку
document.querySelectorAll('.box').forEach(function(box) {
  box.addEventListener('click', function() {
    alert('Ви натиснули на ' + this.textContent);
  });
});
