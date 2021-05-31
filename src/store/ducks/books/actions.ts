import { Dispatch } from 'redux';
import { Book, BookDispatchTypes, BOOK_FAIL, ADD_FAVORITE, REMOVE_FAVORITE, BOOK_LOADING, BOOK_SUCCESS, SHOW_FAVORITES, HANDLE_CATEGORY } from './types';

export const getBooks = (search: string, page: number, limit?: number, category?: string) => async (dispatch: Dispatch<BookDispatchTypes>) => {
    try {
        dispatch({
            type: BOOK_LOADING,
            data: {
                search: search,
                page: page
            }
        });

        const query = search + (category ? `+subject:${category}` : '');

        const res = 
            await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${(page * 40)}&endIndex=${((page * 40) + 40)}&key=AIzaSyDqPfXfflkC2hrCsCRwprwmjJnvl3yXagU&maxResults=${limit ?? 39}&subject=Computers`, {
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

export const addFavorite = (book: Book) => (dispatch: Dispatch<BookDispatchTypes>) => {
    dispatch({
        type: ADD_FAVORITE,
        data: {
            book: book
        }
    })
}

export const removeFavorite = (book: Book) => (dispatch: Dispatch<BookDispatchTypes>) => {
    dispatch({
        type: REMOVE_FAVORITE,
        data: {
            book: book
        }
    })
}

export const showFavorites = (show: boolean) => (dispatch: Dispatch<BookDispatchTypes>) => {
    dispatch({
        type: SHOW_FAVORITES,
        data: {
            show: show
        }
    })
} 

export const handleCategory = (category: string) => (dispatch: Dispatch<BookDispatchTypes>) => {
    dispatch({
        type: HANDLE_CATEGORY,
        data: {
            category: category
        }
    })
}


