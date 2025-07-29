import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", {
                username,
                email,
                password
            });
            alert(res.data.message || "Registration successful");
            navigate("/LoginPage");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
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
                <h1 className="text-4xl font-bold text-center mb-6 text-white">Register</h1>
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
                            Username
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative my-6">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="peer block w-72 appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-white focus:border-black focus:outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-white duration-300 transform -translate-y-7 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                        >
                            Your Email
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

                    {/* Confirm Password */}
                    <div className="relative my-6">
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirmPassword"
                            className="peer block w-72 appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-white focus:border-black focus:outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="confirmPassword"
                           className="absolute text-sm text-white duration-300 transform -translate-y-7 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                        >
                            Confirm Password
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-black hover:text-white py-2 transition-all duration-300"
                        type="submit"
                    >
                        Register
                    </button>

                    {/* Link */}
                    <div>
                        <span className="m-10">
                            Already have an account?{" "}
                            <Link className="text-black hover:underline" to="/LoginPage">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
