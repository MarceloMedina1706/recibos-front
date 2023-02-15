import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";

const initialUserState: UserType = {
  nombre: "",
  apellido: "",
  cuil: "",
  mail: "",
  role: "",
  empresa: "",
  authEmail: false,
  sinFirmar: 0,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.cuil = action.payload.cuil;
      state.mail = action.payload.mail;
      state.role = action.payload.role;
      state.empresa = action.payload.empresa;
      state.authEmail = action.payload.authEmail;
      state.sinFirmar = action.payload.sinFirmar;
    },
    setEmail(state, action: PayloadAction<string>){
      state.mail = action.payload;
    },
    setAuthEmail(state, action: PayloadAction<boolean>){
      state.authEmail = action.payload;
    },
    decrementSinFirma(state){
      if(state.sinFirmar > 0){
        state.sinFirmar = state.sinFirmar - 1;
      }
    },
    reset(state) {
      state.nombre = "";
      state.apellido = "";
      state.cuil = "";
      state.mail = "";
      state.role = "";
      state.empresa = "";
      state.sinFirmar = 0;
    },
  },
});

export default UserSlice;
