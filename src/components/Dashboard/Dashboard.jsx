import React, { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";
import { AuthContext } from '../AuthProvider/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [drawerOpen, setDrawerOpen] = useState(false);
    console.log(user);
    // Function to handle closing the drawer when a NavLink is clicked
    const handleNavLinkClick = () => {
        setDrawerOpen(false);
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='lg:hidden md:hidden'>
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
            {/* Dashboard for Large Device */}
            <div className='hidden lg:block'>
                <div className='grid gap-2 grid-cols-12'>
                    <div className='col-span-2 bg-orange-400 h-screen'>
                        <div>
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
                        </div>
                    </div>
                    <div className='col-span-10 my-2'>
                        <div>
                            <nav>
                                <div className='flex gap-5 mx-4 items-center justify-between'>
                                    <label className="input flex flex-1 items-center mt-2 gap-2">
                                        <input type="text" className="grow rounded px-2 py-4" placeholder="Search . . . . ." />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </label>
                                    <div>
                                        <div className='flex items-center gap-3'>
                                            <img className='w-10 rounded-full' src={user?.photoURL} alt="" />
                                            <h1 className='text-lg'>{user?.displayName}</h1>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
