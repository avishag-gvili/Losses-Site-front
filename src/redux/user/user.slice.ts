import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {UserType} from '../../types/types'

type UserStateType={
    users:UserType[]
}

const initialState: UserStateType = { users: []}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action: PayloadAction<UserType[]>)=>{
            state.users=action.payload;
        },
        addUser: (state, action: PayloadAction<UserType>) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<UserType>) => {
            const index=state.users.findIndex(c=>action.payload.id)
            state.users[index]=action.payload
        },
        deleteUser:(state,action: PayloadAction<number>)=>{
            const index=state.users.findIndex(c=>action.payload)
            state.users.slice(index,1)
        },
    }
})
export const {setUser,addUser,updateUser,deleteUser}=userSlice.actions
export default userSlice.reducer