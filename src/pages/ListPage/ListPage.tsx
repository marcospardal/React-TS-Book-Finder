import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid, LinearProgress, makeStyles, Tabs, Box, Typography, Tab, } from '@material-ui/core';

import { RootStore } from '../../store';
import { Book } from '../../store/ducks/books/types';
import { AppBar, BookCard, Footer } from '../../components';
import { getBooks, handleCategory } from '../../store/ducks/books/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0px'
    },
    category: {
        margin: '10px', 
        borderRadius: '20px', 
        backgroundColor: 'rgb(78, 52, 46)', 
        padding: '10px', 
        cursor: 'pointer',
        width: '100px'
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const categories = ['Aventura', 'Biografia', 'Comédia', 'Conto', 'Crônica', 'Drama', 'Ensaio', 'Ficção', 'Romance']

function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
function ListPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state: RootStore) => state.booksReducer);
    const [value, setValue] = React.useState(1);

    function handleClick(book: Book): void {
        history.push(`/book/${book.title}`, book);
    }

    const handleCategoryChange = (category: string) => dispatch(handleCategory(category));

    const renderList = (list: Book[]) => (
        <div>
            <Grid item sm className={classes.category}>
                {
                    state.category !== undefined ? 
                    <Typography style={{color: '#FFFFFF', textAlign: 'center'}}>
                        {state.category}
                    </Typography>
                    :
                    <Typography style={{color: '#FFFFFF', textAlign: 'center'}}>
                        Todos
                    </Typography>
                }
            </Grid>
            <Grid container xs={12} spacing={2} style={{ marginTop: '50px' }}>
                {
                    list.map((book) => (
                        <BookCard book={book} onClick={() => handleClick(book)}/>
                    ))
                }
            </Grid>  
        </div>
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
            <AppBar/>
                <Tabs value={value} onChange={() => {}}>
                    <Tab label="Gêneros" style={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }} {...a11yProps(0)} onClick={() => setValue(0)}/>
                    <Tab label="Livros" style={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }} {...a11yProps(1)} onClick={() => setValue(1)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Grid container xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                categories.map((category) => (
                                    <Grid item sm className={classes.category} onClick={() => {
                                        handleCategoryChange(category);
                                        dispatch(getBooks(state.search, state.page, 39, category))
                                        setValue(1);
                                    }}>
                                        <Typography style={{color: '#FFFFFF', textAlign: 'center'}}>
                                            {category}
                                        </Typography>
                                    </Grid>
                                ))
                            }
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                </TabPanel>
        </Container>
    );
};

export default ListPage;
