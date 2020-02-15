import * as React from 'react';
import { connect } from 'react-redux';
import App from './App.component';
import { MahjongItem, addItem as addMahjong } from 'Store/Mahjong';

export const mapStateToProps = (state: any) => ({
    items: state.MahjongReducer.items
});

export const mapDispatchToProps = (dispatch: any) => ({
    addItem: (item: MahjongItem) => dispatch(addMahjong(item))
})

export interface AppContainerProps {
    items: MahjongItem[],
    addItem: (event: React.MouseEvent<HTMLElement>) => void
};

export class AppContainer extends React.Component<AppContainerProps> {
    constructor(props: AppContainerProps) {
        super(props);

        this.addNewMahjong = this.addNewMahjong.bind(this);
    }

    addNewMahjong() {
        const { addItem, items: { length }} = this.props;

        addItem({
            id: length,
            name: 'newMahjong'
        });
    }

    render() {
        return <App {...this.props} addNewItem={this.addNewMahjong} />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
