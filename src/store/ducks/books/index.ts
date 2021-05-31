import { Reducer } from 'redux';
import { BookDispatchTypes, BooksState, BOOK_LOADING, BOOK_FAIL, BOOK_SUCCESS, BOOK_FAVORITE } from './types';

const INITIAL_STATE: BooksState = {
    data: [],
    favorites: [],
    error: false,
    loading: false,
    page: 0,
    search: ''
};

const reducer: Reducer<BooksState> = (state = INITIAL_STATE, action: BookDispatchTypes) => {
    switch(action.type) {
        case BOOK_LOADING:
            return { ...state, loading: true, search: action.data?.search ?? '', page: action.data?.page ?? 0 };
        case BOOK_FAIL:
            return {...state, loading: false, error: true};
        case BOOK_SUCCESS:
            return { ...state, error: false, loading: false, data: action.payload.books};
        case BOOK_FAVORITE: {
            const newFavorites = state.favorites;
            newFavorites.push(action.data.book);
            return {...state, favorites: newFavorites};
        }
        default:
            return state;
    }
};

export default reducer;