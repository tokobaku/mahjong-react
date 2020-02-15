import * as React from 'react';
import { MahjongCard, MahjongCardStatus } from '../../store/Mahjong/index';

import './MahjongGameCard.style';

export interface MahjongGameCardProps {
    card: MahjongCard,
    onClick: (event: React.MouseEvent<HTMLElement>) => any
};

export default function MahjongGameCard(props: MahjongGameCardProps) {
    const { card: { value, status }, onClick } = props;

    return (
        <button block="MahjongGameCard" mods={{ status }} onClick={onClick}>{status === MahjongCardStatus.HIDDEN ? '?' : value}</button>
    );
}
