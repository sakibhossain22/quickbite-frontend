import { useContext } from 'react';
import { IoStatsChart, IoAddCircle, IoAirplane  } from "react-icons/io5";
import { NavLink, Outlet } from 'react-router-dom';
import { FaArrowUp, FaCartArrowDown, FaHome, FaPenAlt, FaShoppingCart, FaTasks } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import DashboardNav from './DashBoardNav/DashBoardNav';

const Dashboard = () => {
  const { user } = useContext(AuthContext)



  return (
    <div>
      <div className='hidden lg:block'>
        <div className='grid grid-cols-12 mr-2'>
          <div className='col-span-3 h-screen '>
            <div className="fixed bg-[#be9a0b] h-screen">
              <div className="mx-10 text-white">
                <div className="w-full flex gap-4 items-center  text-center font-bold my-5">
                  <img className='rounded-full w-10' src={'https://i.ibb.co/fGmBVTV/logo.jpg'} alt="" />
                  <h1 className="text-xl text-white">Quick Bite</h1>
                </div>

                <div className="flex flex-col gap-5">

                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/home'>
                    <div className='flex items-center gap-3'>
                      <IoAddCircle className="text-2xl"></IoAddCircle>
                      <span className="text-xl">Statistics</span>
                    </div>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/add-food-item'>
                    <div className='flex items-center gap-3'>
                      <IoAddCircle className="text-2xl"></IoAddCircle>
                      <span className="text-xl">Add Product</span>
                    </div>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/my-added-food-items'>
                    <div className='flex items-center gap-3'>
                      <IoAirplane className="text-2xl"></IoAirplane>
                      <span className="text-xl">My Product</span>
                    </div>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/my-order'>
                    <div className='flex items-center gap-3'>
                      <FaCartArrowDown className="text-2xl"></FaCartArrowDown>
                      <span className="text-xl">My Order</span>
                    </div>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/'>
                    <div className='flex items-center gap-3'>
                      <FaHome className="text-2xl"></FaHome>
                      <span className="text-xl">Home</span>
                    </div>
                  </NavLink>
                </div>

              </div>
            </div>
          </div>
          <div className='col-span-9 mt-2'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div className='lg:hidden block'>
        <div>
          <DashboardNav></DashboardNav>
        </div>
        <div className='md:mx-5 mx-2'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
