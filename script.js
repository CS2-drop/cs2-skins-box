document.addEventListener("DOMContentLoaded", function() {
  var openBtn = document.getElementById("open-box-btn");
  var modal = document.getElementById("modal");
  var animationBox = document.getElementById("animation-box");
  var closeBtn = document.getElementById("close-modal");

  openBtn.addEventListener("click", function() {
    modal.style.display = "flex";
    setTimeout(function() {
      animationBox.classList.add("open");
    }, 100);
  });

  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    animationBox.classList.remove("open");
  });

  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      animationBox.classList.remove("open");
    }
  });
});
