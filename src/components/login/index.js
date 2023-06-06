import React, { useState } from "react";
import Logo from "../images/Logo.png";
import { useDispatch } from "react-redux";
import { login } from "./action";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(login({ username, password }));
    if (response.status === 200) {
      window.location.reload();
    } else {
    }
  };

  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="w-500 h-500 bg-first rounded-xl">
        <div className="h-60 bg-second rounded-t-xl flex justify-center items-center">
          <img src={Logo} width="120px" alt="logo" />
        </div>
        <form
          className="h-400 flex justify-center items-center flex-col gap-5"
          onSubmit={(e) => onLogin(e)}
        >
          <div className="mb-5">
            <span className="text-3xl font-semibold text-light">
              Welcome to Admin!
            </span>
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <div className="relative mb-1" data-te-input-wrapper-init>
              <label
                className="block uppercase tracking-wide text-light text-xs font-medium mb-2 px-5"
                htmlFor="username"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="h-11 w-300 rounded-full border-0 bg-white px-5 py-[0.32rem] leading-[1.6] outline-none focus:border-second focus:border"
                placeholder="Enter username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="relative mb-6" data-te-input-wrapper-init>
              <label
                className="block uppercase tracking-wide text-light text-xs font-medium mb-2 px-5"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="h-11 w-300 rounded-full border-0 bg-white px-5 py-[0.32rem] leading-[1.6] outline-none focus:border-second focus:border"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-full bg-admin">
            <button className=" rounded-full h-11 w-200 text-button hover:bg-second hover:text-light transition-all">
              <span className="text-xl font-semibold">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
