import { useState, useEffect } from "react";
import { FilterIcon } from "lucide-react";

export default function Filters({ onSubmit }) {
  const [filterData, setFilterData] = useState({
    team: "",
    fromDate: "",
    toDate: "",
  });
  const [teams, setTeams] = useState([]);
  const apiUrl = import.meta.env.VITE_COLLECTION_ENDPOINT;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiUrl}/teams`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [apiUrl]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onSubmit(filterData);
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleFilterSubmit}>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 items-center">
        {/* Team Select */}
        <div className="relative">
          <div className="text-gray-500 block py-2">Team</div>
          <select
            name="team"
            value={filterData.team}
            onChange={handleFilterChange}
            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Teams</option>
            {teams.map((team) => (
              <option key={team.ID} value={team.ID}>
                {team.NAME}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="relative">
          <div className="text-gray-500 block py-2">From Date</div>
          <input
            type="date"
            name="fromDate"
            value={filterData.fromDate}
            onChange={handleFilterChange}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* To Date */}
        <div className="relative">
          <div className="text-gray-500 block py-2">To Date</div>
          <input
            type="date"
            name="toDate"
            value={filterData.toDate}
            onChange={handleFilterChange}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <div className="text-gray-500 block py-2">Apply</div>
          <button
            className="bg-white border border-gray-300 shadow-sm text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow-md transition duration-200"
            type="submit"
          >
            <div className="flex items-center justify-center">
              <FilterIcon size={20} />
              <p className="pl-1">Filter</p>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
