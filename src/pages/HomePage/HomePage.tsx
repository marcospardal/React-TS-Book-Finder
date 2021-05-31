import React from 'react';
import { Box, TextField, InputAdornment, IconButton, makeStyles, Button, Grid } from '@material-ui/core';
import { SearchOutlined, Favorite } from '@material-ui/icons';
import { BookCard } from '../../components';
import { getBooks } from '../../store/ducks/books/actions';
import { Book } from '../../store/ducks/books/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    root: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(245,245,245 ,0.5)',
        height: '98vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoField: {
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'start',
        padding: '0px 10px'
    },
    examples: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: '10px'
    },
    searchBar: {
        width: '100%',
        fontFamily: 'Raleway'
    },
    button: {
        backgroundColor: 'red',
        color: 'white',
        height: '50px',
        margin: '18px',
        padding: '5px'
    }
}));

function HomePage() {
    const classes = useStyles();
    const history = useHistory();
    const [search, setSearch] = React.useState<string>('');
    const books = useSelector((state: RootStore) => state.booksReducer.data);
    const dispatch = useDispatch();

    function onSubmit() {
        dispatch(getBooks(search, 0));
        history.push(`/books/results/${search}`);
    }

    function handleClick(book: Book): void {
        history.push(`/book/${book.title}`, book);
    }

    React.useEffect(() => {
        dispatch(getBooks('reactjs', 0, 10));
    }, [dispatch])

    return(
        <Grid container xs={12} className={classes.root}>
            <Grid item sm className={classes.infoField}>
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin='20px 0px'>
                    <h1 style={{ fontFamily: 'Playfair Display', fontSize: 75, color: 'rgba(78,52,46 ,1)', margin: 5 }}>
                        BookFinder
                    </h1>
                </Box>
                <p style={{ padding: 0, margin: 0, fontFamily: 'Raleway' }}>
                    Esse site utiliza a API Google Books para encontrar exemplares de livros, basta adicionar umas busca por
                    título, autor, categoria entre outras opções.
                </p>
                <h3 style={{ fontFamily: 'Playfair Display' }}>
                    Para começar, você pode fazer uma busca rápida utlizando a barra abaixo:
                </h3>
                <TextField 
                    placeholder='Buscar'
                    className={classes.searchBar}
                    value={search ?? ''}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton component='span' onClick={onSubmit}>
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>,
                    }}
                    variant='outlined' 
                />
                <Box flexDirection='row' display='flex' width='100%' alignItems='center'>
                <h3 style={{ fontFamily: 'Playfair Display' }}>
                    Ou acesse seus favoritos:
                </h3>
                <Button className={classes.button}>
                    <Favorite style={{ height: '20px', width: '20px' }}/>
                </Button>
                </Box>
            </Grid>
            <Grid item lg className={classes.examples}>
                <Grid container spacing={2} xs={12} style={{ width: '100%' }}>
                    {
                        books?.map((book) => (
                            <BookCard book={book} onClick={() => handleClick(book)}/>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
