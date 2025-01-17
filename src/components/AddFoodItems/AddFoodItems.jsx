import { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AddFoodItems = () => {
    const { user } = useContext(AuthContext)

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target
        const foodName = form.name.value
        const foodCategory = form.category.value
        const foodImage = form.image.value
        const quantity = form.quantity.value;
        const price = form.price.value;
        const loggedUser = form.user.value;
        const country = form.country.value;
        const description = form.description.value;
        const madeBy = form.madeBy.value
        const data = { foodName, country, madeBy, foodImage, foodCategory, description, quantity, price, loggedUser }
        console.log(data);
        axios.post(`http://localhost:5000/addproduct`, data, { withCredentials: true })
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product Added Successfully!',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }
    return (

        <div style={{
            backgroundImage: 'url("https://i.ibb.co/N72bcnb/Screenshot-58.png")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <Helmet>
                <title>QuickBite || Add Food</title>
            </Helmet>
            <div>

                <div className="mx-auto flex-justify-center items-center">
                    <div>
                        <div className="shadow-2xl pt-2">
                            <div>
                                <h1 className="mt-4 text-white text-center text-3xl font-bold uppercase">Add Food Item</h1>
                            </div>
                            <form onSubmit={handleUpdate} className=" px-5 py-5 h-screen">
                                <div className="grid grid-cols-2 gap-2">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Food Name</span>
                                        </label>
                                        <input type="text" name="name" placeholder="Type Your Food Name" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Food Image</span>
                                        </label>
                                        <input type="text" name="image" placeholder="Type Your Food Image Url" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Food Category</span>
                                        </label>
                                        <input type="text" name="category" placeholder="Type Food Category Name" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Quantity</span>
                                        </label>
                                        <input type="text" name="quantity" placeholder="Type quantity" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Price</span>
                                        </label>
                                        <input type="text" name="price" placeholder="Type Price" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Add By</span>
                                        </label>
                                        <input type="text" readOnly defaultValue={user?.email} name="user" placeholder="User Info" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text  text-white font-bold">Food Origin</span>
                                        </label>
                                        <input type="text" name="country" placeholder="Type Your Country" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text  text-white font-bold">Made By</span>
                                        </label>
                                        <input readOnly type="text" defaultValue={user?.displayName} name="madeBy" placeholder="Type Your Country" className="input input-bordered bg-white" required />
                                    </div>
                                    <div className="col-span-2 form-control">
                                        <label className="label">
                                            <span className="label-text  text-white font-bold">Short Description</span>
                                        </label>
                                        <input type="text" name="description" placeholder="Short Description" className="input input-bordered bg-white" required />
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-[#FF5733]">ADD ITEM</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFoodItems;