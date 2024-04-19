import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	directions: [],
	caders: [],
	dataIsLoading: false,
	error: null,
};

const getToken = () => {
	return localStorage.getItem("token");
};

const getAsyncData = (name, endpoint) => {
	return createAsyncThunk(name, async () => {
		try {
			const token = getToken();
			const response = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	});
};

const getDirections = getAsyncData(
	"getDirections",
	"http://127.0.0.1:8000/api/data/directions"
);
const getCaders = getAsyncData(
	"getCaders",
	"http://127.0.0.1:8000/api/data/caders"
);


const dataSlice = createSlice({
	name: "directions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDirections.pending, (state) => {
				state.dataIsLoading = true;
				state.error = null;
			})
			.addCase(getDirections.fulfilled, (state, action) => {
				state.dataIsLoading = false;
				state.directions = action.payload;
			})
			.addCase(getDirections.rejected, (state, action) => {
				state.dataIsLoading = false;
				state.error = action.error.message;
			})

			.addCase(getCaders.pending, (state) => {
				state.dataIsLoading = true;
				state.error = null;
			})
			.addCase(getCaders.fulfilled, (state, action) => {
				state.dataIsLoading = false;
				state.caders = action.payload;
			})
			.addCase(getCaders.rejected, (state, action) => {
				state.dataIsLoading = false;
				state.error = action.error.message;
			});
	},
});

export { getDirections, getCaders };
export default dataSlice.reducer;
