import img1 from '../../../assets/chief1.png'
import img2 from '../../../assets/chief2.png'
import img3 from '../../../assets/chief3.png'
import img4 from '../../../assets/chief4.png'

const Chiefs = () => {
  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-2">Meet Our Chefs</h2>
      <div className="h-1 w-20 mx-auto bg-[#FF5733]"></div>

      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className='bg-gray-300  border border-[#FF5733]'>
            <img src={img1} alt="" />
        </div>
        <div className='bg-gray-300  border border-[#FF5733]'>
            <img src={img2} alt="" />
        </div>
        <div className='bg-gray-300  border border-[#FF5733]'>
            <img src={img3} alt="" />
        </div>
        <div className='bg-gray-300 border border-[#FF5733]'>
            <img className='w-60 mx-auto' src={'https://reactheme.com/products/wordpress/dinenos/wp-content/uploads/2023/02/img-1.webp'} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Chiefs;
