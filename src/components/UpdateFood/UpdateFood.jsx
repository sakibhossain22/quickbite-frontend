import Lottie from "lottie-react";
import orderLottie from '../../assets/order.json';
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";

const UpdateFood = () => {
    const orderData = useLoaderData()
    const { user } = useContext(AuthContext)
    console.log(orderData);

    const handleOrder = (e) => {
        const form = e.target

        const orderCount = {
            foodImage: form.image.value,
            foodName: form.name.value,
            description: form.description.value,
            foodCategory: form.category.value,
            price: form.price.value,
            loggedUser: user?.email,
            country: orderData?.country,
            rating: orderData?.rating,
            quantity: form.quantity.value,
            orderCount: 0


        }
        console.log(orderCount);

        e.preventDefault()
        axios.put(`http://localhost:5000/updateProduct/${orderData?._id}` , orderCount)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product Updated Successfuly!',
                        confirmButtonText: 'OK'
                    })
                }

            })

    }
    return (
        <div className="w-full">
            <Helmet>
                <title>QuickBite || Update Food</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold">Update Your Product Now</h1>
            <div className="bg-[#FF5733] w-28 mx-auto mt-2 h-2"></div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-7">
                    <form onSubmit={handleOrder} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Name</span>
                            </label>
                            <input name="name" defaultValue={orderData?.foodName} type="name" placeholder="Food Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Image</span>
                            </label>
                            <input name="image" defaultValue={orderData?.foodImage} type="name" placeholder="Food Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input name="price" defaultValue={orderData?.price} type="text" placeholder="Price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input name="quantity" defaultValue={orderData?.quantity} type="text" placeholder="Quantity" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input name="description" defaultValue={orderData?.description} type="text" placeholder="Description" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Category</span>
                            </label>
                            <input name="category" defaultValue={orderData?.foodCategory} type="text" placeholder="Food Category" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#FF5733] text-white hover:text-black">Update Food</button>
                        </div>
                    </form>
                </div>
                <div className="col-span-5 ">
                    <div>
                        <Lottie animationData={orderLottie}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFood;