import { ContentCard } from "./Cards/Card";
import { useState, useEffect } from "react";
import MultiPieChart from "./PieCharts/MultiCharts";
import Filters from "./Filters/FiltersModule";

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_COLLECTION_ENDPOINT;
  const [aggregatedData, setAggregatedData] = useState({});
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryMapping = {
    allocated: {
      displayName: "Allocated",
      icon: "CheckCircle",
      color: "#FF5722",
    },
    not_interested: {
      displayName: "Not Interested",
      icon: "ThumbsDown",
      color: "#f44336",
    },
    closed: { displayName: "Deal Closed", icon: "Handshake", color: "#3F51B5" },
    meeting_booked: {
      displayName: "Meeting Booked",
      icon: "Calendar",
      color: "#FF9800",
    },
    meeting_done: {
      displayName: "Meeting Done",
      icon: "CheckSquare",
      color: "#9C27B0",
    },
    no_answer: { displayName: "No Answer", icon: "X", color: "#E91E63" },
    invalid_number: {
      displayName: "Invalid Number",
      icon: "AlertTriangle",
      color: "#795548",
    },
    never_answered: {
      displayName: "Never Answered",
      icon: "Phone",
      color: "#607D8B",
    },
    call_back: {
      displayName: "Call Back",
      icon: "RefreshCw",
      color: "#8BC34A",
    },
  };

  // Function to fetch data with provided filters
  const fetchData = async (filters = {}) => {
    setLoading(true);
    try {
      const { team, fromDate, toDate } = filters;
      const queryParams = new URLSearchParams();
      if (team) queryParams.append("team", team);
      if (fromDate) queryParams.append("datefrom", fromDate);
      if (toDate) queryParams.append("dateto", toDate);

      const response = await fetch(
        `${apiUrl}/agents?${queryParams.toString()}`
      );
      const data = await response.json();
      setRawData(data);

      // Aggregate sums for each category
      const sums = {};
      Object.values(data).forEach((entity) => {
        Object.entries(entity).forEach(([key, value]) => {
          if (key !== "name") {
            sums[key] = (sums[key] || 0) + value;
          }
        });
      });
      setAggregatedData(sums);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount with no filters
  useEffect(() => {
    fetchData();
  }, []);

  // Called when the user clicks the filter button
  const handleFilterSubmit = (filters) => {
    fetchData(filters);
  };

  return (
    <>
      <Filters onSubmit={handleFilterSubmit} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="shadow-lg rounded-2xl p-1 m-2">
              <div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <MultiPieChart data={rawData} />
      )}

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 bg-gray-200 animate-pulse rounded-lg"
                />
              ))
            : Object.entries(categoryMapping).map(([key, category]) => (
                <ContentCard
                  key={key}
                  icon={category.icon}
                  numberValue={aggregatedData[key] || 0}
                  contentName={category.displayName}
                  color={category.color}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
