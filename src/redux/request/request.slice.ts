import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RequestType } from '../../types/types'
import { ReactNode } from 'react'
import { JSX } from 'react/jsx-runtime'

type RequestStateType = {
    requests: RequestType[]
}

const initialState: RequestStateType = {
    requests: [],
}

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequest: (state, action: PayloadAction<RequestType[]>) => {
            state.requests = action.payload;
        },
        addRequest: (state, action: PayloadAction<RequestType>) => {
            state.requests.push(action.payload);
        },
        updateRequest: (state, action: PayloadAction<RequestType>) => {
            const index = state.requests.findIndex(request => request.id === action.payload.id);
            if (index !== -1) {
                state.requests[index] = action.payload;
            }
        },
        deleteRequest: (state, action: PayloadAction<number>) => {
            const index = state.requests.findIndex(request => request.id === action.payload);
            if (index !== -1) {
                state.requests.splice(index, 1);
            }
        },
    }
});

export const { setRequest, addRequest, updateRequest, deleteRequest } = requestSlice.actions;
export default requestSlice.reducer;
