import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

//  localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("cart");
        if (serializedState === null) return undefined;
        return { cart: JSON.parse(serializedState) };
    } catch (e) {
        console.warn("loadState error", e);
        return undefined;
    }
};

//  localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.cart);
        localStorage.setItem("cart", serializedState);
    } catch (e) {
        console.warn("saveState error", e);
    }
};

const persistedState = loadState();


const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    devTools: true
});

// подписка на обновление
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
