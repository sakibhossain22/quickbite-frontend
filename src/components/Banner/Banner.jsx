import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div>
            <motion.div
                initial={{ margin: '100px', opacity : 0}}
                animate={{ margin: '0px', opacity : 1 }}
                transition={{ duration: 1 }}
            >
                <div className="carousel w-full lg:h-[650px]">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/home-slide-1.jpg" className="w-full" alt="Slide 1" />
                        <div className="absolute h-full flex justify-center items-center">
                            <div className="mx-10 space-y-5">
                                <h1 className="text-white text-lg font-bold lg:text-6xl uppercase">Wellcome To <br /> Quick<span className="text-[#FF5733]">Bite</span></h1>
                                <p className="text-white">Fast food offers convenient, <br /> flavorful meals, catering to diverse tastes.</p>
                                <NavLink to='/all-food-items'>
                                    <button className="text-white btn my-5 bg-[#FF5733] border-none lg:px-6">All Menus</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="absolute flex gap-5 justify-between transform -translate-y-1/2 bottom-0 left-10">
                            <div className="hidden lg:block">
                                <a href="#slide4" className="btn btn-circle mr-5">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/home-slide-2.jpg" className="w-full" alt="Slide 2" />
                        <div className="absolute h-full flex justify-center items-center">
                            <div className="mx-10 space-y-5">
                                <h1 className="text-white text-lg font-bold lg:text-6xl uppercase">Order Your <br /> <span className="text-[#FF5733]">Item</span></h1>
                                <p className="text-white">Fast food offers convenient, <br /> flavorful meals, catering to diverse tastes.</p>
                                <NavLink to='/all-menus'>
                                    <button className="text-white btn my-5 bg-[#FF5733] border-none px-6">All Menus</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="absolute flex gap-5 justify-between transform -translate-y-1/2 bottom-0 left-10">
                            <div className="hidden lg:block">
                                <a href="#slide1" className="btn btn-circle mr-5">❮</a>
                                <a href="#slide3" className=" btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/home-slide-3.jpg" className="w-full" alt="Slide 3" />
                        <div className="absolute h-full flex justify-center items-center">
                            <div className="mx-10 space-y-5">
                                <h1 className="text-white text-lg font-bold lg:text-6xl uppercase">Visit Our Online <br /> <span className="text-[#FF5733]">Shop</span></h1>
                                <p className="text-white">Fast food offers convenient, <br /> flavorful meals, catering to diverse tastes.</p>
                                <NavLink to='/all-menus'>
                                    <button className="text-white btn my-5 bg-[#FF5733] border-none px-6">All Menus</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="absolute flex gap-5 justify-between transform -translate-y-1/2 bottom-0 left-10">
                            <div className="hidden lg:block">
                                <a href="#slide2" className="btn btn-circle mr-5">❮</a>
                                <a href="#slide4" className=" btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img src="https://tastyc.bslthemes.com/wp-content/uploads/2021/04/home-slide-2.jpg" className="w-full" alt="Slide 4" />
                        <div className="absolute h-full flex justify-center items-center">
                            <div className="mx-10 space-y-5">
                                <h1 className="text-white text-lg font-bold lg:text-6xl uppercase">Get The Best<br /> <span className="text-[#FF5733]">Recipe</span></h1>
                                <p className="text-white">Fast food offers convenient, <br /> flavorful meals, catering to diverse tastes.</p>
                                <NavLink to='/all-menus'>
                                    <button className="text-white btn my-5 bg-[#FF5733] border-none px-6">All Menus</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="absolute flex gap-5 justify-between transform -translate-y-1/2 bottom-0 left-10">
                            <div className="hidden lg:block">
                                <a href="#slide3" className="btn btn-circle mr-5">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Banner;