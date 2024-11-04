import React from 'react';
import { Outlet } from 'react-router-dom';
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
                                <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
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