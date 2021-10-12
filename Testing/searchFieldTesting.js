// This document containts the function console.log() to test if the search field works properly when accessing the movieDB API (go to the storeInput() funtion)
var popularitydata = [];
var ratingdata = [];
var posters = [];
var overviews = [];

var movies;
// When the page is loaded
window.onload = function()
{
  sendRequest();
}

function sendRequest()
{
  // Create XMLHttpRequest object
  var req = new XMLHttpRequest();
  // Specify the requested URI
  var url = "https://api.themoviedb.org/3/movie/popular?api_key=434bbea1c356b703dc190a5f18459511&language=en-US&page=1";
  req.open("GET", url, true);
  // Set up callback function
  req.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      handleResponse(this);
    }
  }
  // Send the request
  req.send();

}

function handleResponse(data)
{
  console.log(data.responseText);
  // Parse the JSON data
  movies = JSON.parse(data.responseText);
  // Specify the location and the used settings for the graph
  var chart = new CanvasJS.Chart("multipleAxesGraph", graphSettings);

  // Scan the original  data
  for (var i = 0; i < 10; i++)
  {
    // Specify the path of the posters
    var pathPosters = "https://image.tmdb.org/t/p/w500" + movies.results[i].poster_path;
    // Specify the image tags for each poster
    var displayPosters = "<img src=" + pathPosters + " height=\"200\">";
    // Create a new datapoint for popularity, poster for each movie and display a pop up when it is clicked
    var popularityMovies =
    {
      label: movies.results[i].title,
      y: parseFloat(movies.results[i].popularity),
      name: displayPosters,
      toolTipContent: "{name} <br><strong>{legendText}</strong>: {y}",
      click: popup
    };
    // Create a new datapoint for rating, poster for each movie and display a pop up when it is clicked
    var moviesRating =
    {
      y: parseFloat(movies.results[i].vote_average),
      toolTipContent: "<strong>{legendText}</strong>: {y}",
      click: popup
    };

    // Add the datapoints to two different arrays
    popularitydata.push(popularityMovies);
    ratingdata.push(moviesRating);
    // Add the path of the posters to an array
    posters.push(pathPosters);
    // Add the overviews to an array
    overviews.push(movies.results[i].overview);
  }
  // Render the chart
  chart.render();
}

function storeInput()
{
   // Store the user input and change the value to lower case
   var input = document.getElementById('userInput').value.toLowerCase();
   var requestedMovie;
   var chart;
  // Scan the original data
   for (var i = 0; i < movies.results.length; i++)
   {
     // if the user input is written in lowercase
     if (input == movies.results[i].title.toLowerCase())
     {
        requestedMovie = movies.results[i];
        var pathPosters = "https://image.tmdb.org/t/p/w500" + requestedMovie.poster_path;
        var displayPosters = "<img src=" + pathPosters + " height=\"200\">";
        // Store the settings of the new graph
        var newGraphSettings = graphSettings;
        // Set the title of the graph
        newGraphSettings.title.text = requestedMovie.title + " Stats";
        // Add the datapoints for the popularity, poster and tooltip of each movie
        newGraphSettings.data[0].dataPoints = [{
          label: requestedMovie.title,
          y: parseFloat(requestedMovie.popularity),
          name: displayPosters,
          toolTipContent: "{name} <br><strong>{legendText}</strong>: {y}",
          // Display the specified information in a pop up
          click: function(e)
          {
            $('#movieInfo').modal('toggle');
            document.getElementById('moviesTitle').innerHTML = requestedMovie.title;
            document.getElementById('imagePop').src = pathPosters;
            document.getElementById('modalBody').innerHTML = requestedMovie.overview;
          }
        }];
        // Add the datapoints for the rating and tooltip of each movie
        newGraphSettings.data[1].dataPoints = [{
          y: parseFloat(requestedMovie.vote_average),
          toolTipContent: "<strong>{legendText}</strong>: {y}",
          // Display the specified information in a pop up
          click: function(e)
          {
            $('#movieInfo').modal('toggle');
            document.getElementById('moviesTitle').innerHTML = requestedMovie.title;
            document.getElementById('imagePop').src = pathPosters;
            document.getElementById('modalBody').innerHTML = requestedMovie.overview;
          }
        }];
        // Specify the location and the used settings for the second graph
        chart = new CanvasJS.Chart("inputGraph", newGraphSettings);
        chart.render();
        return;
     }
   }
   //document.getElementById('movieNotFound').innerHTML = "This movie is not on the top 20";
   console.log("not found");
}
// Display the specified information in a pop up
function popup(e)
{
  $('#movieInfo').modal('toggle');
  console.log(e);
  // Store the id of each movie
  var index = e.dataPointIndex;
  document.getElementById('moviesTitle').innerHTML = popularitydata[index].label;
  document.getElementById('imagePop').src = posters[index];
  document.getElementById('modalBody').innerHTML = overviews[index];
}
