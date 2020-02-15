import { createStore, combineReducers } from 'redux';

import MahjongReducer from './Mahjong/Mahjong.reducer';

export const reducers = {
    MahjongReducer
};

const store = createStore(
    combineReducers(reducers),
    window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

export default store;
