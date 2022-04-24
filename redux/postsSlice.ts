import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import { fetchNewsInstance } from '../axios/index'
import { RootState } from "."
import type { InitialStateType, IPost, IFilter } from '../types/types'

export const postsAdapter = createEntityAdapter<IPost>();
const initialState: InitialStateType = postsAdapter.getInitialState({ loading: 'idle', error: null });

export const fetchPosts = createAsyncThunk<IPost[], IFilter, { serializedErrorType: string }>(
    'pages/index',
    async ({ search, type }) => {
        const res = await fetchNewsInstance.get('', {
            params: {
                search,
                type
            }
        })
        const posts = res.data.data.map((post: IPost, index: number) => {
            const { title, description } = post
            const id = index
            return { title, description, id }
        })
        return posts as IPost[]
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = 'loading'
            state.error = null
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            postsAdapter.setMany(state, action.payload)
            state.loading = 'idle'
            state.error = null
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.error
        });
    }
})

//export type RootReducer = ReturnType<typeof postsSlice.reducer>;
export const postSelector = postsAdapter.getSelectors<RootState>((state) => state.posts);
export default postsSlice.reducer;