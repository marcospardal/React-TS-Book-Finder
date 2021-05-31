import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BooksState } from './ducks/books/types';
import thunk from 'redux-thunk';

import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
    books: BooksState,
    page: 0
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStore = ReturnType<typeof rootReducer>


export default store;