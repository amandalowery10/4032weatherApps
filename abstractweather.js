//Declare global variables
var queryResult;
var sunnyImg;
var rainImg;
var clearnightImg;
var snowImg;
var sleetImg;
var windImg;
var fogImg;
var cloudImg;
var partlycloudydayImg;
var partlycloudnightImg;
var backgroundcolor;



function setup() {
  createCanvas(window.innerWidth, 1500);
  noStroke();
  fill(255);
  textSize(100);
  textFont("HelveticaNeue-Thin");
  textAlign(CENTER, CENTER/4);
  text("Boston, MA", 500, 200);



  backgroundcolor = background(color('#00BFFF'));
  sunnyImg = loadImage("sunnyImg.png");
  clearSkyImg = loadImage("images/clearsky.png");
  partlycloudynightImg = loadImage("partlycloudynightImg.png");
  clearnightImg = loadImage("clearnightImg.png");
  cloudyImg = loadImage("cloudImg.png");
  query();
}

// State of Clock
/**
Time of Day
Current Weather - raining, sunny,cloudy,snowing
Sunrise - Sunset
**/

function draw(){
  var date = new Date();
  // var date = new Date(1507294829*1000); // 9 AM
  // var date = new Date(1507341629*1000); // 11 AM
  // var date = new Date(1507277520*1000); // 12 AM
  // var date = new Date(*1000); //

  var hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds();



  // Displays the image at its actual size at point (0,0)
  // image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size

  // If query result is undefined
  // Do something
  if(queryResult == undefined){
    console.log("waiting");

  } else{


      var sunrise = queryResult.daily.data[0].sunriseTime;
      var sunriseDate = new Date(sunrise*1000);
      // var sunriseDate = new Date(1507286694*1000);

      // convert to milliseconds and make date
      var sunriseHours = sunriseDate.getHours(),
      sunriseMinutes = sunriseDate.getMinutes(),
      sunriseSeconds = sunriseDate.getSeconds();

      var sunset = queryResult.daily.data[0].sunsetTime;
      var sunsetDate = new Date(sunset*1000); // convert to milliseconds and make date
      // var sunsetDate = new Date(1507329894*1000);
      var sunsetHours = sunsetDate.getHours(),
      sunsetMinutes = sunsetDate.getMinutes(),
      sunsetSeconds = sunsetDate.getSeconds();


      var dayIcon = sunnyImg; // This is the default. We might change this later
      var nightIcon = clearnightImg;

      var icon = queryResult.hourly.data[0].icon;
      // var icon = "rainy";
      var radius = 450;

      // Before sunset and after sunrise
      // console.log("current",hours,minutes,seconds);
      // console.log("sunrise",sunriseHours,sunriseMinutes,sunriseSeconds);
      // console.log("sunset",sunsetHours,sunsetMinutes,sunsetSeconds);
      // console.log(icon);

      if(date < sunsetDate && date > sunriseDate ){
        backgroundcolor = background(color("#ffb6c1"));
        drawCircles();
        drawLabels();

        // Set Day icon
        if(icon == "clear-day"){
          dayIcon = sunnyImg;
        } else if (icon == "partly-cloudy-day"){
          dayIcon = partlycloudydayImg;
        }

        // Set position of day icon
        t = (hours + minutes / 60 + seconds / 3600) * TAU / 12 - HALF_PI;
        v = p5.Vector.fromAngle(t);
        v.mult(radius);
        // console.log("V",v.x,v.y);

        // Draw day icon
        image(dayIcon, v.x+width/2, v.y+height/2, dayIcon.width/4, dayIcon.height/4);


        // Set position of night icon
        nightAngle = (sunsetHours + sunsetMinutes / 60 + sunsetSeconds / 3600) * TAU / 12 - HALF_PI;
        nightV = p5.Vector.fromAngle(nightAngle);
        nightV.mult(radius);
        // console.log("nightV",nightV.x,nightV.y);

        // Draw night icon
        image(nightIcon, nightV.x+width/2, nightV.y+height/2, nightIcon.width/4, nightIcon.height/4);


      } else{
        backgroundcolor = background(color("#191970"));

        drawCircles();
        drawLabels();


        // console.log('lemme smash');
          // Set Day icon
          if(icon == "clear-night"){
            nightIcon = clearnightImg;
          } else if (icon == "partly-cloudy-night"){
            nightIcon = partlycloudynightImg;

          }

          // Set position of night icon
          t = (hours + minutes / 60 + seconds / 3600) * TAU / 12 - HALF_PI;
          v = p5.Vector.fromAngle(t);
          v.mult(radius);

          // console.log(v.x,v.y);

          // Draw night icon
          image(nightIcon, v.x+width/2, v.y+height/2, nightIcon.width/4, dayIcon.height/4);
          // console.log('DOESTHISWORK');

          // Set position of night icon
          dayAngle = (sunriseHours + sunriseMinutes / 60 + sunriseSeconds / 3600) * TAU / 12 - HALF_PI;
          dayV = p5.Vector.fromAngle(dayAngle);
          dayV.mult(radius);
          // console.log(dayV.x,dayV.y);

          // Draw night icon
          image(dayIcon, dayV.x+width/2, dayV.y+height/2, dayIcon.width/4, dayIcon.height/4);

      }
    }
}

function drawLabels(){
  noStroke();
  fill(255);
  textSize(100);
  textFont("HelveticaNeue-Thin");
  textAlign(CENTER, CENTER/4);
  text("Boston, MA", 500, 200);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(190);
  text(queryResult.currently.temperature + "º", width/2, height/2);
}

function drawCircles(){
  // Get Current Time in hours minutes seconds
  var date = new Date();
  // var date = new Date(1507294829*1000); // 9 AM

  var hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  // console.log(hours);
  if (hours < 12){
    // draw inner circle like this
    noFill();
    stroke(255);
    strokeWeight(30);
    var lineSize = 700;
    arc(width/2, height/2, lineSize, lineSize, 0,2*PI);

    // draw outer circle like this
    noFill();
    stroke(0);
    strokeWeight(30);
    var lineSize = 800;
    t = (hours + minutes / 60 + seconds / 3600) * TAU / 12 - HALF_PI;
    arc(width/2, height/2, lineSize, lineSize, t,-HALF_PI);
  }

  else{
    // draw inner circle like this
    noFill();
    stroke(255);
    strokeWeight(40);
    var lineSize = 700;
    t = (hours + minutes / 60 + seconds / 3600) * TAU / 12 - HALF_PI;
    arc(width/2, height/2, lineSize, lineSize, t,-HALF_PI);
    // draw outer circle like this
  }
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
  console.log(queryResult);

  var current = queryResult.currently; // this is how to look at the current weather
  var minute = queryResult.minutely.data[0]; // this is how to look at the current minute
  var day = queryResult.daily.data[0]; // this is how to look at the current day
  var sunrise = queryResult.daily.data[0].sunriseTime;
  var sunTime = new Date(sunrise*1000);
  //var sunrisehours = sunTime.getHours();

  var sunriseHours = sunTime.getHours();
  console.log("sunrise land",sunriseHours);

  var sunset = queryResult.daily.data[0].sunsetTime;
  var nightTime = new Date(sunset*1000);

  console.log("tryna display temp but..");

}
