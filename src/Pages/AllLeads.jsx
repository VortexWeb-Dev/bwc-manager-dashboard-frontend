import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TabbedReport = ({ tabName }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("allLeads");

  // Form state for filters (team, fromDate, toDate)
  const [formData, setFormData] = useState({
    team: "",
    fromDate: "",
    toDate: "",
  });

  // Teams list
  const [teams, setTeams] = useState([]);

  // Leads data state and loading state
  const [leadsData, setLeadsData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const apiUrl = import.meta.env.VITE_COLLECTION_ENDPOINT;

  // Mapping from tab id to the API's status key
  const tabMapping = {
    allLeads: "allocated",
    dealClosed: "closed",
    meetingBooked: "meeting_booked",
    meetingDone: "meeting_done",
    sendMessage: "send_message",
    invalidNumber: "invalid_number",
    neverAnswered: "never_answered",
    callBack: "call_back",
  };

  // Fetch teams from API
  const fetchTeams = async () => {
    try {
      const response = await fetch(`${apiUrl}/teams`);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Fetch leads from API with optional filters
  const fetchLeads = async (filters = {}) => {
    setLoading(true);
    try {
      let url = `${apiUrl}/leads`;
      const params = new URLSearchParams();
      if (filters.team) {
        params.append("team", filters.team);
      }
      if (filters.fromDate) {
        params.append("datefrom", filters.fromDate);
      }
      if (filters.toDate) {
        params.append("dateto", filters.toDate);
      }
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      console.log("Fetching leads from:", url);

      const response = await fetch(url);
      const data = await response.json();
      setLeadsData(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // On mount, fetch teams and initial leads (with no filters)
  useEffect(() => {
    fetchTeams();
    fetchLeads();
  }, []);

  // Handle filter form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle filter form submit – fetch leads with filters
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset pagination on filter submit
    fetchLeads(formData);
  };

  // Handle form reset – clear filters and fetch all leads
  const handleReset = () => {
    setFormData({
      team: "",
      fromDate: "",
      toDate: "",
    });
    setCurrentPage(1);
    fetchLeads();
  };

  // Helper to compute count of leads for a given status key
  const computeTabCount = (statusKey) => {
    let count = 0;
    if (leadsData && leadsData.user_lead_details) {
      Object.values(leadsData.user_lead_details).forEach((user) => {
        if (user[statusKey] && Array.isArray(user[statusKey])) {
          count += user[statusKey].length;
        }
      });
    }
    return count;
  };

  const tabs = [
    { id: "allLeads", label: "All Leads", count: computeTabCount("allocated") },
    {
      id: "dealClosed",
      label: "Deal Closed",
      count: computeTabCount("closed"),
    },
    {
      id: "meetingBooked",
      label: "Meeting Booked",
      count: computeTabCount("meeting_booked"),
    },
    {
      id: "meetingDone",
      label: "Meeting Done",
      count: computeTabCount("meeting_done"),
    },
    {
      id: "sendMessage",
      label: "Send Message",
      count: computeTabCount("send_message"),
    },
    {
      id: "invalidNumber",
      label: "Invalid Number",
      count: computeTabCount("invalid_number"),
    },
    {
      id: "neverAnswered",
      label: "Never Answered",
      count: computeTabCount("never_answered"),
    },
    { id: "callBack", label: "Call Back", count: computeTabCount("call_back") },
  ];

  // Get all leads for the active tab from the fetched leadsData
  const getActiveTabLeads = () => {
    let allLeads = [];
    if (leadsData && leadsData.user_lead_details) {
      const statusKey = tabMapping[activeTab];
      Object.values(leadsData.user_lead_details).forEach((user) => {
        if (user[statusKey] && Array.isArray(user[statusKey])) {
          allLeads = allLeads.concat(user[statusKey]);
        }
      });
    }
    return allLeads;
  };

  const activeLeads = getActiveTabLeads();

  // Pagination calculations
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const indexOfLast = currentPage * itemsPerPage;
  const currentLeads = activeLeads.slice(indexOfFirst, indexOfLast);

  // Handlers for pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLast < activeLeads.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle tab click: update active tab and navigate accordingly
  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(
      `/allleads?tabName=${tab.label.toLowerCase().replace(/\s+/g, "_")}`
    );
    setCurrentPage(1);
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl">
        {tabName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Filters Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Team Filter */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Team</label>
          <select
            name="team"
            value={formData.team}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">--All Teams--</option>
            {teams.map((team) => (
              <option key={team.ID} value={team.ID}>
                {team.NAME}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* To Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">To Date</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mt-4">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status ID</th>
              <th className="p-3 text-left">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  Loading...
                </td>
              </tr>
            ) : currentLeads.length > 0 ? (
              currentLeads.map((lead) => (
                <tr key={lead.ID} className="border-b">
                  <td className="p-3">{lead.TITLE || "N/A"}</td>
                  <td className="p-3">
                    {lead.DATE_CREATE
                      ? new Date(lead.DATE_CREATE).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-3">{lead.NAME || "N/A"}</td>
                  <td className="p-3">{lead.STATUS_ID || "N/A"}</td>
                  <td className="p-3">
                    {lead.PHONE && lead.PHONE.length > 0 && lead.PHONE[0].VALUE
                      ? lead.PHONE[0].VALUE
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No leads available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span>
            {indexOfFirst + 1} - {Math.min(indexOfLast, activeLeads.length)} of{" "}
            {activeLeads.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextPage}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedReport;
