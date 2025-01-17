import React from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="fixed w-[15vw]  h-screen text-white">
      <div className="flex flex-col h-screen bg-transparent text-[green] justify-between">
        <div className="p-4 ">
          <ul>
            <li className="hover:bg-[#ffffff26] h-[5vh] flex justify-start gap-1 m-3">
              <MdOutlineDashboard className="text-xl" />
              <Link to="/" className="text-white">Dashboard</Link>
            </li>
            <li className="hover:bg-[#ffffff26] h-[5vh] flex justify-start gap-1 m-3">
              <TbBrandProducthunt className="text-xl" />
              <Link to="/products" className="text-white">Products</Link>
            </li>
            <li className="hover:bg-[#ffffff26] h-[5vh] flex justify-start gap-1 m-3">
              <CiShoppingCart className="text-xl" />
              <Link to="/orders" className="text-white">Orders</Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <ul>
            <li className="hover:bg-[#ffffff26] h-[5vh]">
              <a href="/" className="text-white">Settings</a>
            </li>
            <li className="hover:bg-[#ffffff26] h-[5vh]">
              <a href="/" className="text-white">Help & Support</a>
            </li>
            <li className="hover:bg-[#ffffff26] h-[5vh]">
              <a href="/" className="text-white">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
