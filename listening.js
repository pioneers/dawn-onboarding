const listener = document.getElementById("listener");

listener.addEventListener("keydown", (event) => press(event.key));

const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  console.log("testing", key);
  key.addEventListener("mousedown", () => {
    press(key.id);    
  })
});

function press(id) {
  const key = document.getElementById(id)
  var bgColor = window.getComputedStyle(key).backgroundColor;
  key.style.backgroundColor = "gray";
  listener.addEventListener("keyup", function(event) {
    if (event.key === id) { 
      key.style.backgroundColor = bgColor;
    }
  })
  listener.addEventListener("mouseup", function(event) {
    key.style.backgroundColor = bgColor;
  })
}