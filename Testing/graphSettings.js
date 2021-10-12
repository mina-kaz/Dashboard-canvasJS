
var graphSettings = {
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
    fontColor: "black"
  },
  legend:
  {
    cursor: "pointer",
    fontColor: "#F3F3F3"
  },
  data:
  [
    {
      type: "column",
      name: "Popularity",
      legendText: "Popularity",
      color: "#89D097",
      cursor: "pointer",
      showInLegend: true,
      dataPoints: popularitydata
    },
    {
      type: "column",
      name: "Rating",
      legendText: "Rating",
      color: "#F8E9B9",
      cursor: "pointer",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: ratingdata
    }
  ]
};
