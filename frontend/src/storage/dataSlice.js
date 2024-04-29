import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";


const initialState = {
	directions: [],
	caders: [],
	etatsMissions : [],
	dataIsLoading: false,
	error: null,
};



const getAsyncData = (name, endpoint) => {
	return createAsyncThunk(name, async () => {
		try {
			const token = Cookie.get("token");
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
const getEtats = getAsyncData(
	"getEtats",
	"http://127.0.0.1:8000/api/data/etats-missions"
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
			})
		
			.addCase(getEtats.pending, (state) => {
				state.dataIsLoading = true;
				state.error = null;
			})
			.addCase(getEtats.fulfilled, (state, action) => {
				state.dataIsLoading = false;
				state.etatsMissions = action.payload;
			})
			.addCase(getEtats.rejected, (state, action) => {
				state.dataIsLoading = false;
				state.error = action.error.message;
			});
	},
});

export { getDirections, getCaders, getEtats };
export default dataSlice.reducer;
