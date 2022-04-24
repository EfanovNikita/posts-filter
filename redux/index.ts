import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import postsSlice from "./postsSlice";
import type { InitialStateType } from "../types/types";

export let store: StoreType | undefined;

export type StoreType = ReturnType<typeof makeStore>;
export type AppDispatch = StoreType["dispatch"];
let getStateType: StoreType["getState"];
export type RootState = ReturnType<typeof getStateType>;

const makeStore = (initState: InitialStateType) => {
    const store = configureStore({
        reducer: {
            posts: postsSlice,
        },
        preloadedState: { posts: initState }
    });
    return store
}

const initializeStore = (preloadedState: InitialStateType) => {
    let _store = store ?? makeStore(preloadedState);

    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        });
        store = undefined;
    }

    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;

    return _store;
};
export const useStore = (initialState: InitialStateType = {
    ids: [],
    entities: {},
    loading: "idle",
    error: null
}) => {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store
}