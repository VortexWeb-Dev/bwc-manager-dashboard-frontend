import { useState, useRef, useEffect } from "react";
import { ChevronDown, FilterIcon } from "lucide-react";

export default function Filters() {
  const [filterData, setFilterData] = useState({
    team: "",
    campaign: "",
    user: "",
    fromDate: "",
    toDate: ""

  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Log filter data whenever it changes
//   useEffect(() => {
//     if (filterData.campaign || filterData.fromDate || filterData.toDate) {
//       console.log("Filter Data:", filterData);
//     }
//   }, [filterData]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Filter Data:", filterData);
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleFilterSubmit}>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 items-center">
        {/* Campaign Select */}
        <div className="relative">
          <div className="text-gray-500 block py-2">Team</div>
          <select
            name="team"
            value={filterData.team}
            onChange={handleFilterChange}
            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Team</option>
            <option value="team1">team 1</option>
            <option value="team2">team 2</option>
            <option value="team3">team 3</option>
          </select>
        </div>
        <div className="relative">
          <div className="text-gray-500 block py-2">Campaign</div>
          <select
            name="campaign"
            value={filterData.campaign}
            onChange={handleFilterChange}
            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Campaign</option>
            <option value="campaign1">Campaign 1</option>
            <option value="campaign2">Campaign 2</option>
            <option value="campaign3">Campaign 3</option>
          </select>
        </div>
        <div className="relative">
          <div className="text-gray-500 block py-2">Campaign</div>
          <select
            name="user"
            value={filterData.user}
            onChange={handleFilterChange}
            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

          >
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
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

        <div className="relative">
          <div className="text-gray-500 block py-2"> Apply</div>
      <button className="bg-white border-2 text-gray-800 px-4 py-2 rounded-lg" type="submit">
        {/* <Filter size={20} /> */}
        <div className="flex items-center justify-center">
        <FilterIcon size={20} />
        <p className="pl-1">
            Filter
        </p>
        </div>
        </button>
        </div>
      </div>
    </form>
  );
}