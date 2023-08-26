console.log("test")
const listener = document.getElementById("listener")
listener.addEventListener("keypress", (e) => {
    if (e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d") {
        event.preventDefault();
        document.getElementById(e.key).click();
        console.log(e.key)
      }})
/* document.addEventListener("keypress", (event) => console.log(event.key)) */