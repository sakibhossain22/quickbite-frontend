import Lottie from "lottie-react";
import { useLoaderData } from "react-router-dom";
import orderLottie from '../../../assets/order.json';
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import moment from "moment/moment";
import Swal from "sweetalert2";
import axios from "axios";

const FoodOrder = () => {
    const loadedData = useLoaderData();
    const [orderData, setOrderData] = useState(loadedData);
    const [itemQuantity, setItemQuantity] = useState(orderData.quantity);
    const { user } = useContext(AuthContext);
    const date = moment().format('ll');
    const [handleQuantity,setQuantity] = useState(0)
    const handleUp = () => {
        if(handleQuantity >= 0 ) {
            setQuantity(handleQuantity + 1)
        } 
        return
    }
    const handleDown = () => {
        if(handleQuantity >= 1 ) {
            setQuantity(handleQuantity - 1)
        } 
        return
    }
    const handleOrder = (e) => {
        e.preventDefault();
        const quantityValue = parseInt(handleQuantity);
        if (orderData.quantity === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Out Of Stock',
                text: 'Product Not Available!',
                confirmButtonText: 'OK'
            });
        }
        if (loadedData.quantity < quantityValue) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You have selected more items than the product quantity!',
                confirmButtonText: 'OK'
            });
        }

        if (itemQuantity === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Out Of Stock',
                text: 'Product Not Available!',
                confirmButtonText: 'OK'
            });
        }

        setItemQuantity(itemQuantity - quantityValue);

        const orderCount = {
            quantity: orderData.quantity - quantityValue,
            orderCount: orderData.orderCount + quantityValue
        };

        const order = {
            foodImage: orderData.foodImage,
            foodName: orderData.foodName,
            price: orderData.price,
            loggedUser: user?.email,
            description: orderData.description,
            foodCategory: orderData.foodCategory,
            quantity: orderData.quantity - quantityValue,
            orderCount: orderData.orderCount + quantityValue,
            date: date
        };

        if (orderData.loggedUser === user?.email) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'You cannot buy your own products!',
                confirmButtonText: 'OK'
            });
        }

        
        axios.post(`http://localhost:5000/order`, order, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {
                    axios.put(`http://localhost:5000/updateOrderCount/${orderData?._id}`, orderCount)
                        .then(res => {
                            console.log(res.data);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Product Ordered Successfully!',
                                confirmButtonText: 'OK'
                            });
                        });
                }
            })

    }
    return (
        <div className="w-full">
            <h1 className="text-center lg:text-3xl text-xl md:text-2xl font-bold">Confirm Your Order Now</h1>
            <div className="bg-[#FF5733] w-28 mx-auto mt-2 h-2"></div>
            <div className="grid lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7">
                    <form onSubmit={handleOrder} className="px-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Name</span>
                            </label>
                            <input disabled defaultValue={orderData?.foodName} type="name" placeholder="Food Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input disabled defaultValue={'$' + orderData?.price} type="text" placeholder="Price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity : {itemQuantity} Available</span>
                            </label>
                            <div className="flex items-center gap-5 mb-4">
                                <h1 onClick={handleDown} className="text-xl font-bold border px-3 hover:bg-gray-400 hover:text-black">-</h1>
                                <span className="font-bold">{handleQuantity}</span>
                                <h1 onClick={handleUp} className="text-xl font-bold border px-3 hover:bg-gray-400 hover:text-black">+</h1>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Buyer Name</span>
                            </label>
                            <input readOnly defaultValue={user?.displayName} type="text" placeholder="Buyer Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control hidden">
                            <label className="label">
                                <span className="label-text">Buyer Email</span>
                            </label>
                            <input readOnly defaultValue={user?.email} type="text" placeholder="Buyer Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Buying Date</span>
                            </label>
                            <input name="orderDate" defaultValue={date} readOnly type="text" placeholder="Buying Date" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn w-full bg-[#FF5733] text-white hover:text-black">Confirm Order</button>
                        </div>
                    </form>
                </div>
                <div className="lg:col-span-5 lg:block hidden">
                    <div>
                        <Lottie animationData={orderLottie}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodOrder;