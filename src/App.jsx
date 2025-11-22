import React from 'react'

import { useLocation,Routes,Route } from 'react-router-dom';
import Footer from '../Component/Footer';
import AllRooms from '../Pages/AllRooms';
import Layout from '../Pages/hotelOwner/Layout';
import Dashboard from '../Pages/hotelOwner/Dashboard';
import AddRoom from '../Pages/hotelOwner/AddRoom';
import ListRoom from '../Pages/hotelOwner/ListRoom';
import Navbar from '../Component/Navbar';
import Home from '../Pages/Home';
import RoomDetails from '../Pages/RoomDetails';
import MyBookings from '../Pages/MyBookings';
import HotelReg from '../Component/HotelReg';
import Experience from '../Component/Experience';

const App = () => {
  const isOwnerPath=useLocation().pathname.includes('owner');
  return (
    <div>
       { !isOwnerPath && <Navbar />}
       {false && <HotelReg /> }
       <div className='min-h-[70vh]'>
        <Routes >
          <Route path="/" element={<Home />}/>
          <Route path="/rooms" element={<AllRooms />}/>
           <Route path="/rooms/:id" element={<RoomDetails />} />
           <Route path="/my-bookings" element={<MyBookings />} />
           <Route path="/experience" element={<Experience />}/>
           <Route path="/owner" element={<Layout/>}>
              <Route index element={<Dashboard />} />
              <Route path='add-room' element={<AddRoom />} />
              <Route path='list-room' element={<ListRoom/>} />
           </Route>
        </Routes>
       </div>
      <Footer />
    </div>
     
  )
}

export default App;