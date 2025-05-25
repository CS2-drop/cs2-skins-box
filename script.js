document.addEventListener("DOMContentLoaded", function() {
  var openBtn = document.getElementById("open-box-btn");
  var modal = document.getElementById("modal");
  var animationBox = document.getElementById("animation-box");
  var caseImg = document.getElementById("case-img");
  var closeBtn = document.getElementById("close-modal");
  var cases = [
    "cs2-skins-box/images/cases/case1.jpg",
    "cs2-skins-box/images/cases/case2.jpg",
    "cs2-skins-box/images/cases/case3.jpg"
  ];
  openBtn.addEventListener("click", function() {
    modal.style.display = "flex";
    var randomIndex = Math.floor(Math.random() * cases.length);
    caseImg.src = cases[randomIndex];
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
