import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import nodata from "../../assets/nodata.json";
import { AuthContext } from "../AuthProvider/AuthProvider";

const FoodItem = ({ food, handleDelete }) => (
    <div key={food?._id} className="lg:p-4 mb-4 border border-gray-600 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
        <div className="lg:flex-1 md:flex-1">
            <img className="lg:w-24 md:w-24 md:h-24 lg:h-24 object-cover mb-4 rounded-lg" src={food?.foodImage} alt={food?.foodName} />
        </div>
        <div className="flex items-center justify-center gap-5 lg:gap-10">
            <h1 className="lg:text-xl md:text-2xl mx-2 font-semibold mb-2">{food?.foodName}</h1>
            <p className="text-[#FF5733] font-semibold mb-2">${food?.price}</p>
            <p className="text-[#FF5733] lg:block hidden font-semibold mb-2">{food?.date}</p>
            <NavLink onClick={() => handleDelete(food?._id)}>
                <button className="bg-[#FF5733] hover:bg-orange-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-orange-300 transition duration-300 ease-in-out">
                    Delete
                </button>
            </NavLink>
        </div>
    </div>
);

const MyOrder = () => {
    const [total, setTotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [balance, setBalance] = useState(0);
    const [foods, setFoods] = useState([]);
    const { user } = useContext(AuthContext);
    const [topOrder, setTopOrder] = useState([]);
    const [allfoods, setAllFoods] = useState([]);
    const [paymentMode, setPaymentMode] = useState("");
    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products`);
                const data = await response.json();
                setAllFoods(data);
            } catch (error) {
                console.error("Failed to fetch all foods:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to fetch all foods. Please try again later.",
                    icon: "error"
                });
            }
        };

        fetchAllFoods();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cart/${user?.email}`, { withCredentials: true });
                setFoods(response.data);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to fetch cart items. Please try again later.",
                    icon: "error"
                });
            }
        };

        if (user?.email) {
            fetchCartItems();
        }
    }, [user?.email]);

    useEffect(() => {
        if (allfoods.length) {
            const sortedFoodArray = [...allfoods].sort((a, b) => b.orderCount - a.orderCount);
            setTopOrder(sortedFoodArray);
        }
    }, [allfoods]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const prices = foods?.map(food => parseFloat(food?.price) || 0);
            const total = prices.reduce((acc, curr) => acc + curr, 0);
            setTotal(total);

            const tax = total * 0.10; // 10% of the total
            setTaxes(tax);

            const newDiscount = total * 0.05; // 5% of the total
            setDiscount(newDiscount);

            const platFee = 1.12;
            setPlatformFee(platFee);

            const servFee = 5;
            setServiceFee(servFee);

            setBalance(((total + tax + platFee + servFee) - newDiscount));
        };

        calculateTotalPrice();
    }, [foods]);

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
                axios.delete(`http://localhost:5000/cart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been deleted.",
                                icon: "success"
                            });
                            setFoods(foods.filter(food => food?._id !== id));
                        }
                    });
            }
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!paymentMode) {
            Swal.fire({
                title: "Error!",
                text: "Please select a payment mode.",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Processing Payment",
            text: `You selected ${paymentMode}. Please wait...`,
            icon: "info",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            let response;
            if (paymentMode === "Stripe") {
                response = await axios.post("http://localhost:5000/stripe-payment", {
                    amount: parseInt(balance).toFixed(2),
                    user: user?.email,
                    foods
                });
            }

            if (response) {
                console.log(response.data);
                Swal.fire({
                    title: "Payment Successful",
                    text: `Transaction Id : ${response?.data?.id}
                    Amount : ${response?.data?.amount}`,
                    icon: "success"
                });
            } else {
                throw new Error(response.data.message || "Payment failed");
            }
        } catch (error) {
            Swal.fire({
                title: "Payment Failed",
                text: error.message,
                icon: "error"
            });
        }
    };

    if (!foods.length) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Lottie animationData={nodata} />
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>QuickBite || My Order</title>
            </Helmet>
            <div className="lg:grid grid-cols-12">
                <div className="col-span-8">
                    <h1 className="text-center font-bold text-3xl">Ordered Food Items</h1>
                    <div className="h-1 w-24 mx-auto bg-[#FF5733]"></div>
                    <div className="my-5 mx-3">
                        {foods.map((food) => (
                            <FoodItem key={food?._id} food={food} handleDelete={handleDelete} />
                        ))}
                    </div>
                </div>
                <div className="col-span-4 w-full">
                    <div className="sticky top-0 px-5">
                        <h1 className="text-xl font-bold my-4">Checkout Summary</h1>
                        <form onSubmit={handlePayment}>
                            <input className="border mb-4 w-full px-4 py-2 rounded" type="text" placeholder="Enter Promo Code" />
                            <div>
                                <div className="flex px-2 py-1 items-center justify-between gap-4">
                                    <h1 className="font-semibold">Item Total</h1>
                                    <span className="font-extrabold">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex px-2 py-1 items-center justify-between gap-4">
                                    <h1 className="font-semibold">Taxes</h1>
                                    <span className="font-extrabold">${taxes.toFixed(2)}</span>
                                </div>
                                <div className="flex px-2 py-1 items-center justify-between gap-4">
                                    <h1 className="font-semibold">Discount</h1>
                                    <span className="font-extrabold">${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex px-2 py-1 items-center justify-between gap-4">
                                    <h1 className="font-semibold">Platform Fee</h1>
                                    <span className="font-extrabold">${platformFee.toFixed(2)}</span>
                                </div>
                                <div className="flex px-2 py-1 items-center justify-between gap-4">
                                    <h1 className="font-semibold">Service Fee</h1>
                                    <span className="font-extrabold">${serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="flex px-2 py-1 items-center justify-between gap-4">
                                    <h1 className="font-semibold">Balance</h1>
                                    <span className="font-extrabold">${balance.toFixed(2)}</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold my-4">Select Payment Mode</h1>
                                <div className="flex mb-2 items-center gap-5">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="stripe"
                                            name="paymentMode"
                                            value="Stripe"
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                        <span className="font-bold">Stripe</span>
                                    </label>
                                </div>
                                <div className="flex mb-2 items-center gap-5">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="sslCommerz"
                                            name="paymentMode"
                                            value="SSL Commerz"
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                        <span className="font-bold">SSL Commerz</span>
                                    </label>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <div>
                                <button className="bg-orange-400 text-white my-2 font-bold w-full text-xl rounded-md py-2">
                                    Complete Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
