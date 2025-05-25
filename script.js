document.addEventListener("DOMContentLoaded", function() {
  var openBtn = document.getElementById("open-box-btn");
  var modal = document.getElementById("modal");
  var closeBtn = document.getElementById("close-modal");
  var boxes = document.querySelectorAll(".case");
  var skins = [
    "cs2-skins-box/images/skins/Skin A1.jpg",
    "cs2-skins-box/images/skins/Skin A2.jpg",
    "cs2-skins-box/images/skins/Skin A3.jpg",
    "cs2-skins-box/images/skins/Skin A4.jpg",
    "cs2-skins-box/images/skins/Skin A5.jpg"
  ];
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  openBtn.addEventListener("click", function() {
    modal.style.display = "flex";
    boxes.forEach(function(box, index) {
      var skinOrder = shuffle(skins.slice());
      var weaponImgs = box.querySelectorAll(".weapon");
      weaponImgs.forEach(function(img, idx) {
        img.src = skinOrder[idx];
      });
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
```
