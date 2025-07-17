import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from 'react-router-dom'
import Logo from "../../components/Logo";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/appSlice";
import toast from "react-hot-toast";
import api from "../../utils/RefreshAccessToken";

function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const logout = async () => {
		try {
			await api.post("api/v1/users/logout");
			localStorage.removeItem('token')
			dispatch(setToken(null));
			toast.success("LOGOUT SUCCESSFUL")
			navigate('/');
		} catch (error) {
			toast.error(error.response?.data?.message || error.message);
		}
	}
	return (
		<>
			<div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
				<div
					className="w-32 sm:w-40 cursor-pointer"

					onClick={() => navigate("/")}
				>
					<Logo />
				</div>

				<button onClick={logout} className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer">
					Logout
				</button>

			</div>
			<div className='flex h-[calc(100vh-70px)]'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
