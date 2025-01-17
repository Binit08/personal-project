import React, { useEffect, useState } from 'react';
import { FaCartPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Products = ({order, setOrder}) => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch('https://mocki.io/v1/19eb9a40-eb69-4daa-a96b-8a8d5d0bbe51');
                let data = await response.json();
                setProducts(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData when component mounts
        
    }, []);
    const Addorder=(name,year, price)=>{
        const newOrderItem = {
            name: name,
            year: year,
            price: price
    }
    localStorage.setItem('myInputData', newOrderItem );
    setOrder([...order,newOrderItem])
}
useEffect(() => {

  console.log(order)
 
}, [order])


    return (
        <div className='flex justify-center items-center    '>
               <div className='flex absolute top-[7vh] gap-x-48 right-[41vw] text-2xl'>
                 <div className='font-bold'>Laptop</div>
               
                <div className='font-bold'>Year</div>
                <div className='font-bold'>Price</div>
                </div>
            <div className='  p-11 m-10'>

                {products.map((item) => (
                    <div key={item.name} className=' grid grid-cols-4 m-3 text-l'>
                        <div className='border p-2'>{item.name}</div>
                        
                        <div className='border p-2 flex justify-center'>{item.year}</div>
                        <div className='border p-2 flex justify-center'>{item.price}</div>
                        <div className='border p-2 flex justify-center'><input type="checkbox" onChange={()=>{ Addorder(item.name, item.year,item.price)}} /></div>
                    </div>
                ))}
               <Link to ="/orders"> <button className='flex justify-center text-3xl border p-2 shadow-xl absolute bottom-[h-screen] right-7 bg-transparent rounded-xl hover:bg-[#ffffff25]'  >
                <FaCartPlus /> order now</button></Link>
            </div>
         
        </div>
    );
}

export default Products;
