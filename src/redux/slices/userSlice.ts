import { Gender } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  username: string;
  email: string;
  gender: Gender | "";
  token: string;
  profilePict: string;
}

const initialState: UserState = {
  id: 0,
  username: "",
  email: "",
  token: "",
  gender: "",
  profilePict: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.gender = action.payload.gender;
      state.profilePict = action.payload.profilePict;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.token = "";
      state.gender = "";
      state.profilePict = "";
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
