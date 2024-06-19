// import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { ItemType } from '../../types/types'

// type ItemStateType={
//     map(arg0: (item: any) => Data): unknown
//     items:ItemType[]
// }

// const initialState: ItemStateType = { items: []}
// const itemSlice = createSlice({
//     name: 'item',
//     initialState,
//     reducers: {
//         setItem:(state,action: PayloadAction<ItemType[]>)=>{
//             state.items=action.payload;
//         },
//         addItem: (state, action: PayloadAction<ItemType>) => {
//             state.items.push(action.payload)
//         },
//         updateItem: (state, action: PayloadAction<ItemType>) => {
//             const index=state.items.findIndex(c=>action.payload.Id)
//             state.items[index]=action.payload
//         },
//         deleteItem:(state,action: PayloadAction<number>)=>{
//             const index=state.items.findIndex(c=>action.payload)
//             state.items.slice(index,1)
//         }
//     }

// })
// export const {setItem,addItem,updateItem,deleteItem}=itemSlice.actions
// export default itemSlice.reducer
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ItemType } from '../../types/types'
type ItemStateType = {
   //[x: string]: any
    items: ItemType[]
}

const initialState: ItemStateType = { items: [] }

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<ItemType[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<ItemType>) => {
            state.items.push(action.payload)
        },
        updateItem: (state, action: PayloadAction<ItemType>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        }
    }
})

export const { setItem, addItem, updateItem, deleteItem } = itemSlice.actions
export default itemSlice.reducer
