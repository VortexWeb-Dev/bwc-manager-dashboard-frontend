import React, { useState, useRef, useEffect } from "react";
import { Bell, Info } from "lucide-react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Lead",
      content: "From Mahaveer Chand Mehta against campaign EMAAR Properties.",
      time: "30-Jan-2025 08:32 AM",
    },
    {
      id: 2,
      title: "New Lead",
      content: "From Shafique Uddin against campaign Danube Properties.",
      time: "30-Jan-2025 03:34 AM",
    },
    {
      id: 3,
      title: "New Lead",
      content: "From Muhammad Rehan Khan against campaign EMAAR Properties.",
      time: "30-Jan-2025 12:12 AM",
    },
    {
      id: 4,
      title: "New Lead",
      content: "From Muhammad Rehan Khan against campaign EMAAR Properties.",
      time: "30-Jan-2025 12:12 AM",
    },
    {
      id: 5,
      title: "New Lead",
      content: "From Muhammad Rehan Khan against campaign EMAAR Properties.",
      time: "30-Jan-2025 12:12 AM",
    },
    {
      id: 6,
      title: "New Lead",
      content: "From Muhammad Rehan Khan against campaign EMAAR Properties.",
      time: "30-Jan-2025 12:12 AM",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Bell Icon with Notification Badge */}
      <div className="relative cursor-pointer mx-4" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={24} className="text-gray-800" />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-10 w-80 bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto z-50">
          <h3 className="font-bold text-lg border-b pb-2">You have {notifications.length} new Notifications</h3>
          {notifications.map((notification) => (
            <div key={notification.id} className="flex  gap-2">
            <div className="py-3"><Info size={24} className="text-gray-800" /></div>
            <div key={notification.id} className="p-2 border-b last:border-none hover:bg-gray-600 hover:text-white">
              <div className="text-sm text-gray-600 hover:text-white font-bold">{notification.title} <br /> 
              <p className="font-medium hover:text-white">{notification.content}</p>
              <p className="text-xs text-gray-400">
              {notification.time}
              </p>
            </div>
              {/* <p className="text-xs text-gray-400">{notification.time}</p> */}
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
