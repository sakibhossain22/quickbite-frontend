/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'
import Lottie from "lottie-react"
import loginAnimation from '../../assets/lotty.json';
import axios from "axios";
import { Helmet } from "react-helmet";
const Register = () => {
    const [error, setError] = useState("")
    const { signUpEmail, updateUser, logOut } = useContext(AuthContext)

    const handleRegister = (e) => {
        setError("")
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const photo = form.photo.value
        const email = form.email.value
        const password = form.password.value;

        if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(.{6,})$/.test(password)) {
            Swal.fire({
                title: 'Error!',
                text: 'Password should have 6 character , one Uppercase and a special character',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
        const userData = { name, photo, email, password }
        console.log(userData)
        signUpEmail(email, password)
            .then(result => {
                const user = result.user
                logOut()
                .then(res => console.log('updated'))
                .catch(error => console.log(error))

                axios.post(`http://localhost:5000/user`, { name, email, password, photo })
                    .then(res => {
                        console.log(res.data);
                    })

                updateUser(name, photo)
                    .then(result => {
                        console.log('profile updated');
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                if (user) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Registration Successful!',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch(error => {
                const message = error.message
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                // console.log(message)
            })
    }
    return (
        <div className="flex items-center gap-5 justify-center my-10 ">
            <Helmet>
                <title>QuickBite || Register</title>
            </Helmet>
            <div className="rounded-lg border p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Register Now</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Type Your Name"
                            className="mt-1  p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium ">Photo Url</label>
                        <input type="text" name="photo" placeholder="Type Your Photo URL" className="mt-1  p-2 w-full border rounded focus:outline-none focus:border-indigo-500" required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium ">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Type Your Email"
                            className="mt-1  p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium ">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Type Your Password"
                            className="mt-1  p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="w-full py-2 px-4 bg-[#FF5733] text-white rounded hover:bg-indigo-700">
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-center">
                    Already Have An Account? <NavLink className='text-white font-bold bg-green-600 px-2 py-1 rounded' to='/login'>Login</NavLink>
                </p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="hidden md:block lg:block w-2/6">
                <Lottie animationData={loginAnimation}></Lottie>
            </div>
        </div>

    );
};

export default Register;