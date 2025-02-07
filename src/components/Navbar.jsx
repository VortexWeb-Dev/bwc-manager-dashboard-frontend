import React from 'react'
import { Bell, PowerIcon } from 'lucide-react'
import NotificationDropdown from './NotificationModule'
const Navbar = () => {
  return (
    <div className='w-full h-24 bg-gray-200 text-gray-600'>
      <div className='flex justify-between items-center py-7 px-6'>
        <div className='text-xl font-bold cursor-pointer pl-12'>CRM</div>
        {/* <div className='flex items-center gap-4'>
            <NotificationDropdown />
            <PowerIcon size={20} className='text-gray-800'/>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
