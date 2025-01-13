import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result);
                axios.post(`https://quickbite-server.vercel.app/logout`, { email: user?.email }, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    });
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    const handleThemeToggle = () => {
        const html = document.documentElement;
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
        }
    };

    return (
        <div className="bg-base-100 shadow-md">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="w-14 hidden lg:block" src="https://i.ibb.co/fGmBVTV/logo.jpg" alt="QuickBite Logo" />
                    <NavLink to='/' className="btn p-0 btn-ghost font-bold lg:text-xl uppercase">
                        Quick <span className="text-[#FF5733]">Bite</span>
                    </NavLink>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex cursor-pointer gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <input type="checkbox" className="toggle theme-controller" onChange={handleThemeToggle} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    </label>
                    <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                <div className={`lg:flex hidden bg-base-100 lg:bg-transparent lg:shadow-none shadow-md`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:p-0">
                        <NavLink to='/' className={({ isActive }) =>
                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                        }>Home</NavLink>
                        <NavLink to='/all-food-items' className={({ isActive }) =>
                            isActive ? "underline text-[#FF5733] animate-pulse" : ""
                        }>All Food</NavLink>
                        
                        {
                            user && <NavLink to='/dashboard' className={({ isActive }) =>
                                isActive ? "underline text-[#FF5733] animate-pulse" : ""
                            }>Dashboard</NavLink>
                        }
                        {!user && (
                            <>
                                <NavLink to='/register' className={({ isActive }) =>
                                    isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                }>Register</NavLink>
                                <NavLink to='/login' className={({ isActive }) =>
                                    isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                }>Login</NavLink>
                            </>
                        )}
                        {user && (
                            <div className="flex items-center gap-4">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt="User Avatar" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                                        <NavLink to='/my-added-food-items' className="rounded-lg px-2 hover:bg-white py-2">My added food items</NavLink>
                                        <NavLink to='/add-food-item' className="rounded-lg px-2 hover:bg-white py-2">Add a food item</NavLink>
                                        <NavLink to='/my-order' className="rounded-lg px-2 hover:bg-white py-2">My ordered food items</NavLink>
                                        <button className="lg:hidden md:hidden py-2 px-3 rounded bg-[#FF5733] text-white" onClick={handleLogOut}>Log Out</button>
                                    </ul>
                                </div>
                                <button className="hidden md:block lg:block py-2 px-3 rounded bg-[#FF5733] text-white" onClick={handleLogOut}>Log Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Small Device Link */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} text-right bg-base-100 lg:bg-transparent lg:shadow-none shadow-md`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:p-0">
                    <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)} to='/' className={({ isActive }) =>
                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                    }>Home</NavLink>
                    <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)} to='/all-food-items' className={({ isActive }) =>
                        isActive ? "underline text-[#FF5733] animate-pulse" : ""
                    }>All Food</NavLink>
                    {!user && (
                        <>
                            <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)} to='/register' className={({ isActive }) =>
                                isActive ? "underline text-[#FF5733] animate-pulse" : ""
                            }>Register</NavLink>
                            <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)} to='/login' className={({ isActive }) =>
                                isActive ? "underline text-[#FF5733] animate-pulse" : ""
                            }>Login</NavLink>
                        </>
                    )}
                    {user && (
                        <div className="flex items-center justify-end gap-4">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} alt="User Avatar" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                                    <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)}  to='/my-added-food-items' className="rounded-lg px-2 hover:bg-white py-2">My added food items</NavLink>
                                    <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)}  to='/add-food-item' className="rounded-lg px-2 hover:bg-white py-2">Add a food item</NavLink>
                                    <NavLink onClick={()=> setIsMenuOpen(!isMenuOpen)}  to='/my-order' className="rounded-lg px-2 hover:bg-white py-2">My ordered food items</NavLink>
                                    <button className="lg:hidden md:hidden py-2 px-3 rounded bg-[#FF5733] text-white" onClick={handleLogOut}>Log Out</button>
                                </ul>
                            </div>
                            <button className="hidden md:block lg:block py-2 px-3 rounded bg-[#FF5733] text-white" onClick={handleLogOut}>Log Out</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
