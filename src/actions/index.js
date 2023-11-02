
export const dataLayer = {
  sendData: function(curr_state, ip) {
    console.log("sending", curr_state);
    fetch(ip, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curr_state: curr_state }),
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
  },

  ping: function() {

  }
}
