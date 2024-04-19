import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	proffesionnels: [],
	profIsLoading: false,
	profError: null,
};

const token = localStorage.getItem("token");

const getProfessionnels = createAsyncThunk("getProfs", async () => {
	try {
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

const addProfessionnel = createAsyncThunk(
	"addProfessionnel",
	async (formData) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/add/professionnels",
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
				state.proffesionnels = action.payload;
				state.profError = null;
			})
			.addCase(getProfessionnels.rejected, (state, action) => {
				state.profIsLoading = false;
				state.profError = action.error.message;
            })
            .addCase(addProfessionnel.pending, (state)=> {
                state.profIsLoading = true;
                state.profError = null;
            })
            .addCase(addProfessionnel.fulfilled, (state, action) => {
                state.profIsLoading = false;
                state.proffesionnels.push(action.payload);
                state.profError = null;
            })
            .addCase(addProfessionnel.rejected, (state, action) => {
                state.profIsLoading = false;
                state.profError = action.error.message;
            });
	},
});

export { getProfessionnels, addProfessionnel };
export default professionnelsSlice.reducer;
