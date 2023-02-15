import { configureStore } from "@reduxjs/toolkit";
import LiquidacionSlice from "./Liquidacion-slice";
import SubmenuSlice from "./Submenu-slice";
import UISlice from "./UI-slice";
import UserSlice from "./User-slice";

const Store = configureStore({
    reducer: {user: UserSlice.reducer, liquidacion: LiquidacionSlice.reducer, submenu: SubmenuSlice.reducer, ui: UISlice.reducer}
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;