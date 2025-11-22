import React from 'react'
import Navbar from '../../component/hotelOwner/Navbar'
import Sidebar from '../../component/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 pb-24">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
