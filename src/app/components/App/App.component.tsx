import * as React from 'react';
import { MahjongItem } from 'Store/Mahjong/Mahjong.action';

import './App.style';

export interface AppProps {
    items: MahjongItem[],
    addNewItem: (event: React.MouseEvent<HTMLElement>) => void
};

export default class App extends React.Component<AppProps> {
    renderAllItems() {
        const { items } = this.props;

        return items.map(({ id, name }) => <p block="App" elem="MahjongItem" key={id}>{id} {name}</p>)
    }

    render() {
        const { addNewItem } = this.props;

        return (
            <div block="App">
                <h1 block="App" elem="Header" onClick={addNewItem}>If this text is red, Mahjong project setup is done!</h1>
                {this.renderAllItems()}
            </div>
        );
    }
}
