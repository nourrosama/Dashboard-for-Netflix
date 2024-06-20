function fetchDataAndUpdateChart() {
    fetch ('/get-piechart')
        .then(response => response.json())
        .then(data_df => {
            updateChart(data_df);
        })
        .catch(error => console.error('Error', error));
}

function updateChart(data_df){
    am5.ready(function() {
        var root = am5.Root.new("piediv");
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push( 
        am5percent.PieChart.new(root, {
            layout: root.verticalHorizontal
        }) 
        );


        // Create series
        var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "value",
            categoryField: "class"
        })
        );


        series.get("colors").set("colors", [
            am5.color(0xd0312d),
            am5.color(0x990f02),
            am5.color(0x742811),
            am5.color(0x680c07),
            am5.color(0xbe4d4d),
            am5.color(0xaf6c8f),
            am5.color(0xf6b26b),
            am5.color(0xe8645f),
            am5.color(0xa48d8d)
          ]);

        series.data.setAll(data_df);

        // // Add legend
        // var legend = chart.children.push(am5.Legend.new(root, {
        // centerX: am5.percent(100),
        // x: am5.percent(100),
        // layout: root.horizontalLayout
        // }));

        // legend.data.setAll(series.dataItems);
        // // legend.labels.template.set("fill", am5.color(0xfffff0));
    })

}

document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart();
});