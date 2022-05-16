import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from "../../types";

export interface IState {
    posts: IPost[]
}

const initialState: IState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPosts(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
        addPost(state, action: PayloadAction<IPost>) {
            state.posts.push(action.payload)
        },
        deletePost(state, action: PayloadAction<number>){
            state.posts.filter(post => post.id !== action.payload)
        }
    }
})

export const {getPosts, addPost} = postSlice.actions
export default postSlice.reducer
