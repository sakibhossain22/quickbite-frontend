import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";


const FoodDetails = () => {
    const [food, setFood] = useState([])
    const [foods, setTopOrder] = useState([])
    const params = useParams()
    console.log(food);

    // console.log(food);
    useEffect(() => {
        fetch(`https://quickbite-server.vercel.app/details/${params.id}`)
            .then(res => res.json())
            .then(data => {
              setFood(data);
            })
    }, [params.id])
    useEffect(() => {
        fetch(`https://quickbite-server.vercel.app/products`)
            .then(res => res.json())
            .then(data => {
                data?.sort((a, b) => b.orderCount - a.orderCount);
                const sortedFoodArray = [];
                for (const foodItem of data) {
                    sortedFoodArray.push(foodItem);
                }
                setTopOrder(sortedFoodArray);
            })
    }, [])

    return (
        <div>
            <Helmet>
                <title>QuickBite || Food Details</title>
            </Helmet>
            <div className="grid lg:grid-cols-12 mx-5 gap-10">
                <div className="lg:col-span-8">
                    <h1 className="text-center text-2xl my-2 font-bold">{food?.foodName}</h1>
                    <div>
                        <div className="w-full">
                            <img className="w-full rounded-lg lg:h-[620px]" src={food?.foodImage} alt="Food Image" />
                        </div>
                        <div className="w-full my-5 ">
                            <h1 className="text-3xl lg:text-5xl font-bold mb-2">{food?.foodName}</h1>
                            <h2 className="text-xl text-gray-600 mb-2"><span>Category : </span><span className="font-bold">{food?.foodCategory || 'Not Found'}</span></h2>
                            <p className="text-gray-700 mb-2"><span>Made By :</span> <span className="font-bold">{food?.madeBy || 'Not Found'}</span></p>
                            <p className="text-gray-700 mb-2"><span>Country : </span> <span className="font-bold">{food?.country || 'Not Found'}</span></p>
                            <p className="text-gray-700 mb-2"><span>Description : </span> <span className="font-bold">{food?.description || 'Not Found'}</span></p>
                            <p className="text-green-500 font-semibold text-xl mb-2"><span>Price : </span><span className="font-bold">$ {food?.price}</span></p>
                            <NavLink to={`/food-purchase/${food?._id}`}>
                                <button className="w-full text-white font-bold my-2 py-3 btn hover:text-black bg-[#FF5733]">Order</button>
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
                            <div key={food._id} className="bg-gray p-4 rounded-lg shadow-md hover:bg-green-200 ease-in-out transition items-center justify-center flex">
                                <div className="flex-1">
                                    <img className="w-14 h-14 object-cover mb-4 rounded-lg" src={food?.foodImage} alt={food?.foodName} />
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                    <h1 className="mt-2 font-semibold mb-2">{food?.foodName}</h1>
                                    <NavLink to={`/details/${food._id}`}>
                                        <button className="rounded bg-[#FF5733] text-white px-3 oy-2">
                                            Details
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;