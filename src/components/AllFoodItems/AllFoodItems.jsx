/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';

const AllFoodItems = () => {
  const [data, setData] = useState([]);
  const [foods, setAllFood] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(9);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    axios.get('https://quickbite-server.vercel.app/products-count')
      .then(res => {
        setCount(res.data.count);
      })
      .catch(error => {
        console.error('Error fetching product count:', error);
      });

    axios.get(`https://quickbite-server.vercel.app/products?page=${currentPage}&size=${itemPerPage}`,{withCredentials : true})
      .then(res => {
        setData(res.data);
        setAllFood(res.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [currentPage, itemPerPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target?.search?.value?.toLowerCase();
    const filteredFoods = data?.filter(food =>
      food?.foodName?.toLowerCase().includes(searchText)
    );
    setAllFood(filteredFoods);
  };

  const handleItemPerPage = (e) => {
    setItemPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Helmet>
        <title>QuickBite || All Food</title>
      </Helmet>
      <div className="text-center">
        <div className="h-1 w-10 mx-auto bg-[#FF5733]"></div>
        <h1 className="text-[rgb(26, 47, 51)]  font-bold lg:text-2xl">Search Here</h1>
        <div>
          <form onSubmit={handleSearch}>
            <input className="text-[#FF5733] font-bold border-black border lg:w-4/12 py-[11px] rounded-bl-lg border-r-0 rounded-tl-lg pl-3" placeholder="Search Your Item Here ....." type="text" name="search" id="" />
            <button className="bg-[#FF5733] text-white py-3 rounded-tr-lg rounded-br-lg px-6">Search</button>
          </form>
        </div>
      </div>  
      {
        foods?.length ? <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-5 p-5">
          {foods?.map((food) => (
            <div key={food._id} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <img className="w-full h-48 object-cover mb-4 rounded-lg" src={food?.foodImage} alt={food?.foodName} />
              <h1 className="text-xl font-semibold mb-2">{food?.foodName}</h1>
              <h2 className="text-gray-500 mb-2">{food?.foodCategory}</h2>
              <h2 className="text-gray-500 mb-2">Quantity : {food?.quantity}</h2>
              <p className="text-[#FF5733] font-semibold mb-2">${food?.price}</p>
              <NavLink to={`/details/${food._id}`}>
                <button className="bg-[#FF5733] hover:bg-orange-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-orange-300 transition duration-300 ease-in-out">
                  Details
                </button>
              </NavLink>
            </div>
          ))}
        </div>
        <div className="mx-auto text-center flex items-center justify-center gap-5 my-5">
          <button className="btn px-5 hidden lg:block md:block" onClick={handlePrev}>Prev</button>
          {
            pages.map(page =>
              <button
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'bg-[#FF5733] px-5 py-2 rounded-lg text-white' : 'btn px-5 py-2 rounded-lg'}
                key={page}>{page}
              </button>)
          }
          <button className="btn px-5 hidden lg:block md:block" onClick={handleNext}>Next</button>
          <select className="bg-gray-200 px-3 py-2 rounded-lg" onChange={handleItemPerPage} value={itemPerPage} name="" id="">
            <option value="5">5</option>
            <option value="9">9</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
     </motion.div>
      : <div className="flex items-center justify-center">
        <img src="https://i.ibb.co/61Z0WZ5/giphy.gif" alt="" />
      </div>

      }
    </div>
  );
};

export default AllFoodItems;