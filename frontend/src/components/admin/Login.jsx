import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../../store/slices/appSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
function Login() {

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/v1/users/login", { identifier, password });

            if (data.success) {
                
                dispatch(setToken(data.data.accessToken));
                toast.success('LOGIN SUCCESSFUL');
                navigate("/admin");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
            toast.error(msg);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full py-6 text-center">
                        <h1 className="text-3xl font-bold">
                            <span className="text-primary">Admin</span> Login
                        </h1>
                        <p className="font-light">
                            Enter your credentials to access the admin panel
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 w-full sm:max-w-md text-gray-600"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="identifier">Email</label>
                            <input
                                id="identifier"
                                type="text"
                                required
                                placeholder="your email id"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                placeholder="your email id"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
                        >
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
