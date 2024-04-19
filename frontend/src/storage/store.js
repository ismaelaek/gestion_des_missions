import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import professionnelsSlice from "./professionnelsSlice";


const store = configureStore({
	reducer: {
		data: dataSlice,
		professionnels: professionnelsSlice,
	},
});
export default store;
