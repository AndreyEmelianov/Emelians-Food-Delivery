import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUserState {
	jwt: string | null;
}

const initialState: IUserState = {
	jwt: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		logout: (state) => {
			state.jwt = null;
		},
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
