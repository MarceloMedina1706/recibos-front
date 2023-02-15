import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSubmenu: false,
  openSubmenu: false,
  showModal: false,
  typeForm: 0,
};

const SubmenuSlice = createSlice({
  name: "SubmenuSlice",
  initialState: initialState,
  reducers: {
    showSubmenu(state){
      state.showSubmenu = true;
    },
    closeSubmenu(state){
      state.showSubmenu = false;
      state.showModal = false;
      state.typeForm = 0;
      state.openSubmenu = false;
    },
    showModal(state, action){
      state.showModal = true
      state.typeForm = action.payload;
    },
    closeModal(state){
      state.showModal = false;
      state.typeForm = 0;
      state.openSubmenu = true;
    },
    setOpenSubmenu(state, action){
      state.openSubmenu = action.payload
    },
    resetSubmenuState(state){
      state.showSubmenu = false;
      state.openSubmenu = false;
      state.showModal = false;
      state.typeForm = 0;
    }
  },
});

export default SubmenuSlice;
