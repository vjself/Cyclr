module.exports = {
  onToken: token => {
    fetch("/api/save-stripe-token", {
      method: "POST",
      body: JSON.parse(token)
    }).then(response => {
      console.log(response.data);
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
};
