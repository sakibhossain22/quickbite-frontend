
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
    const [topOrder, setTopOrder] = useState([])
    const [allfoods, setAllFoods] = useState(topOrder)
    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => setAllFoods(data))
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/update/${user?.email}`, { withCredentials: true })
            .then(res => {
                setFoods(res.data)
            })
    }, [user?.email])
    useEffect(() => {
        allfoods?.sort((a, b) => b.orderCount - a.orderCount);
        const sortedFoodArray = [];
        for (const foodItem of foods) {
            sortedFoodArray.push(foodItem);
        }
        setTopOrder(sortedFoodArray);
    }, [foods])


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
                                    <div className="border border-gray-500 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
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
            <div>
                <div>
                    <h1 className="lg:text-2xl border-l-2 border-[#FF5733] pl-2 mx-5 text-xl md:text-xl font-bold text-[rgb(26, 47, 51)]">Top Order</h1>
                </div>
                {
                    foods.length ?
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                                {allfoods?.slice(0, 3).map((food) => (
                                    <div key={food._id} className=" border border-gray-600 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                        <img className="w-full h-48 object-cover mb-4 rounded-lg" src={food?.foodImage} alt={food?.foodName} />
                                        <h1 className="text-xl font-semibold mb-2">{food?.foodName}</h1>
                                        <h2 className="text-gray-500 mb-2">{food?.foodCategory || 'not found'}</h2>
                                        <p className="text-[#FF5733] font-semibold mb-2">${food?.price.toFixed(2)}</p>
                                        <p className="text-[#FF5733] font-semibold mb-2">Order : {food?.orderCount}</p>
                                        <p className="text-[#FF5733] font-semibold mb-2">Quantity : {food?.quantity}</p>
                                        <NavLink to={`/details/${food._id}`}>
                                            <button className="bg-[#FF5733] w-full hover:bg-orange-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-orange-300 transition duration-300 ease-in-out">
                                                Details
                                            </button>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>

                        </div>
                        : <div className="flex items-center justify-center">
                            <img src="https://i.ibb.co/61Z0WZ5/giphy.gif" alt="" />
                        </div>
                }

            </div>
        </div>
    );
};

export default MyAddedFoodItems;