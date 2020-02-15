export enum MahjongActions {
    INITIALIZE_CARDS,
    SET_CARD_STATUS,
    SET_PREVIOUSLY_CLICKED_CARD,
    EMPTY_PREVIOUSLY_CLICKED_CARD_IDS
};

export enum MahjongCardStatus {
    HIDDEN,
    REVEALED,
    GUESSED
};

export interface MahjongCard {
    value: number,
    status: MahjongCardStatus
};

export interface MahjongAction {
    type: MahjongActions,
    data: any
}

export const initializeCards = (cards: MahjongCard[]): MahjongAction => ({
    type: MahjongActions.INITIALIZE_CARDS,
    data: cards
});

export const setCardStatus = (cardStatus: MahjongCardStatus, cardId: number): MahjongAction => ({
    type: MahjongActions.SET_CARD_STATUS,
    data: {
        cardStatus,
        cardId
    }
});

export const setPreviouslyClickedCardId = (cardId: number): MahjongAction => ({
    type: MahjongActions.SET_PREVIOUSLY_CLICKED_CARD,
    data: cardId
});

export const emptyPreviouslyClickedCardIds = () => ({
    type: MahjongActions.EMPTY_PREVIOUSLY_CLICKED_CARD_IDS
});
