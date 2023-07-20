import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/HaloLuxury.png";

function SideBar({ tab, title }) {
  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <div className="flex min-h-full">
      <div className="flex flex-col p-3 bg-light shadow w-72">
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
            <h1 className="font-semibold text-button m-2">{title}</h1>
          </div>
          <div className="flex justify-center">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {tab.map((item) => (
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
              <li className="rounded-sm">
                <Link
                  onClick={(e) => onLogout(e)}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <div className="text-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </div>
                  <h1 className="text-button text-lg font-semibold">Logout</h1>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SideBar;
