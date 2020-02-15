import { MahjongCard, MahjongActions, MahjongAction, MahjongCardStatus } from './Mahjong.action';

export interface MahjongState {
    cards: MahjongCard[],
    previouslyClickedCardIds: number[]
};

export const initialState: MahjongState = {
    cards: [],
    previouslyClickedCardIds: []
};

const MahjongReducer = (state: MahjongState = initialState, action: MahjongAction): MahjongState => {
    const { data } = action;

    switch (action.type) {
    case MahjongActions.INITIALIZE_CARDS:
        return {
            cards: [
                ...(data as MahjongCard[])
            ],
            previouslyClickedCardIds: []
        };

    case MahjongActions.SET_CARD_STATUS:
        const { cards } = state;
        const { cardStatus, cardId } = data;

        const newCards = cards.map((item, id) => {
            if (id === cardId) {
                return { ...item, status: cardStatus };
            }

            return item;
        });

        return {
            ...state,
            cards: newCards
        };

    case MahjongActions.SET_PREVIOUSLY_CLICKED_CARD:
        const { previouslyClickedCardIds } = state;
        const newPreviouslyClickedCardIds = previouslyClickedCardIds.length < 2 ? previouslyClickedCardIds : previouslyClickedCardIds.splice(1, previouslyClickedCardIds.length);
        newPreviouslyClickedCardIds.push(data);

        return {
            ...state,
            previouslyClickedCardIds: newPreviouslyClickedCardIds
        };

    case MahjongActions.EMPTY_PREVIOUSLY_CLICKED_CARD_IDS:
        return {
            ...state,
            previouslyClickedCardIds: []
        };

    default:
        return state;
    }
};

export default MahjongReducer;
