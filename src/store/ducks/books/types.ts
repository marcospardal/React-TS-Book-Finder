// action types
export const BOOK_LOADING = "BOOK_LOADING";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_FAIL = "BOOK_FAIL";
export const BOOK_FAVORITE = "BOOK_FAVORITE";
export const CHANGE_PAGE = "CHANGE_PAGE";

interface BooksLoading {
    type: typeof BOOK_LOADING,
    data?: {
        search: string,
        page: number
    }
}

interface BooksFavorite {
    type: typeof BOOK_FAVORITE,
    data: {
        book: Book
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

export type BookDispatchTypes = BooksFail | BooksLoading | BooksSuccess | BooksFavorite ;
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
    search: string
}