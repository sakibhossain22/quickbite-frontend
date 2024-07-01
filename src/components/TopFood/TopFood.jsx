import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';

const TopFood = () => {
    const [topOrder, setTopOrder] = useState([])
    const [foods, setFoods] = useState(topOrder)

    // Sort Top Order
    useEffect(() => {
        foods?.sort((a, b) => b.orderCount - a.orderCount);
        const sortedFoodArray = [];
        for (const foodItem of foods) {
            sortedFoodArray.push(foodItem);
        }
        setTopOrder(sortedFoodArray);
    }, [foods])
    useEffect(() => {
        fetch(`https://quickbite-server.vercel.app/products`)
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [])


    return (
        <div>
            <div className="text-center">
                <div className="h-1 w-10 mx-auto bg-[#FF5733]"></div>
                <h1 className="text-xl text-[rgb(26, 47, 51)]">Features</h1>
                <h1 className="lg:text-5xl text-3xl md:text-4xl font-bold text-[rgb(26, 47, 51)]">Top Food Section</h1>
            </div>
            {
                foods.length ?  <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                 <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                        {foods?.slice(0, 6).map((food) => (
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
                    <div className="w-full flex justify-center items-center">
                        <NavLink to="/all-food-items" className="text-center bg-[#FF5733] text-white font-bold py-2 px-5 btn mt-4 transition duration-300 ease-in-out">
                            See All
                        </NavLink>
                    </div>
                </div>
              </motion.div> : <div className="flex items-center justify-center">
                    <img src="https://i.ibb.co/61Z0WZ5/giphy.gif" alt="" />
                </div>
            }

        </div>
    );
};

export default TopFood;