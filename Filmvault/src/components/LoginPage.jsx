import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username); // ✅ Save username
        setIsLoggedIn(true);
        navigate("/Home");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/45/f5/6c/45f56c068a4ced9f7721711e1f6a6d30.jpg)",
      }}
    >
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative my-6">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className="peer block w-72 appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-white focus:border-black focus:outline-none"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-white duration-300 transform -translate-y-7 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Your Username
            </label>
          </div>

          {/* Password */}
          <div className="relative my-6">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="peer block w-72 appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-white focus:border-black focus:outline-none"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-white duration-300 transform -translate-y-7 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Your Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-black hover:text-white py-2 transition-all duration-300"
            type="submit"
          >
            Login
          </button>

          {/* Register Link */}
          <div>
            <span className="m-10">
              New Here?{" "}
              <Link
                className="text-black hover:underline"
                to="/RegisterPage"
              >
                Create an Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
