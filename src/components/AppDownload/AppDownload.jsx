import { FaGooglePlay, FaApple } from 'react-icons/fa';
const AppDownload = () => {
    return (
        <div className='w-full mx-auto mb-5'>
            <div className='bg-[#FF5733]'>
                <div className='bg-[#FF5733] w-11/12 mx-auto md:flex lg:flex items-center gap-5 justify-center'>
                    <div className='text-white md:w-1/2'>
                        <div className='flex items-center gap-4 my-4'>
                            <div className='h-1 w-7 bg-yellow-400'></div>
                            <h1 className='text-lg uppercase font-bold'>Mobile Application</h1>
                        </div>
                        <div className='space-y-5'>
                            <h1 className='lg:text-6xl text-3xl md:text-4xl font-bold'>Download <br /> Our <br />Application</h1>
                            <p>Quaerat debitis, vel, sapiente dicta sequi
                                labore porro pariatur harum expedita.
                            </p>
                            <div className='flex items-center gap-5 pb-4'>
                                <button className='btn bg-yellow-400 lg:px-8'>
                                    <FaGooglePlay></FaGooglePlay>
                                    <h1>Play Store</h1>
                                </button>
                                <button className='btn bg-yellow-400 lg:px-8'>
                                    <FaApple></FaApple>
                                    <h1>Apple Store</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2  hidden md:block lg:block flex-1'>
                        <img className='w-3/4' src="https://i.ibb.co/YbpTcWd/burger.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDownload;