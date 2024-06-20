function fetchDataAndUpdateChart() {
  fetch('/get-barchart')
      .then(response => response.json())
      .then(apiData => {
          updateChart(apiData);
      })
      .catch(error => console.error('Error', error));
}

function updateChart(apiData) {
  am5.ready(function() {
      var root = am5.Root.new("bardiv");
      var chart = root.container.children.push(
          am5xy.XYChart.new(root, {
              panY: false,
              layout: root.verticalLayout
          })
      );

      // Create Y-Axis
      var yAxis = chart.yAxes.push(
          am5.ValueAxis.new(root, {
              renderer: am5.AxisRendererY.new(root, {})
          })
      );

      // Create X-Axis
      var xAxis = chart.xAxes.push(
          am5.CategoryAxis.new(root, {
              renderer: am5.AxisRendererX.new(root, {}),
              categoryField: "class"
          })
      );
      xAxis.data.setAll(apiData);

      // Create series
      var series = chart.series.push(
          am5.ColumnSeries.new(root, {
              name: "Series",
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: "value",
              categoryXField: "class"
          })
      );
      series.data.setAll(apiData);

      // Add legend
      var legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchDataAndUpdateChart();
});