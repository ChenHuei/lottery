import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state

interface User {
  id: number;
  label: number;
}
interface UserState {
  winner: User | null;
  list: User[];
}

// Define the initial state using that type
const initialState: UserState = {
  winner: null,
  list: Array(100)
    .fill(0)
    .map((_, index) => ({
      id: index + 1,
      label: index + 1,
    })),
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
