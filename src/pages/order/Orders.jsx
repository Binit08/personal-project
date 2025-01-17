import React from 'react';

const Orders = ({ order, setOrder }) => {
  // Function to handle the buy button click
  const buy = () => {
  
    setOrder([
 
  ]);
  };

  return (
    <div className='flex justify-center'>
       <div className='flex absolute top-[7vh] gap-40  text-2xl justify-center'>
                 <div className='font-bold'>Laptop</div>
               
                <div className='font-bold'>Year</div>
                <div className='font-bold'>Price</div>
                </div>
      <div className=' p-11 m-10'>
        {order.map((item, index) => (
          <div key={index} className='text-xl grid grid-cols-3 m-2 '>
            <div className='border p-2'>{item.name}</div>
            <div className='border p-2 flex justify-center'>{item.year}</div>
            <div className='border p-2 flex justify-center'>{item.price}</div>
          </div>
        ))}
      </div>
      <div>
        {/* BUY button with onClick event handler */}
        <button
        className='flex justify-center text-3xl border p-2 shadow-xl absolute top-[10vh] right-[10vw] bg-transparent rounded-xl hover:bg-[#ffffff25]' 
          onClick={buy}>
        BUY

        </button>
      </div>
    </div>
  );
};

export default Orders;
