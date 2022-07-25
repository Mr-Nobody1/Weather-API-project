const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));




app.get("/", function(req, res){
          res.sendFile(__dirname + "/index.html");
     
   
})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
const appID = "4238bbfba1b03c6446b18b5eddf7ee97";
const unit = "metric";

var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + appID;
https.get(url, function(response){
    
    response.on("data", function(data){

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
       
        res.write("<p>The weather is " + description + "</p>");
        res.write("<h1>The temperature is " + temp + " in " + query + "</h1> <br>" );
        

        const icon = weatherData.weather[0].icon;
        const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 

        res.write("<img src="+ imgurl +">");
        res.send();

    })



})
   
})






app.listen(3000, function(){
    console.log("Server in running");
})