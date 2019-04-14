const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {
  let amount = req.body.amount;
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;

  let options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request.get(options, (error, response, body) => {
    let data = JSON.parse(body);
    let result = data.price;
    let date = data.time;

    res.write(`<p>The current date is ${date}</p>`);
    res.write(`<h1>${amount} of ${crypto} in ${fiat} is ${result}</h1>`);

    res.send();
  });
});

app.get("/db", (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/299537',
    qs:
    {
      api_key: '3e24981743a896e6363aefa69c2d8ca3',
      language: 'en-US'
    },
    headers:
    {
      'Postman-Token': '25c3b4ed-ca6c-413e-8dc2-9daf3eefc01f',
      'cache-control': 'no-cache'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

});

app.listen(3000, () => {
  console.log("Started server on port 3000.");
});
