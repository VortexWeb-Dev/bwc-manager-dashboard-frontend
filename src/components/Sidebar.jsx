// import React, { useState } from 'react';
// import { LayoutDashboard, Calendar, Users } from 'lucide-react';

// const Sidebar = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const menuItems = [
//     { 
//       id: 'dashboard', 
//       title: 'Agent Dashboard', 
//       icon: LayoutDashboard 
//     },
//     { 
//       id: 'availability', 
//       title: 'My Availability', 
//       icon: Calendar 
//     },
//     { 
//       id: 'leads', 
//       title: 'Agent Leads', 
//       icon: Users 
//     }
//   ];

//   return (
//     <aside className="sticky top-0 left-0 bottom-0 h-screen w-64  min-h-screen bg-gray-800 text-white">
//       <div className="p-6 border-b border-gray-700">
//         <div className="text-xl font-bold mb-1">BWC CRM</div>
//         <div className="text-sm text-gray-400">Sami Ullah</div>
//         <div className="text-xs text-gray-500">AGENT</div>
//       </div>

//       <nav className="mt-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeTab === item.id;
          
//           return (
//             <a
//               key={item.id}
//               href="#"
//               onClick={() => setActiveTab(item.id)}
//               className={`
//                 flex items-center px-6 py-3 
//                 transition-colors duration-200
//                 ${isActive 
//                   ? 'bg-gray-300 text-gray-800' 
//                   : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                 }
//               `}
//             >
//               <Icon 
//                 size={20} 
//                 className={`mr-3 ${isActive ? 'text-gray-800' : 'text-gray-300'}`}
//               />
//               <span>{item.title}</span>
//             </a>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, Menu, X, Files, List, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 'dashboard', 
      title: 'Office Dashboard', 
      icon: LayoutDashboard 
    },
    // { 
    //   id: 'setup', 
    //   title: 'Setup', 
    //   icon: Wrench
    // },
    // { 
    //   id: 'user', 
    //   title: 'User', 
    //   icon: Users 
    // },
    { 
      id: 'leads', 
      title: 'Lead List', 
      icon: List 
    },
    // { 
    //   id: 'reports', 
    //   title: 'Reports', 
    //   icon: Files 
    // },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger button - only visible below md breakpoint */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[999] p-2 rounded-lg bg-gray-800 text-white md:hidden"
      >
        {isOpen ? <X size={24} z={20}/> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile - only visible when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 
        h-screen w-64 min-h-screen 
        bg-gray-800 text-white 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-700">
          <div className="text-xl font-bold mb-1 mt-8">CRM</div>
          <div className="text-xl text-gray-400">Manager BwC</div>
          <div className="text-xl font-bold text-gray-500">MANAGER</div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <a
                key={item.id}
                href="#"
                onClick={() => {
                  setActiveTab(item.id);
                  if(item.id === 'dashboard'){
                    navigate('/home');
                  }

                  if(item.id === 'leads'){
                    navigate('/allleads?tabName=all_leads');  
                  }

                  // if(item.id === 'setup'){
                  //   navigate('/setup');
                  // }

                  if(item.id === 'user'){
                    navigate('/user');
                  }


                  if (window.innerWidth < 768) { // Close sidebar on mobile after selection
                    setIsOpen(false);
                  }
                }}
                className={`

                  flex items-center px-6 py-3 
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-gray-300 text-gray-800' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 ${isActive ? 'text-gray-800' : 'text-gray-300'}`}
                />
                <span>{item.title}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;