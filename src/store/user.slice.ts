import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const JWT_PERSISTENT_STATE = 'userData';

export interface IUserPersistentState {
	jwt: string | null;
}
export interface IUserState {
	jwt: string | null;
}

const initialState: IUserState = {
	jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
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
