import { Dispatch } from 'redux';
import { Book, BookDispatchTypes, BOOK_FAIL, BOOK_FAVORITE, BOOK_LOADING, BOOK_SUCCESS } from './types';

export const getBooks = (search: string, page: number, limit?: number) => async (dispatch: Dispatch<BookDispatchTypes>) => {
    try {
        dispatch({
            type: BOOK_LOADING,
            data: {
                search: search,
                page: page
            }
        });


        const res = 
            await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${(page * 40)}&endIndex=${((page * 40) + 40)}&key=AIzaSyDqPfXfflkC2hrCsCRwprwmjJnvl3yXagU&maxResults=${limit ?? 39}`, {
                method: 'GET'
            });
        const body = await res.json();
        const items: Book[] = body.items.map((book: any) => {
            return {
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                pageCount: book.volumeInfo.pageCount,
                imageLinks: book.volumeInfo.imageLinks,
                page: book.volumeInfo.previewLink,
                buyPage: book.saleInfo.buyLink
            };
        });

        dispatch({
            type: BOOK_SUCCESS,
            payload: {
                books: items
            }
        })
    } catch (e) {
        dispatch({
            type: BOOK_FAIL
        })
    }
}

export const addFavorite = (book: Book) => async (dispatch: Dispatch<BookDispatchTypes>) => {
    dispatch({
        type: BOOK_FAVORITE,
        data: {
            book: book
        }
    })
}


