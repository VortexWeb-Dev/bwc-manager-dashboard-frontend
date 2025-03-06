import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";

const MultiPieChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const transformData = () => {
      // Transform the data into the format expected by PieChart
      const transformedData = Object.values(data).map((agent) => ({
        title: agent.name,
        data: [
          { name: "Allocated", y: agent.allocated },
          { name: "Not Interested", y: agent.not_interested },
          { name: "Closed", y: agent.closed },
          { name: "Meeting Booked", y: agent.meeting_booked },
          { name: "Meeting Done", y: agent.meeting_done },
          { name: "No Answer", y: agent.no_answer },
          { name: "Invalid Number", y: agent.invalid_number },
          { name: "Never Answered", y: agent.never_answered },
          { name: "Call Back", y: agent.call_back },
        ],
        colors: [
          "#ff6384",
          "#ffce56",
          "#4caf50",
          "#f44336",
          "#9c27b0",
          "#00bcd4",
          "#8bc34a",
          "#e91e63",
          "#3f51b5",
        ],
      }));

      setChartData(transformedData);
    };

    transformData();
  }, [data]);

  const handleSegmentClick = (point) => {
    alert(`Clicked on ${point.name}: ${point.y}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-6">
      {chartData.map((chart, index) => (
        <div key={index} className=" shadow-lg rounded-2xl p-1 m-2">
          <PieChart
            title={chart.title}
            data={chart.data}
            colors={chart.colors}
            onClickSegment={handleSegmentClick}
            size={300} // Adjust size dynamically
          />
        </div>
      ))}
    </div>
  );
};

export default MultiPieChart;
