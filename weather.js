// "page load" event handler
$(function() {
  let apiKey = "faf42b4cd1c74b82a1b2934c828495f7"; // don't steal it please
  let url = "http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=harry+potter&api-key=" + apiKey;
  $.get(url, function(data) {
    console.log(data); // have a look at what "data" is in the browser console
    $(".video").empty();
     {
      let movie = data.results[0];
      let html = '<div class="col-15">';
      html = html + '<div class="card">';
      html = html + '<div class="card-body">';
      html = html + '<h4 class="card-top">' + movie.display_title + '</h4>';
      html = html + '<p class="card-content">' + movie.summary_short + '</p>';
      html = html + '</div></div></div>';
      $(".video").append(html);
    }
    $(".video").fadeIn(2000);
  });
});






$(function() {
  let apiKey = "484f0b84-8fab-4db6-bcda-d203e23f80f5"; // don't steal it please
  let url = "http://content.guardianapis.com/search?q=british%20politics&api-key=" + apiKey;
  $.get(url, function(data) {
    console.log(data); // have a look at what "data" is in the browser console
    $(".topnews").empty();
    {
      let topstories = data.response.results[0];
      let html = '<div class="col-15">'
            html = html + '<div class="card">';
            html = html + '<div class="card-body">';
            html = html + '<p class="card-content">' + topstories.webTitle + ' ' + topstories.webUrl + '</p>';
            html = html + '</div></div></div>';
      $(".topnews").append(html);
    }
    $(".topnews").fadeIn(2000);
  });
});






let updateWidget = function(data) {

  console.log("Got weather data: ", data)

  let weatherImage = data.weather[0]
  let weather_url = "http://openweathermap.org/img/w/" + weatherImage.icon + ".png"
  console.log ("The image url is:", weather_url)
  $("card-img-top bg-primary img-fluid").attr("src", weather_url)

  $(".card-title").html(data.name)

  $(".card-text").html("It is " + Math.round(data.main.temp) + " degrees outside, great Quidditch weather")

  // YOUR CODE GOES HERE

  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.

}


let getWeather = function(info) {
  window.weatherInfo = info
  let latitude = info.coords.latitude;
  let longitude = info.coords.longitude;
  let apiKey = 'ca36ce739058a0dfa193871f843bb0fd'; // REPLACE THIS VALUE with your own key.

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let handlePosition = function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
}

$("#get_forecast").on("click", handlePosition)
////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
