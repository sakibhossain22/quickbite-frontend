import Lottie from "lottie-react";
import error from "../../assets/404.json"
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <Helmet>
                    <title> 404 </title>
                </Helmet>
                <div className="mx-auto">
                    <Lottie animationData={error}></Lottie>
                </div>
                <div className="w-10 mx-auto">
                    <NavLink className='bg-[#FF5733] text-white px-5 py-2 rounded-lg mx-auto text-center' to='/'>Home</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;