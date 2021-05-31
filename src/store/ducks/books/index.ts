import { Reducer } from 'redux';
import { BookDispatchTypes, BooksState, BOOK_LOADING, BOOK_FAIL, BOOK_SUCCESS } from './types';

const INITIAL_STATE: BooksState = {
    data: [],
    error: false,
    loading: false,
};

const reducer: Reducer<BooksState> = (state = INITIAL_STATE, action: BookDispatchTypes) => {
    switch(action.type) {
        case BOOK_LOADING:
            return { ...state, loading: true };
        case BOOK_FAIL:
            return {...state, loading: false, error: true};
        case BOOK_SUCCESS:
            return { error: false, loading: false, data: action.payload.books};
        default:
            return state;
    }
};

export default reducer;