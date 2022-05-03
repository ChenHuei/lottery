import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state

interface User {
  id: number;
  label: string;
}
interface UserState {
  winner: User | null;
  list: User[];
}

// Define the initial state using that type
const initialState: UserState = {
  winner: null,
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
