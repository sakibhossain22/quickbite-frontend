import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";

const Dashboard = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mx-5'>
                <div>
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="cursor-pointer drawer-button">
                                <HiOutlineBars3 className='text-3xl'></HiOutlineBars3>
                            </label>
                            <div>

                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                {/* Sidebar content here */}
                                <div className='flex flex-col gap-5 text-lg justify-between'>
                                    <NavLink to='/dashboard' className={({ isActive }) =>
                                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                    }>Statistic</NavLink>
                                    <NavLink to='/dashboard/add-food-item' className={({ isActive }) =>
                                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                    }>Add Food</NavLink>
                                    <NavLink to='/' className={({ isActive }) =>
                                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                    }>Update Food</NavLink>
                                    <NavLink to='/' className={({ isActive }) =>
                                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                    }>Added Food</NavLink>
                                    <NavLink to='/dashboard/my-added-food-items' className={({ isActive }) =>
                                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                    }>Ordered Food</NavLink>
                                    <NavLink to='/dashboard/my-order' className={({ isActive }) =>
                                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                    }>Home</NavLink>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;