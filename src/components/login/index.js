import React from "react";
import Logo from "../images/Logo.png";

function Login() {
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="w-500 h-500 bg-first rounded-xl">
        <div className="h-60 bg-second rounded-t-xl flex justify-center items-center">
          <img src={Logo} width="120px" alt="logo" />
        </div>
        <form className="h-400 flex justify-center items-center flex-col gap-5">
          <div className="mb-5">
            <span className="text-3xl font-semibold text-light">
              Welcome to Admin!
            </span>
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <div className="relative mb-1" data-te-input-wrapper-init>
              <label
                class="block uppercase tracking-wide text-light text-xs font-medium mb-2 px-5"
                for="username"
              >
                First Name
              </label>
              <input
                type="text"
                id="username"
                className="h-11 w-300 rounded-full border-0 bg-transparent px-5 py-[0.32rem] leading-[1.6] outline-none focus:border-second focus:border"
                placeholder="Enter username"
              />
            </div>
            <div className="relative mb-6" data-te-input-wrapper-init>
              <label
                class="block uppercase tracking-wide text-light text-xs font-medium mb-2 px-5"
                for="username"
              >
                Password
              </label>
              <input
                type="text"
                id="username"
                className="h-11 w-300 rounded-full border-0 bg-transparent px-5 py-[0.32rem] leading-[1.6] outline-none focus:border-second focus:border"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="rounded-full bg-admin">
            <button className=" rounded-full h-11 w-200 text-button hover:bg-second hover:text-light transition-all">
              <span className="text-xl font-semibold ">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
