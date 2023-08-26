console.log("test")
const listener = document.getElementById("listener")
listener.addEventListener("keypress", (e) => {
    if (e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d") {
        event.preventDefault();
        const id = e.key
        document.getElementById('w').click();
        clicked(id)
      }})
/* document.addEventListener("keypress", (event) => console.log(event.key)) */

function clicked(id) {
    console.log(id)
}