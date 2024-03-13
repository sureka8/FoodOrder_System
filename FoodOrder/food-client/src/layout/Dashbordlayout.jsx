import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdSpaceDashboard } from "react-icons/md";
import { FaEdit, FaLocationArrow, FaQuestionCircle, FaUserCheck } from "react-icons/fa";
import { FaCartShopping, FaFileCirclePlus } from "react-icons/fa6";
import logo from "/logo.png";


const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
        <Link to="/menu"><FaCartShopping/> Menu</Link>
    </li>
    <li>
        <Link to="/menu"><FaLocationArrow/> Orders Tracking</Link>
    </li>
    <li>
        <Link to="/menu"><FaQuestionCircle/> Customer Support</Link>
    </li>
  </>
);

const Dashbordlayout = () => {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here // small devicess admin */}
          <div className="flex items-center justify-between mx-4">
            {" "}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdSpaceDashboard />
              
            </label>
            <button className="btn rounded-full px-6 bg-green text-white sm:hidden">
              LogOut
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
          <Outlet />
          </div>
          
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
              <p className="text-4xl"><span className="bg-green text-white rounded-xl py-2 px-3 gap-3">F</span>oodi</p>
                <span className="badge badge-primary">Admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdSpaceDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-boking">
                <FaCartShopping />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <FaFileCirclePlus />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-item">
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li>
              <Link to="/dashboard/user">
                <FaUserCheck />
                All Users
              </Link>
            </li>
            <hr />

            {
              sharedLinks
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashbordlayout;
