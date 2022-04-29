import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  list: string[];
}

// Define the initial state using that type
const initialState: UserState = {
  list: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSlice: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUserSlice } = userSlice.actions;

export default userSlice.reducer;
