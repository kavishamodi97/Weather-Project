//import Express Package
const express=require('express');

const app=express();

//import Body-Parser Package
const bodyParser = require('body-parser')

//import Https Package
const https = require('https');

//use of body-parser package
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){

   res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res) {

//print entered city name
  console.log(req.body.cityName);

  //get entered input data into query Variable
   const query= req.body.cityName;
   const appId="e51aebd19297d06b772f01a6725ddc2d";
   const unit="metric";

  //use Weather API and Store into url Variable
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appId+"&units="+unit;

https.get(url,function(response) {
    console.log(response.statusCode);

  //get API Response in Json format
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    console.log(weatherData);
    const temp=weatherData.main.temp;
    console.log(temp);
    const weatherDesc=weatherData.weather[0].description;
    console.log(weatherDesc);
    const icon=weatherData.weather[0].icon;
    console.log(icon);
    const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";

       //fetch json data and display in browser
       res.write("<p> The Weather Currently is " + weatherDesc + "</p>");
       res.write("<h2> The Temperature in "+ query +" is " + temp + " Degree Celcius </h2>");
       res.write("<img src=" + imageUrl + ">")
       res.send()
  });
});
});

//server listen on port number 3000
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
