document.addEventListener("DOMContentLoaded", function() {
  var openBtn = document.getElementById("open-box-btn");
  var modal = document.getElementById("modal");
  var closeBtn = document.getElementById("close-modal");
  var boxes = document.querySelectorAll(".case");

  openBtn.addEventListener("click", function() {
    modal.style.display = "flex";
    boxes.forEach(function(box, index) {
      setTimeout(function() {
        box.classList.add("open");
      }, index * 200);
    });
  });

  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    boxes.forEach(function(box) {
      box.classList.remove("open");
    });
  });

  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      boxes.forEach(function(box) {
        box.classList.remove("open");
      });
    }
  });
});
