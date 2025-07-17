import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Addblog from "./pages/admin/Addblog";
import Listblog from "./pages/admin/Listblog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchBlogs, setToken } from "./store/slices/appSlice";
import axios from "axios";
import Register from "./components/admin/Register";
import Loader from "./components/Loader";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && token !== "undefined" && token !== "null") {
            // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            dispatch(setToken(token));
        } else {
            localStorage.removeItem("token");
            dispatch(setToken(null));
        }

        dispatch(fetchBlogs()).finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <Loader/>

    return (
        <div>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/*  Admin Routes protected by wrapper */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="addBlog" element={<Addblog />} />
                    <Route path="listBlog" element={<Listblog />} />
                    <Route path="comments" element={<Comments />} />
                </Route>

            </Routes>
        </div>
    );
}

export default App;
