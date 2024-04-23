import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	missions: [],
	missionIsLoading: false,
	missionError: null,
};

const getToken = () => {
	return localStorage.getItem("token");
};

const getMissions = createAsyncThunk("getMissions", async () => {
	try {
		const token = getToken();
		const response = await axios.get(
			"http://127.0.0.1:8000/api/data/missions",
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
const addMission = createAsyncThunk(
	"addMission",
	async (missionFormData) => {
		try {
			const token = getToken();
			const response = await axios.post(
				"http://127.0.0.1:8000/api/missions/store",
				missionFormData,
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
const updateMission = createAsyncThunk(
	"updateMission",
	async (updatedMissionData) => {
		try {
			const token = getToken();
			const response = await axios.put(
				`http://127.0.0.1:8000/api/missions/${updatedMissionData.id}/update`,
				updatedMissionData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'PUT',
						'Access-Control-Allow-Headers': '*',
					},
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

const deleteMission = createAsyncThunk(
	"deleteMission",
	async (id) => {
		try {
			const token = getToken();
			await axios.delete(`http://127.0.0.1:8000/api/missions/${id}`, {
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

export const missionsSlice = createSlice({
    name: "missions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
		builder
			.addCase(getMissions.pending, (state) => {
				state.missionIsLoading = true;
				state.missionError = null;
			})
			.addCase(getMissions.fulfilled, (state, action) => {
				state.missionIsLoading = false;
				state.missions = action.payload;
				state.missionError = null;
			})
			.addCase(getMissions.rejected, (state, action) => {
				state.missionIsLoading = false;
				state.missionError = action.error.message;
			})

			.addCase(addMission.pending, (state) => {
				state.missionIsLoading = true;
				state.missionError = null;
			})
			.addCase(addMission.fulfilled, (state, action) => {
				state.missionIsLoading = false;
				state.missions.push(action.payload);
				state.missionError = null;
			})
			.addCase(addMission.rejected, (state, action) => {
				state.missionIsLoading = false;
				state.missionError = action.error.message;
			})

			.addCase(deleteMission.pending, (state) => {
				state.missionIsLoading = true;
				state.missionError = null;
			})
			.addCase(deleteMission.fulfilled, (state, action) => {
				state.missionIsLoading = false;
				state.missions = state.missions.filter(
					(mission) => mission.id !== action.payload
				);
				state.missionError = null;
			})
			.addCase(deleteMission.rejected, (state, action) => {
				state.missionIsLoading = false;
				state.missionError = action.error.message;
			});
    }
});




export { getMissions, addMission, deleteMission, updateMission };

export default missionsSlice.reducer;