validateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("clicked");

  let api_key = `ema_live_759gDCxd8CSokfaVtpIze4CfYyqpC2pzkBGXL0pt`;

  let email = document.getElementById("email").value;

  let url = `https://api.emailvalidation.io/v1/info?apikey=${api_key}&email=${email}`;

  let res = await fetch(url);
  let result = await res.json();

  result.tag = null;
  result.did_you_mean = null;

  let str = ``;

  for (const key in result) {
    const value = result[key];

    str = str + `<div id="result"><b>${key}:</b> ${value}</div>`;
  }

  resultContainer.innerHTML = str;
});
