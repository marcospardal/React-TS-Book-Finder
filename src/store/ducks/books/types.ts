// action types
export const BOOK_LOADING = "BOOK_LOADING";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_FAIL = "BOOK_FAIL";

interface BooksLoading {
    type: typeof BOOK_LOADING,
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

export type BookDispatchTypes = BooksFail | BooksLoading | BooksSuccess;
// data types

export interface Book {
    title: string,
    subtitle?: string,
    authors: string[],
    description: string,
    pageCount: number,
    imageLinks: imageLinks
}

interface imageLinks {
    smallThumbnail: string,
    thumbnail: string
}

// state type
export interface BooksState {
    readonly data: Book[],
    readonly loading: boolean,
    readonly error: boolean,
}