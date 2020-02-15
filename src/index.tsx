import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from 'Store';
import { Provider } from 'react-redux';

import MahjongGame from 'Components/MahjongGame';

ReactDOM.render(
    (
        <Provider store={store}>
            <MahjongGame />
        </Provider>
    ),
    document.getElementById('root')
);
