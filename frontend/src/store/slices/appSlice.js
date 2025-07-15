import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const fetchBlogs = createAsyncThunk(
	"app/fetchBlogs",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get("/api/v1/blog/all");
			// console.log(data);
			if (data.success) return data.data;
			toast.error(data.message);
			return rejectWithValue(data.message);
		} catch (error) {
			toast.error(error.message);
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	token: localStorage.getItem("token") || null,
	blogs: [],
	input: "",
	loading: false,
	error: null,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${action.payload}`; 
			localStorage.setItem("token", action.payload);
		},
		clearToken(state) {
			state.token = null;
			delete axios.defaults.headers.common["Authorization"];
			localStorage.removeItem("token");
		},
		setInput(state, action) {
			state.input = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlogs.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBlogs.fulfilled, (state, action) => {
				state.loading = false;
				state.blogs = action.payload;
				// console.log(action.payload);
			})
			.addCase(fetchBlogs.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch blogs";
			});
	},
});

export const { setToken, clearToken, setInput } = appSlice.actions;
export default appSlice.reducer;
