import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Function to handle closing the drawer when a NavLink is clicked
    const handleNavLinkClick = () => {
        setDrawerOpen(false);
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mx-5'>
                <div>
                    <div className="drawer">
                        <input 
                            id="my-drawer" 
                            type="checkbox" 
                            className="drawer-toggle" 
                            checked={drawerOpen} 
                            onChange={() => setDrawerOpen(!drawerOpen)} 
                        />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="cursor-pointer drawer-button">
                                <HiOutlineBars3 className='text-3xl'></HiOutlineBars3>
                            </label>
                            <div>
                                {/* Other content */}
                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={handleNavLinkClick}></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-48 lg:w-72 md:w-72 p-4">
                                {/* Sidebar content here */}
                                <div className='flex flex-col gap-5 text-lg justify-between'>
                                    <NavLink 
                                        to='/dashboard' 
                                        className={({ isActive }) =>
                                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                        }
                                        onClick={handleNavLinkClick}  // Close drawer on NavLink click
                                    >
                                        Statistic
                                    </NavLink>
                                    <NavLink 
                                        to='/dashboard/add-food-item' 
                                        className={({ isActive }) =>
                                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                        }
                                        onClick={handleNavLinkClick}  // Close drawer on NavLink click
                                    >
                                        Add Food
                                    </NavLink>
                                    <NavLink 
                                        to='/dashboard/update/:id' 
                                        className={({ isActive }) =>
                                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                        }
                                        onClick={handleNavLinkClick}  // Close drawer on NavLink click
                                    >
                                        Update Food
                                    </NavLink>
                                    <NavLink 
                                        to='/' 
                                        className={({ isActive }) =>
                                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                        }
                                        onClick={handleNavLinkClick}  // Close drawer on NavLink click
                                    >
                                        Added Food
                                    </NavLink>
                                    <NavLink 
                                        to='/dashboard/my-added-food-items' 
                                        className={({ isActive }) =>
                                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                        }
                                        onClick={handleNavLinkClick}  // Close drawer on NavLink click
                                    >
                                        Ordered Food
                                    </NavLink>
                                    <NavLink 
                                        to='/dashboard/my-order' 
                                        className={({ isActive }) =>
                                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                        }
                                        onClick={handleNavLinkClick}  // Close drawer on NavLink click
                                    >
                                        Home
                                    </NavLink>
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
