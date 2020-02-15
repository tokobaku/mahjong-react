import * as React from 'react';
import { MahjongCard } from '../../store/Mahjong/index';
import MahjongGameCard from '../MahjongGameCard/index';

import './MahjongGame.style';

export interface MahjongGameProps {
    cards: MahjongCard[],
    initializeMahjongBoard: (event: React.MouseEvent<HTMLElement>) => void,
    setPreviouslyClickedCardId: (cardId: number) => void,
    hasWon: boolean
};

export default class MahjongGame extends React.Component<MahjongGameProps> {
    getOnMahjongGameCardClick = (cardId: number) => () => {
        const { setPreviouslyClickedCardId } = this.props;

        return setPreviouslyClickedCardId(cardId);
    };

    renderBoard() {
        const { cards } = this.props;

        return (
            <div block="MahjongGame" elem="BoardWrapper">
                {cards.map((card, id) => <MahjongGameCard key={id} card={card} onClick={this.getOnMahjongGameCardClick(id)} />)}
            </div>
        );
    }

    renderStartGameButton() {
        const { cards, initializeMahjongBoard, hasWon } = this.props;
        const gameNeverStarted = cards.length === 0;
        const buttonLabel = gameNeverStarted ? 'Start Game!' : 'Restart Game';

        return (
            <button
              onClick={initializeMahjongBoard}
              block="MahjongGame"
              elem="Button"
              mods={{ gameNeverStarted, hasWon }}
            >
                  {hasWon ? 'You won! Click here to restart!' : buttonLabel}
            </button>
        );
    }

    render() {
        return (
            <div block="MahjongGame">
                {this.renderStartGameButton()}
                {this.renderBoard()}
            </div>
        );
    }
}
