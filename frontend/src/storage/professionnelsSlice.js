import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	professionnels: [],
	profIsLoading: false,
	profError: null,
};

const getToken = () => {
	return localStorage.getItem("token");
};

const getProfessionnels = createAsyncThunk("getProfs", async () => {
	try {
		const token = getToken();
		const response = await axios.get(
			"http://127.0.0.1:8000/api/data/professionnels",
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
});

const addProfessionnel = createAsyncThunk(
	"addProfessionnel",
	async (formData) => {
		try {
			const token = getToken();
			const response = await axios.post(
				"http://127.0.0.1:8000/api/professionnels/store",
				formData,
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
const deleteProfessionnel = createAsyncThunk(
	"deleteProfessionnel",
	async (id) => {
		try {
			const token = getToken();
			await axios.delete(`http://127.0.0.1:8000/api/professionnels/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return id;
		} catch (error) {
			throw error;
		}
	}
);
const professionnelsSlice = createSlice({
	name: "professionnels",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProfessionnels.pending, (state) => {
				state.profIsLoading = true;
				state.profError = null;
			})
			.addCase(getProfessionnels.fulfilled, (state, action) => {
				state.profIsLoading = false;
				state.professionnels = action.payload;
				state.profError = null;
			})
			.addCase(getProfessionnels.rejected, (state, action) => {
				state.profIsLoading = false;
				state.profError = action.error.message;
			})

			.addCase(addProfessionnel.pending, (state) => {
				state.profIsLoading = true;
				state.profError = null;
			})
			.addCase(addProfessionnel.fulfilled, (state, action) => {
				state.profIsLoading = false;
				state.professionnels.push(action.payload);
				state.profError = null;
			})
			.addCase(addProfessionnel.rejected, (state, action) => {
				state.profIsLoading = false;
				state.profError = action.error.message;
			})

			.addCase(deleteProfessionnel.pending, (state) => {
				state.profIsLoading = true;
				state.profError = null;
			})
			.addCase(deleteProfessionnel.fulfilled, (state, action) => {
				state.profIsLoading = false;
				state.professionnels = state.professionnels.filter(
					(professionnel) => professionnel.id !== action.payload
				);
				state.profError = null;
			})
			.addCase(deleteProfessionnel.rejected, (state, action) => {
				state.profIsLoading = false;
				state.profError = action.error.message;
			});
	},
});

export { getProfessionnels, addProfessionnel, deleteProfessionnel };
export default professionnelsSlice.reducer;
