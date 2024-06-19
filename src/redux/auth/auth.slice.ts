import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUserType } from "../../types/types";

type AuthStateType = {
    user: AuthUserType | null,
    isAuthenticated: boolean,
    isInitialized: boolean
}

const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state: AuthStateType, action: PayloadAction<AuthUserType>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        setInitialized: (state: AuthStateType) => {
            state.isInitialized = true
        },
        deleteUser:(state: AuthStateType) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = false;
        },
        updateUser: (state: AuthStateType, action: PayloadAction<AuthUserType>) => {
            state.user = action.payload;
        }
    }
})

export const { setUser, setInitialized,deleteUser,updateUser} = authSlice.actions

export default authSlice.reducer