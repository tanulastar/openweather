const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")

   
});

app.post("/", function(req, res) {
    const query = req.body.cityname
    const apiKey = "6e548281525a1a8a7ed8ace06ae41a1b"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apiKey + "&unit=" + unit

    https.get(url, function(response) {
        console.log(response.statusCode)
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const description = weatherData.weather[0].description
            console.log(description)
            const temp = weatherData.main.temp
            const timeZone = weatherData.timezone
            const icon = weatherData.weather[0].icon
            const urlImage = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
           
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1> The temperature in " + query + " is " +  temp + " degree Celcius <h1/>")
            res.write("<img src=" + urlImage + ">")
          
        
            
            
            res.send();
        })
        });

})





app.listen(3000, function() {
    console.log("Server is running on port 3000")
});



// https://api.openweathermap.org/data/2.5/weather?q=London&limit=5&appid=6e548281525a1a8a7ed8ace06ae41a1b