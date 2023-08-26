console.log("test");
const listener = document.getElementById("listener");
listener.addEventListener("keypress", (event) => console.log(event.key));
/* document.addEventListener("keypress", (event) => console.log(event.key)) */

const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  console.log("testing", key);
  key.addEventListener("click", () => {
    console.log("HELLOWORLD", key.id);

    
  })
});
