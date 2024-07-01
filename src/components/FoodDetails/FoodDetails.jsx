import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const FoodDetails = () => {
    const [food, setFood] = useState({});
    const [foods, setTopOrder] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`https://quickbite-server.vercel.app/details/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setFood(data);
            });
    }, [params.id]);

    useEffect(() => {
        fetch(`https://quickbite-server.vercel.app/products`)
            .then(res => res.json())
            .then(data => {
                const sortedFoodArray = data.sort((a, b) => b.orderCount - a.orderCount);
                setTopOrder(sortedFoodArray);
            });
    }, []);

    return (
        <div>
            <Helmet>
                <title>QuickBite || Food Details</title>
            </Helmet>
            <div className="grid lg:grid-cols-12 mx-5 gap-10">
                <div className="lg:col-span-8">
                    <div>
                        <div className="w-full">
                            <img
                                className="rounded-lg w-full h-96 object-cover"
                                src={food?.foodImage}
                                alt="Food Image"
                            />
                        </div>
                        <div className="w-full my-5">
                            <h1 className="text-3xl lg:text-3xl font-bold mb-2 ">{food?.foodName}</h1>
                            <h2 className="text-xl mb-2">
                                <span>Category: </span>
                                <span className="font-bold">{food?.foodCategory || 'Not Found'}</span>
                            </h2>
                            <p className="mb-2">
                                <span>Made By: </span>
                                <span className="font-bold">{food?.madeBy || 'Not Found'}</span>
                            </p>
                            <p className="mb-2">
                                <span>Country: </span>
                                <span className="font-bold">{food?.country || 'Not Found'}</span>
                            </p>
                            <p className="mb-2">
                                <span>Description: </span>
                                <span className="font-bold">{food?.description || 'Not Found'}</span>
                            </p>
                            <p className="text-green-500 font-semibold text-xl mb-2">
                                <span>Price: </span>
                                <span className="font-bold">$ {food?.price}</span>
                            </p>
                            <NavLink to={`/food-purchase/${food?._id}`}>
                                <button className="w-full text-white font-bold my-2 py-3 rounded-lg bg-[#FF5733] hover:bg-[#FF7F50] transition duration-300 ease-in-out transform hover:scale-105">
                                    Order
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 hidden lg:block">
                    <h1 className="text-center text-xl font-bold">Top Order</h1>
                    <div className="h-1 w-10 mx-auto bg-[#FF5733] mb-3"></div>
                    <div>
                        {
                            !foods.length && <div className="h-screen flex items-center justify-center">
                                <span className="loading loading-bars loading-lg"></span>
                            </div>
                        }
                        {foods.slice(0, 6).map((food) => (
                            <div key={food._id} className="border border-gray-500 p-4 rounded-lg shadow-xl hover:scale-110 duration-300 ease-in-out transition flex items-center gap-4 mb-4">
                                <div className="flex-shrink-0">
                                    <img className="w-14 h-14 object-cover rounded-lg" src={food?.foodImage} alt={food?.foodName} />
                                </div>
                                <div className="flex-1">
                                    <h1 className="mt-2 font-semibold mb-2">{food?.foodName}</h1>
                                </div>
                                <NavLink to={`/details/${food._id}`}>
                                    <button className="rounded bg-[#FF5733] text-white px-3 py-2">
                                        Details
                                    </button>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
