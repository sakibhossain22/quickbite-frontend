const Invite = () => {
    return (
        <div className='w-full mx-auto my-9'>
            <div className='bg-white'>
                <div className=' w-11/12 mx-auto flex-col-reverse lg:flex  lg:flex-row items-center gap-10 justify-center'>
                    <div className='w-full flex-1'>
                        <img className='w-full' src="https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg" alt="" />
                    </div>
                    <div className='text-white lg:w-1/2'>
                        <div className='flex items-center gap-4 my-4'>
                            <div className='h-1 w-7 bg-yellow-400'></div>
                            <h1 className='text-lg uppercase font-bold text-[#FF5733]'>About Us</h1>
                        </div>
                        <div className='space-y-5'>
                            <h1 className='lg:text-5xl text-2xl md:text-4xl  font-bold text-[#04171a]'>We invite you to <br />
                                visit our restaurant</h1>
                            <p className="text-[#04171a]">Restaurants offer a diverse culinary experience, serving delectable dishes ranging from appetizers to desserts. They showcase regional and international cuisines, catering to various tastes. Quality ingredients, skilled chefs, and creative presentation enhance the dining experience. Restaurants provide a social ambiance, making them hubs for family gatherings, celebrations
                            </p>
                            <div className='flex items-center gap-5'>
                                <button className='btn bg-[#FF5733] text-white hover:text-black px-8'>
                                    <h1>Read More</h1>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Invite;