import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  showHeader: boolean;
  showContent: boolean;
  change: boolean;
  loginFormLoading: boolean;
  primerLoginLoading: boolean;
};

const initialState: InitialStateType = {
  showHeader: false,
  showContent: false,
  change: false,
  loginFormLoading: false,
  primerLoginLoading: false
};

const UISlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showHeader(state) {
      state.showHeader = true;
    },
    hideHeader(state) {
      state.showHeader = false;
    },
    setShowContent(state, action: PayloadAction<boolean>) {
      state.showContent = action.payload;
    },
    setChange(state, action: PayloadAction<boolean>) {
      state.change = action.payload;
    },
    setLoginFormLoading(state, action: PayloadAction<boolean>) {
      state.loginFormLoading = action.payload;
    },
    setPrimerLoginLoading(state, action: PayloadAction<boolean>) {
      state.primerLoginLoading = action.payload;
    },
    resetUIState(state) {
      state.showHeader = false;
      state.showContent = false;
      state.change = false;
    },
  },
});

export default UISlice;
