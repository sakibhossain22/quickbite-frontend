import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet";
import nodata from '../../assets/nodata.json'
import Lottie from "lottie-react";
const MyOrder = () => {
    const [foods, setFoods] = useState([])
    const { user,  } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://quickbite-server.vercel.app/cart/${user?.email}`, {withCredentials : true})
            .then(res => {
                setFoods(res.data)
            })
    }, [user?.email])
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://quickbite-server.vercel.app/cart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    const filteredData = foods.filter(food => food?._id !== id)
                    setFoods(filteredData);
            }
        });

    }
    return (
        <div>
            <Helmet>
                <title>QuickBite || My Order</title>
            </Helmet>
            <div>
                {
                    foods?.length ? <div>
                        <h1 className="text-center font-bold text-3xl">Ordered Food Item</h1>
                        <div className="h-1 w-24 mx-auto bg-[#FF5733]"></div>
                        <div className="grid lg:grid-cols-2 lg:gap-10 my-5 mx-3">
                            {foods.map((food) => (
                                <div key={food?._id} className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                                    <div className="lg:flex-1 md:flex-1">
                                        <img className="lg:w-24 md:w-24 md:h-24 lg:h-24 object-cover mb-4 rounded-lg" src={food?.foodImage} alt={food?.foodName} />
                                    </div>
                                    <div className="flex items-center justify-center gap-5 lg:gap-10">
                                        <h1 className="lg:text-xl md:text-2xl mx-2 font-semibold mb-2">{food?.foodName}</h1>
                                        <p className="text-[#FF5733] font-semibold mb-2">${food?.price}</p>
                                        <p className="text-[#FF5733] font-semibold mb-2">{food?.date}</p>
                                        <NavLink onClick={() => handleDelete(food?._id)}>
                                            <button className="bg-[#FF5733] hover:bg-orange-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-orange-300 transition duration-300 ease-in-out">
                                                Delete
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> : <div>
                        <div className="flex h-screen items-center justify-center">
                            <Lottie animationData={nodata}></Lottie>
                        </div>
                    </div>

                }
            </div>
        </div>
    );
};

export default MyOrder;