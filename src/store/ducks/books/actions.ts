import { Dispatch } from 'redux';
import { Book, BookDispatchTypes, BOOK_FAIL, BOOK_LOADING, BOOK_SUCCESS } from './types';

export const getBooks = (search: string) => async (dispatch: Dispatch<BookDispatchTypes>) => {
    try {
        dispatch({
            type: BOOK_LOADING
        });

        console.log('buscando');

        const res = 
            await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDqPfXfflkC2hrCsCRwprwmjJnvl3yXagU&maxResults=40`, {
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
                imageLinks: book.volumeInfo.imageLinks
            };
        });

        console.log(items);

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

// export async function searchBooks(dispatch: Dispatch<Action>, search: string): Promise<Book[]> {
//     const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDqPfXfflkC2hrCsCRwprwmjJnvl3yXagU`, {
//         method: 'GET'
//     });
//     const body = await res.json();
//     const items: Book[] = body.items.map((book: any) => {
//         return {
//             title: book.volumeInfo.title,
//             subtitle: book.volumeInfo.subtitle,
//             authors: book.volumeInfo.authors,
//             description: book.volumeInfo.description,
//             pageCount: book.volumeInfo.pageCount,
//             imageLinks: book.volumeInfo.imageLinks
//         };
//     });

//     dispatch({ loading: true, error: false, type: 'BOOKS_LOADING' })
//     return items;
// }

// export function loadBooks(dispatch: Dispatch<Action>, data: Book[]) {
//     dispatch({ loading: true, error: false, type: 'BOOKS_LOADING', data: data });
// }