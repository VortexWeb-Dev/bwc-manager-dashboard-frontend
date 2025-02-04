import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = ({ title, data, colors, onClickSegment, size }) => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "#e8fafc",
      borderRadius: 30,
      height: 400, // Adjust height for legend spacing
    },
    title: {
      text: title || "No Name",
      style: { fontSize: "18px", fontWeight: "bold" },
    
    },

    legend: {
      enabled: true,
      layout: "horizontal", // Ensures legends appear below the chart
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: true, // ✅ Ensures legends are shown
      },
    },
    series: [
      {
        name: "Response",
        colorByPoint: true,
        // data: [
        //   { name: "No Answer", y: 50, color: "#42A5F5" },
        //   { name: "Not Interested", y: 30, color: "#5E35B1" },
        //   { name: "Interested", y: 15, color: "#00C853" },
        //   { name: "Allocated", y: 5, color: "#FF5722" },
        // ],
        data: data
      },
    ],
  };
  
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
