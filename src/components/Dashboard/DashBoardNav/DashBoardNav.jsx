import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const DashboardNav = () => {
    const { user, logOut } = useContext(AuthContext)

    const navLink = <>
        <NavLink to='/dashboard/home'>Statistics</NavLink>
        <NavLink to='/dashboard/add-food-item'>Add Task</NavLink>
        <NavLink to='/dashboard/my-order'>All Task</NavLink>
        <NavLink to='/dashboard/my-added-food-items'>All Task</NavLink>
        <NavLink to='/'>Home</NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-[#f1c40f] text-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Quick Bite</a>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <div className="flex items-center justify-center gap-5">
                            {navLink}
                            {
                                user && <button onClick={() => logOut()} className="bg-[#a4850a] px-6 py-2 rounded text-white">Log Out</button>
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;