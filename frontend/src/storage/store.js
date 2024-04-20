import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import professionnelsSlice from "./professionnelsSlice";
import jusridictionsSlice from "./jusridictionsSlice";


const store = configureStore({
	reducer: {
		data: dataSlice,
		professionnels: professionnelsSlice,
		jusridictions: jusridictionsSlice,
	},
});
export default store;
