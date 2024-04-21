import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import professionnelsSlice from "./professionnelsSlice";
import jusridictionsSlice from "./jusridictionsSlice";
import missionsSlice from "./missionsSlice";

const store = configureStore({
	reducer: {
		data: dataSlice,
		professionnels: professionnelsSlice,
		jusridictions: jusridictionsSlice,
		missions: missionsSlice,
	},
});
export default store;
