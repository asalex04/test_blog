import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

export interface IUser {
    id: number,
    email: string,
    name: string
   }

export interface IState {
    isAuth: boolean
    user: IUser | {}
    isLoading: boolean
    error: string
}

const initialState: IState = {
    isAuth: false,
    user: {},
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        usersFetching(state) {
            state.isLoading = true
        },
        usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
            state.error = ''
            state.isLoading = false
            state.user = action.payload
        },
        usersFetchingError(state, action:PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
    }
})

export const {usersFetching, usersFetchingError, usersFetchingSuccess,
    setUser, setIsAuth} = userSlice.actions
export default userSlice.reducer
