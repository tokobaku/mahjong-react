export enum MahjongActions {
    ADD_ITEM,
    REMOVE_ITEM
};

export interface MahjongItem {
    id: number,
    name: string
};

export interface MahjongAction {
    type: MahjongActions,
    item: MahjongItem
}

export const addItem = (item: MahjongItem): MahjongAction => ({
    type: MahjongActions.ADD_ITEM,
    item
});

export const removeItem = (item: MahjongItem): MahjongAction => ({
    type: MahjongActions.REMOVE_ITEM,
    item
});
