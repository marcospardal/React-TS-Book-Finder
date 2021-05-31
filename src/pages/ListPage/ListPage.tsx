import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid, LinearProgress, makeStyles } from '@material-ui/core';

//components
import { AppBar, BookCard, Footer } from '../../components';
import { RootStore } from '../../store';
import { Book } from '../../store/ducks/books/types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0px'
    }
}));

function ListPage() {
    const classes = useStyles();
    const history = useHistory();
    const state = useSelector((state: RootStore) => state.booksReducer);

    function handleClick(book: Book): void {
        history.push(`/book/${book.title}`, book);
    }

    const renderList = (list: Book[]) => (
        <Grid container xs={12} spacing={2} style={{ marginTop: '50px' }}>
            {
                list.map((book) => (
                    <BookCard book={book} onClick={() => handleClick(book)}/>
                ))
            }
        </Grid>  
    );

    const renderError = () => (
        <div style={{ flex: 1 }}>
            <h1>
                Ops, algo deu errado :(
            </h1>
        </div>
    )

    return (
        <Container maxWidth='xl' className={classes.root}>
            {console.log(state)}
            <AppBar/>
                {
                    state.loading ?
                    <LinearProgress />
                    :
                    !state.error ?
                        state.showFavorites ? 
                            state.favorites.length ?
                                renderList(state.favorites)
                            :
                            <div style={{ flex: 1 }}>
                                <h1 style={{ fontFamily: 'Playfair Display', fontSize: 25 }}>
                                    Você ainda não favoritou nenhum livro. Para favoritar basta fazer uma busca
                                    , selecionar o livro escolhido e clicar em adicionar aos favoritos. 
                                </h1>
                            </div>
                        :
                        state.data.length ? 
                            <div>
                                {renderList(state.data)}
                                <Footer />
                            </div>
                        :
                            renderError()
                    :
                    renderError()
                }
        </Container>
    );
};

export default ListPage;