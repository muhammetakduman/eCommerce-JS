import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userType } from '../types/Types'

export interface AppSliceType {
    currentUser: userType | null,
    loading: boolean

}


const initialState: AppSliceType = {
    currentUser: null,
    loading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentUser: (state: AppSliceType, action: PayloadAction<userType | null>) => {
            state.currentUser = action.payload;
        }
    }
});
export const { setLoading, setCurrentUser } = appSlice.actions

export default appSlice.reducer