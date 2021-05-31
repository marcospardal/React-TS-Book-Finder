import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Grid, Box, Typography, Button } from '@material-ui/core';

import { addFavorite } from '../../store/ducks/books/actions';
import { Book } from '../../store/ducks/books/types';
import { AppBar } from '../../components';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '75vh',
        padding: '0px'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        alignItems: 'center',
        padding: '0px 10px'
    },
    bookInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        height: '100%',
        alignItems: 'flex-start',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
      },
    sectionMobile: {
        display: 'flex',
        margin: '0px 10px',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    btn: {
        padding: '10px',
        color: 'white',
        fontFamily: 'Raleway',
        margin: '5px'
    }
}));

function BookPage(props: RouteComponentProps) {
    const book = props.location.state as Book;
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleFavorite = () => dispatch(addFavorite(book));

    return (
        <div className={classes.root}>
            <AppBar />
            <Grid container xs={12} className={classes.container} spacing={3}>
                <Grid item xs className={classes.picture} style={{ display: 'flex', justifyContent: 'center', padding: '30px', flexDirection: 'column' }}>
                    <div className={classes.sectionDesktop}>
                        <img alt='capa' src={book.imageLinks?.thumbnail ?? ''} style={{ height: '100%', width: '400px' }}/>
                    </div>
                    <div className={classes.sectionMobile}>
                        <img alt='capa' src={book.imageLinks?.thumbnail ?? ''} style={{ height: '100%', width: '100%' }}/>
                    </div>
                </Grid>
                <Grid item lg className={classes.bookInfo}>
                    <Typography style={{ fontSize: 35 }}>
                        {`Título: ${book.title} ${book.subtitle ? ', ' + book.subtitle : ''}`}
                    </Typography>
                    <Typography style={{ fontSize: 35 }}>
                        {`Autores: ${book.authors}`}
                    </Typography>
                    <Typography style={{ fontSize: 35 }}>
                        Descrição:
                    </Typography>
                    <p style={{ fontFamily: 'Raleway', fontSize: 18 }}>
                        {book.description ? '\t\t' + book.description : ''}
                    </p>
                    <Box display='flex' flexDirection='column' width='100%' justifyContent='space-between'>
                        <Button className={classes.btn} style={{ backgroundColor: 'red' }} onClick={handleFavorite}>
                            Adicionar aos Favoritos
                        </Button>
                        <Button
                            className={classes.btn} 
                            style={{ backgroundColor: 'blue' }}
                            href={book.page}
                        >
                            Acessar Página
                        </Button>
                        <Button
                            className={classes.btn} 
                            style={{ backgroundColor: 'green' }}
                            href={book.buyPage}
                        >
                            Comprar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default BookPage;