//Define variables
var gradientImg;
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2;
var queryResult;
//clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
var clearDayImg;
var clearNightImg;
var rainImg;
var snowImg;
var sleetImg;
var windImg;
var fogImg;
var cloudyImg;
var partlyCloudyDayImg;
var partlyCloudyNightImg;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  gradientImg = loadImage("gradient.png");
  clearDayImg = loadImage("images/clearsky.png");
  clearNightImg = loadImage("clearNightImg.png");
  rainImg = loadImage("images/rain.png");
  snowImg = loadImage("images/snow.png");

  query();
}

function draw(){
  image(gradientImg,0,0,gradientImg.width,gradientImg.height);
  if (queryResult == undefined){
    console.log("waiting");
  } else{
    drawTitle(100);
    drawIcon(550);
    drawWeather(800);
    drawForecast(height - 400);

  }
}

function drawTitle(h){
  noStroke();
  fill(255);
  textSize(100);
  textFont("HelveticaNeue-Thin");
  textAlign(CENTER, CENTER);
  text("Boston, MA", width/2, h);
}

function drawIcon(h){
  var icon = queryResult.hourly.data[0].icon;
// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
  var im = clearDayImg;
  console.log(icon);
  // if (icon == "clear-day"){
  //   im = clearDayImg;
  // } else if (icon == "clear-night"){
  //   im = clearNightImg;
  // } else if (icon == "rain"){
  //   im = rainImg;
  // }
  image(im,width/2-75,h,im.width,im.height)
}

function drawWeather(h){
  var temp = queryResult.currently.temperature ;
  var minTemp = queryResult.daily.data[0].temperatureMin;
  var maxTemp = queryResult.daily.data[0].temperatureMax;
  var description = queryResult.currently.summary;
  // console.log(temp,minTemp,maxTemp,description);
  noStroke();
  fill(255);
  textSize(100);
  textFont("HelveticaNeue-Thin");
  textAlign(CENTER, CENTER);
  text(temp, width/2, h);
  text(minTemp,width/2-200,h+150)
  text(maxTemp,width/2+200,h+150)
  text(description,width/2,h+300)
}

function drawForecast(h){
  interval = width/6;
  for(var i = 1; i < 7;i++){
    console.log(i);
    var w = interval * (i-1) + 40 ;
    console.log("w,h,i",w,h,i);
    drawForecastDay(w,h,i);
  }
}

function drawForecastDay(x,y,ind){
  // Draw day label
  textSize(50);
  var tempD = new Date();
  var day = tempD.getDay();
  day = (day + ind) % 7;
  var days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
  var label = days[day];
  console.log("label,x,y",label,x,y);
  text(label,x,y,50,100);
  // Draw
  console.log(ind,queryResult.daily.data)
  var temp = queryResult.daily.data[ind].temperatureHigh;
  console.log(temp);
  text(temp,x,y+150,50,100);

}



// Run the API call
function query() {

  // URL for querying
  var url= 'https://api.darksky.net/forecast/5c94b1451ec9c4f0b3c46ae2549560a3/42.3601,-71.0589';

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  loadJSON(url, gotData, 'jsonp');
}

// Request is completed
function gotData(data) {
  // console.log(data);
  queryResult = data;

}
