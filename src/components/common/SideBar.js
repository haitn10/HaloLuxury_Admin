import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/HaloLuxury.png";
import home from "../constants/listData";

function SideBar() {
  return (
    <div className="flex">
      <div className="flex flex-col p-3 bg-light shadow w-80">
        <div className="space-y-3 py-10">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-36" />
          </div>
          <div className="flex flex-col items-center py-10">
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 rounded-full object-scale-down border border-first"
            />
            <h1 className="font-semibold text-button m-2">Admin Manager</h1>
            <button className="bg-first text-light px-3 py-1 rounded-3xl border border-second text-sm ">
              Edit
            </button>
          </div>
          <div className="flex justify-center">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {home.map((item) => (
                <li className="rounded-sm" key={item.id}>
                  <Link
                    to={item.link}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <div className="text-button">{item.icon}</div>
                    <h1 className="text-button text-lg font-semibold">
                      {item.title}
                    </h1>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SideBar;
