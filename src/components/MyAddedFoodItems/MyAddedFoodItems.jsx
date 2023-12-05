
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import nodata from '../../assets/nodata.json';
import Lottie from "lottie-react";
const MyAddedFoodItems = () => {
    const [foods, setFoods] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://quickbite-server.vercel.app/update/${user?.email}`, {withCredentials : true})
            .then(res => {
                setFoods(res.data)
            })
    }, [user?.email])



    return (
        <div>
            <Helmet>
                <title>QuickBite || My Added Food</title>
            </Helmet>
            <div>
                {
                    foods.length ? <div><h1 className="text-center font-bold text-3xl">My Added Food Item</h1>
                    <div className="h-1 w-24 mx-auto bg-[#FF5733]"></div></div> : ''
                }
            </div>
            <div>
                {
                    foods.length ?
                        <div className="grid lg:grid-cols-2 gap-10 my-5 mx-4d">
                            {foods.map((food) => (
                                <div key={food?._id}>
                                    <div className="bg-gray-200 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                                        <div className="lg:flex-1 md:flex-1">
                                            <img className="lg:w-24 md:w-24 md:h-24 lg:h-24 object-cover mb-4 rounded-lg" src={food?.foodImage} alt={food?.foodName} />
                                        </div>
                                        <div className="flex items-center justify-center gap-5 lg:gap-10">
                                            <h1 className="text-xl mx-2 font-semibold">{food?.foodName}</h1>
                                            <p className="text-[#FF5733] font-semibold">${food?.price}</p>
                                            <NavLink to={`/update/${food?._id}`}>
                                                <button className="bg-[#FF5733] hover:bg-orange-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-orange-300 transition duration-300 ease-in-out">
                                                    Update
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <div className="flex items-center justify-center">
                            <Lottie animationData={nodata}></Lottie>
                        </div>
                }
            </div>
        </div>
    );
};

export default MyAddedFoodItems;