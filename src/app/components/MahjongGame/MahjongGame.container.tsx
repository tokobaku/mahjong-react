import * as React from 'react';
import { connect } from 'react-redux';
import MahjongGame from './MahjongGame.component';
import {
    MahjongCard,
    initializeCards as storeInitializeCards,
    MahjongCardStatus,
    setPreviouslyClickedCardId as storeSetPreviouslyClickedCardId,
    setCardStatus as storeSetCardStatus,
    emptyPreviouslyClickedCardIds as storeEmptyPreviouslyClickedCardIds
} from 'Store/Mahjong';

export const mapStateToProps = (state: any) => ({
    cards: state.MahjongReducer.cards,
    previouslyClickedCardIds: state.MahjongReducer.previouslyClickedCardIds
});

export const mapDispatchToProps = (dispatch: any) => ({
    initializeBoard: (cards: MahjongCard[]) => dispatch(storeInitializeCards(cards)),
    setPreviouslyClickedCardId: (cardId: number) => dispatch(storeSetPreviouslyClickedCardId(cardId)),
    setCardStatus: (cardStatus: MahjongCardStatus, cardId: number) => dispatch(storeSetCardStatus(cardStatus, cardId)),
    emptyPreviouslyClickedCardIds: () => dispatch(storeEmptyPreviouslyClickedCardIds())
});

export interface MahjongGameContainerProps {
    cards: MahjongCard[],
    previouslyClickedCardIds: number[],
    initializeBoard: (cards: MahjongCard[]) => void,
    setPreviouslyClickedCardId: (cardId: number) => void,
    setCardStatus: (cardStatus: MahjongCardStatus, cardId: number) => void,
    emptyPreviouslyClickedCardIds: () => void
};

export class MahjongGameContainer extends React.Component<MahjongGameContainerProps> {
    constructor(props: MahjongGameContainerProps) {
        super(props);

        this.initializeMahjongBoard = this.initializeMahjongBoard.bind(this);
        this.setPreviouslyClickedCardId = this.setPreviouslyClickedCardId.bind(this);
    }

    public readonly MIN_CARD_VALUE = 1;
    public readonly MAX_CARD_VALUE = 50;

    private generateBoard(minCardValue: number, maxCardValue: number) {
        const primeNumbers = this.getPrimeNumbersInRange(minCardValue, maxCardValue);
        const cardValues = [...primeNumbers, ...primeNumbers];

        return this.shuffleArray(cardValues).map(value => ({
            value,
            status: MahjongCardStatus.HIDDEN
        }));
    }

    private getPrimeNumbersInRange(minValue: number, maxValue: number): number[] {
        const primeNumbers: number[] = [];

        while (minValue < maxValue) {
            if (this.isPrimeNumber(minValue)) {
                primeNumbers.push(minValue);
            }

            minValue++;
        }

        return primeNumbers;
    }

    private isPrimeNumber(num: number) {
        if (num < 2) {
            return false;
        }

        const maxDenominator = Math.sqrt(num);

        for(let i = 2; i <= maxDenominator; i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }

    private shuffleArray(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    initializeMahjongBoard() {
        const { initializeBoard } = this.props;

        initializeBoard(this.generateBoard(this.MIN_CARD_VALUE, this.MAX_CARD_VALUE));
    }

    setPreviouslyClickedCardId(cardId: number) {
        const {
            cards,
            previouslyClickedCardIds,
            setPreviouslyClickedCardId,
            setCardStatus,
            emptyPreviouslyClickedCardIds
        } = this.props;
        const clickedCard = cards[cardId];

        if (clickedCard.status === MahjongCardStatus.HIDDEN) {
            if (previouslyClickedCardIds.length === 0) {
                setPreviouslyClickedCardId(cardId);
                setCardStatus(MahjongCardStatus.REVEALED, cardId);

                return;
            }

            const previouslyClickedCardId = previouslyClickedCardIds[previouslyClickedCardIds.length - 1];
            if (cards[previouslyClickedCardId].value === clickedCard.value) {
                setCardStatus(MahjongCardStatus.GUESSED, cardId);
                setCardStatus(MahjongCardStatus.GUESSED, previouslyClickedCardId);
                previouslyClickedCardIds.forEach(id => {
                    if (id !== cardId && id !== previouslyClickedCardId) {
                        setCardStatus(MahjongCardStatus.HIDDEN, id);
                    }
                });
                emptyPreviouslyClickedCardIds();
            } else {
                if (previouslyClickedCardIds.length === 2) {
                    previouslyClickedCardIds.forEach(id => setCardStatus(MahjongCardStatus.HIDDEN, id));
                    emptyPreviouslyClickedCardIds();
                }

                setPreviouslyClickedCardId(cardId);
                setCardStatus(MahjongCardStatus.REVEALED, cardId);
            }
        }
    }

    private hasWon() {
        const { cards } = this.props;

        return cards.length && !cards.some(card => card.status !== MahjongCardStatus.GUESSED);
    }

    render() {
        const hasWon = this.hasWon();

        return (
            <MahjongGame
                {...this.props}
                initializeMahjongBoard={this.initializeMahjongBoard}
                setPreviouslyClickedCardId={this.setPreviouslyClickedCardId}
                hasWon={hasWon}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MahjongGameContainer);
