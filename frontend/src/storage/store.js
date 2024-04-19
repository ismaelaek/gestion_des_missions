import { configureStore } from "@reduxjs/toolkit";
import directionsSlice from "./dataSlice";


const store = configureStore({
	reducer: {
		directions: directionsSlice,
	},
});
export default store;
