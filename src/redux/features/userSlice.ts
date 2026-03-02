import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: Record<string, unknown> | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: Record<string, unknown>; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
