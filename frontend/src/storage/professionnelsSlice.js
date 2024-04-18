import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	proffesionnels: [],
	isLoading: false,
	error: null,
};

const getProfs = createAsyncThunk("getProfs", () => {
    return axios.get('http://localhost:8000/api/proffesionnels');

})


const professionnelsSlice = createSlice({
    name: "professionnels",
    initialState,
    reducers: {
    },
    extraReducers: {
        
    }
})

export { getProfs };
export default professionnelsSlice.reducer;