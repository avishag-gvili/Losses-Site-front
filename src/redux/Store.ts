import { combineReducers, configureStore } from '@reduxjs/toolkit'
import itemReducer from './item/item.slice'
import requestReducer from './request/request.slice'
import userReducer from './user/user.slice'
import authReducer from './auth/auth.slice'
import { TypedUseSelectorHook,createStoreHook,useSelector } from 'react-redux'
export const store = configureStore({
    reducer: {
        item:itemReducer,
        request:requestReducer,
        user:userReducer,
        auth:authReducer
    }
})
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector