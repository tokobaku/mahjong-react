import { MahjongItem, MahjongActions, MahjongAction } from './Mahjong.action';

export interface MahjongState {
    items: MahjongItem[]
};

export const initialState: MahjongState = {
    items: []
};

const MahjongReducer = (state = initialState, action: MahjongAction): MahjongState => {
    const { item } = action;

    switch (action.type) {
    case MahjongActions.ADD_ITEM:
        return {
            items: [
                ...state.items,
                item
            ]
        };

    case MahjongActions.REMOVE_ITEM:
        const filteredItems = state.items.filter(mahjong => item.id !== mahjong.id);

        return {
            items: filteredItems
        };
    default:
        return state;
    }
};

export default MahjongReducer;
