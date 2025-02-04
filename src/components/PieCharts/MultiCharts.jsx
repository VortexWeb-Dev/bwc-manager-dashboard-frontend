// import React from "react";
// import PieChart from "./PieChart";

// const MultiPieChart = () => {
//   const chartData = [
//     {
//       title: "Revenue Distribution",
//       data: [
//         { name: "Product A", y: 45 },
//         { name: "Product B", y: 25 },
//         { name: "Product C", y: 30 },
//       ],
//       colors: ["#ff6384", "#36a2eb", "#ffce56"],
//     },
//     {
//       title: "Market Share",
//       data: [
//         { name: "Company X", y: 50 },
//         { name: "Company Y", y: 35 },
//         { name: "Company Z", y: 15 },
//       ],
//       colors: ["#4caf50", "#f44336", "#9c27b0"],
//     },
//     {
//       title: "Market Share",
//       data: [
//         { name: "Company X", y: 50 },
//         { name: "Company Y", y: 35 },
//         { name: "Company Z", y: 15 },
//       ],
//       colors: ["#4caf50", "#f44336", "#9c27b0"],
//     },
//     {
//       title: "Market Share",
//       data: [
//         { name: "Company X", y: 50 },
//         { name: "Company Y", y: 35 },
//         { name: "Company Z", y: 15 },
//       ],
//       colors: ["#4caf50", "#f44336", "#9c27b0"],
//     },
//     {
//       title: "Market Share",
//       data: [
//         { name: "Company X", y: 50 },
//         { name: "Company Y", y: 35 },
//         { name: "Company Z", y: 15 },
//       ],
//       colors: ["#4caf50", "#f44336", "#9c27b0"],
//     },
//     {
//       title: "Market Share",
//       data: [
//         { name: "Company X", y: 50 },
//         { name: "Company Y", y: 35 },
//         { name: "Company Z", y: 15 },
//       ],
//       colors: ["#4caf50", "#f44336", "#9c27b0"],
//     }
//   ];

//   const handleSegmentClick = (point) => {
//     alert(`Clicked on ${point.name}: ${point.y}`);
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-6">
//       {chartData.map((chart, index) => (
//         <div key={Math.random()} className="bg-blue-100 rounded-4xl p-1 m-2">
//         <PieChart
//           key={index}
//           title={chart.title}
//           data={chart.data}
//           colors={chart.colors}
//           onClickSegment={handleSegmentClick}
//           size={250} // Adjust size dynamically
//           />
//           </div>
//       ))}
//     </div>
//   );
// };

// export default MultiPieChart;


import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";

const MultiPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lightgray-kudu-834713.hostingersite.com/bwc/dashboard-backend/agents"
        );
        const data = await response.json();

        // Transform the data into the format expected by PieChart
        const transformedData = Object.values(data).map((agent) => ({
          title: agent.name,
          data: [
            { name: "Allocated", y: agent.allocated },
            { name: "Interested", y: agent.interested },
            { name: "Not Interested", y: agent.not_interested },
            { name: "Closed", y: agent.closed },
            { name: "Meeting Booked", y: agent.meeting_booked },
            { name: "Meeting Done", y: agent.meeting_done },
            { name: "Send Message", y: agent.send_message },
            { name: "No Answer", y: agent.no_answer },
            { name: "Invalid Number", y: agent.invalid_number },
            { name: "Never Answered", y: agent.never_answered },
            { name: "Call Back", y: agent.call_back },
            { name: "Late Follow-up", y: agent.late_followup },
            { name: "Today Follow-up", y: agent.today_followup },
            { name: "Future Follow-up", y: agent.future_followup },
          ],
          colors: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4caf50",
            "#f44336",
            "#9c27b0",
            "#ff9800",
            "#00bcd4",
            "#8bc34a",
            "#e91e63",
            "#3f51b5",
            "#009688",
            "#cddc39",
            "#795548",
          ],
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
