// This document containts the function console.log() for testing and keeping track of the following variables

var popularitydata = [];
var ratingdata = [];
var posters = [];
var overviews = [];
window.onload = function()
{
var chart = new CanvasJS.Chart("multipleAxesGraph",
{
  animationEnabled: true,
  backgroundColor: "#292b2c",
  title:
  {
    text: "The Popular Movies on TDBM",
    fontColor: "#F3F3F3"
  },
  axisX:
  {
    labelFontColor: "#F3F3F3",
    labelAngle: 0
  },
  axisY:
  {
    title: "Popularity",
    titleFontColor: "#89D097",
    lineColor: "#89D097",
    labelFontColor: "#89D097",
    tickColor: "#89D097"
  },
  axisY2:
  {
    title: "Rating",
    titleFontColor: "#F8E9B9",
    lineColor: "#F8E9B9",
    labelFontColor: "#F8E9B9",
    tickColor: "#F8E9B9"
  },
  toolTip:
  {
    shared: true,
    fontColor: "red"
  },
  legend:
  {
    cursor: "pointer",
    fontColor: "#F3F3F3",
    itemclick: toggleDataSeries
  },
  data:
  [
    {
      type: "column",
      name: "Popularity",
      legendText: "Popularity",
      color: "#89D097",
      showInLegend: true,
      dataPoints: popularitydata
    },
    {
      type: "column",
      name: "Rating",
      legendText: "Rating",
      color: "#F8E9B9",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: ratingdata
    }
  ]
});

// Scan the original  data
for (var i = 0; i < 10; i++)
{
  console.log(movies);
  var pathPosters = "https://image.tmdb.org/t/p/w500" + movies.results[i].poster_path;
  var displayPosters = "<img src=" + pathPosters + " height=\"200\">";
  // Create a  new datapoint
  var popularityMovies =
  {
    label: movies.results[i].title,
    y: parseFloat(movies.results[i].popularity),
    toolTipContent:
    [
      displayPosters,
      "<br><strong>{legendText}</strong>: {y}"
    ],
    click: popup

  };
  var moviesRating =
  {
    label: movies.results[i].title,
    y: parseFloat(movies.results[i].vote_average),
    toolTipContent: "<strong>{legendText}</strong>: {y}",
    click: popup
  };

  // Add to data points array
  popularitydata.push(popularityMovies);
  ratingdata.push(moviesRating);
  posters.push(pathPosters);
  overviews.push(movies.results[i].overview);

}
console.log(posters);
console.log(popularitydata);
// Render the chart
chart.render();

function toggleDataSeries(e)
{
  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible)
  {
    e.dataSeries.visible = false;
  } else
  {
    e.dataSeries.visible = true;
  }
  chart.render();
}

function popup(e)
{
  $('#movieInfo').modal('toggle');
  var index = e.dataPointIndex;
  document.getElementById('moviesTitle').innerHTML = popularitydata[index].label;
  document.getElementById('imagePop').src = posters[index];
  document.getElementById('modalBody').innerHTML = overviews[index];

  console.log(index);
  console.log(posters[index]);
}


}
