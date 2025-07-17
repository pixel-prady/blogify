import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../utils/RefreshAccessToken";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post("/api/v1/users/register", {
                name,
                email,
                password
            });

            if (data.success) {
                toast.success("Registration Successful! Please log in.");
                navigate("/login");
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full py-6 text-center">
                        <h1 className="text-3xl font-bold">
                            <span className="text-primary">Admin</span> Register
                        </h1>
                        <p className="font-light">Create your admin account</p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 w-full sm:max-w-md text-gray-600"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
                        >
                            Register
                        </button>

                        <p className="mt-4 text-sm text-center">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-primary hover:underline cursor-pointer"
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
