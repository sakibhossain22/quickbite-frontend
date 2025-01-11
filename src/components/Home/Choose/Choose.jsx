import bg from '../../../assets/choose.jpeg';

const Choose = () => {
    return (
        <div className="relative my-3">
            {/* Background Image */}
            <img src={bg} alt="Tasty food" className="w-full h-full object-cover" />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            
            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white space-y-6">
                <p className="text-sm lg:text-xl md:text-lg font-semibold bg-[#FF5733] w-52 mx-auto px-2 py-1 rounded">TASTY & CRUNCHY</p>
                <h1 className="text-3xl lg:text-6xl md:text-5xl font-bold text-yellow-400">Pick & Enjoy</h1>
                <h4 className="text-sm md:text-lg lg:text-xl">Inspired by the culinary artistry of the world’s finest chefs.</h4>
            </div>
        </div>
    );
};

export default Choose;
