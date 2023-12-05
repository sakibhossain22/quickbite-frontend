import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result)
                axios.post(`https://quickbite-server.vercel.app/logout`,user?.email, {withCredentials : true})
                .then(res => {
                    console.log(res.data);
                })
            })
            .catch(err => {
                console.error(err.message)
            })
    }
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <img className="w-14 hidden lg:block" src="https://i.ibb.co/fGmBVTV/logo.jpg" alt="" />
                    <NavLink to='/'>
                        <button className="btn p-0  btn-ghost font-bold lg:text-xl uppercase">Quick <span className="text-[#FF5733]">Bite</span></button>
                    </NavLink>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2 lg:gap-4 font-bold">
                        <NavLink to='/' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-[#FF5733] animate-pulse" : ""
                        }>Home</NavLink>
                        <NavLink to='/all-food-items' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-[#FF5733] animate-pulse" : ""
                        }>All Food</NavLink>

                        <NavLink to='/blog' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-[#FF5733] animate-pulse" : ""
                        }>Blog</NavLink>

                        {
                            !user &&
                            <div className="flex items-center justify-center gap-2">
                                <NavLink to='/register' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                }>Register</NavLink>

                                <NavLink to='/login' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "underline text-[#FF5733] animate-pulse" : ""
                                }>Login</NavLink>
                            </div>
                        }

                    </div>
                    {
                        user ? <div className="flex items-center justify-center">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />

                                    </div>
                                </label>

                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                                    <NavLink to='/my-added-food-items' className="rounded-lg px-2 hover:bg-white py-2">My added food items</NavLink>
                                    <NavLink to='/add-food-item' className="rounded-lg px-2 hover:bg-white py-2">Add a food item</NavLink>
                                    <NavLink to='/my-order' className="rounded-lg px-2 hover:bg-white py-2">My ordered food items</NavLink>
                                    <button className="lg:hidden md:hidden py-2 px-3 rounded bg-[#FF5733] text-white" onClick={handleLogOut}>Log Out</button>

                                </ul>
                            </div>
                            <button className="hidden md:block lg:block py-2 px-3 rounded bg-[#FF5733] text-white" onClick={handleLogOut}>Log Out</button>
                        </div>

                            :
                            ''
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;