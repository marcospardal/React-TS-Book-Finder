// action types
export const BOOK_LOADING = "BOOK_LOADING";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_FAIL = "BOOK_FAIL";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const SHOW_FAVORITES = "SHOW_FAVORITES";

interface BooksLoading {
    type: typeof BOOK_LOADING,
    data?: {
        search: string,
        page: number
    }
}

interface AddFavorite {
    type: typeof ADD_FAVORITE,
    data: {
        book: Book
    }
}


interface RemoveFavorite {
    type: typeof REMOVE_FAVORITE,
    data: {
        book: Book
    }
}


interface ShowFavorites {
    type: typeof SHOW_FAVORITES,
    data: {
        show: boolean
    }
}

interface BooksSuccess {
    type: typeof BOOK_SUCCESS,
    payload: {
        books: Book[]
    }
}

interface BooksFail {
    type: typeof BOOK_FAIL
}

export type BookDispatchTypes = BooksFail | BooksLoading | BooksSuccess | AddFavorite | RemoveFavorite | ShowFavorites ;
// data types

export interface Book {
    title: string,
    subtitle?: string,
    authors: string[],
    description: string,
    pageCount: number,
    imageLinks: imageLinks,
    page: string,
    buyPage: string
}

interface imageLinks {
    smallThumbnail: string,
    thumbnail: string
}

// state type
export interface BooksState {
    readonly data: Book[],
    readonly favorites: Book[],
    readonly loading: boolean,
    readonly error: boolean,
    page: number,
    search: string,
    showFavorites: boolean
}