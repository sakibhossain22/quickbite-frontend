import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Reviews data with usernames
const reviews = [
    {
        id: 1,
        username: "JohnDoe123",
        title: "Delightful Experience",
        content:
            "The food was absolutely delicious! Each dish was bursting with flavor, and the ingredients tasted fresh and perfectly cooked. The presentation was beautiful, and it truly felt like a five-star experience.",
        rating: 5,
    },
    {
        id: 2,
        username: "FoodieQueen",
        title: "A Flavorful Journey",
        content:
            "Every bite was an explosion of flavors. From the appetizers to the dessert, everything was thoughtfully crafted. The seasoning was spot-on, and the balance of spices was impeccable.",
        rating: 5,
    },
    {
        id: 3,
        username: "ChefLover",
        title: "Good, but Room for Improvement",
        content:
            "The food was decent overall. The appetizers were flavorful, but the main course was slightly under-seasoned for my taste. However, the portion sizes were generous, and the service was quick and friendly.",
        rating: 3,
    },
    {
        id: 4,
        username: "GourmetFan",
        title: "Exquisite and Unique",
        content:
            "The food was extraordinary! The chef's creativity shone through every dish, with unique pairings and innovative flavors. It was a feast for both the eyes and the palate.",
        rating: 5,
    },
    {
        id: 5,
        username: "HungryTraveler",
        title: "Disappointing",
        content:
            "Unfortunately, the food didn’t meet my expectations. The flavors were bland, and the dishes lacked the freshness I was hoping for. While the ambiance was great, the meal fell short.",
        rating: 2,
    },
];

// Function to generate a random date within the past year
const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1); // One year ago
    const end = new Date();
    const randomDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toLocaleDateString(); // Format as MM/DD/YYYY
};

const FoodReviews = () => {
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="p-6 w-full mx-auto">
            <div className='mb-6'>
                <h2 className="text-3xl font-bold mb-2 text-center">Customer Reviews</h2>
                <div className="h-1 w-20 mx-auto bg-[#FF5733]"></div>
            </div>
            <Slider {...sliderSettings}>
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="p-4 border h-72 border-red-600 rounded-lg shadow-md bg-white !w-96 mx-4"
                    >
                        <h3 className="text-xl text-black font-semibold">{review?.title}</h3>
                        <hr className="my-4" />
                        <p className="text-gray-700 mt-2">{review?.content}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-600 text-sm font-medium">
                                - {review?.username}
                            </span>
                            <span className="text-gray-400 text-sm">{getRandomDate()}</span>
                        </div>
                        <div className="mt-2 text-yellow-500">
                            {"⭐".repeat(review?.rating)}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FoodReviews;
