import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	juriAppels: [],
	juriPremieres: [],
	juriIsLoading: false,
	juriError: null,
};

const getToken = () => {
	return localStorage.getItem("token");
};
const endPoint = "http://127.0.0.1:8000/api/data/juridictions";

const getJuridAppels = createAsyncThunk("getAppels", async () => {
	try {
		const token = getToken();
		const response = await axios.get(endPoint + "/1/", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
});

const getJuridPremieres = createAsyncThunk(
	"getPremieres",
	async () => {
		try {
			const token = getToken();
			const response = await axios.get(
				endPoint + "/2/",

				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

const juridictionsSlice = createSlice({
	name: "juridictions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getJuridAppels.pending, (state) => {
				state.juriIsLoading = true;
				state.juriError = null;
			})
			.addCase(getJuridAppels.fulfilled, (state, action) => {
				state.juriIsLoading = false;
				state.juriAppels = action.payload;
				state.juriError = null;
			})
			.addCase(getJuridAppels.rejected, (state, action) => {
				state.juriIsLoading = false;
				state.juriError = action.error.message;
			})
			.addCase(getJuridPremieres.pending, (state) => {
				state.juriIsLoading = true;
				state.juriError = null;
			})
			.addCase(getJuridPremieres.fulfilled, (state, action) => {
				state.juriIsLoading = false;
				state.juriPremieres = action.payload;
				state.juriError = null;
			})
			.addCase(getJuridPremieres.rejected, (state, action) => {
				state.juriIsLoading = false;
				state.juriError = action.error.message;
			});
	},
});

export { getJuridAppels, getJuridPremieres };
export default juridictionsSlice.reducer;
