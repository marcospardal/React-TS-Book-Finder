import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, LinearProgress, makeStyles } from '@material-ui/core';

//components
import { AppBar, BookCard } from '../../components';
import { RootStore } from '../../store';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        height: '100%',
        padding: '0px'
    }
}));

function ListPage() {
    const classes = useStyles();
    const state = useSelector((state: RootStore) => state.booksReducer);
    const data = useSelector((state: RootStore) => state.booksReducer.data);

    return (
        <Container maxWidth='xl' className={classes.root}>
            <AppBar/>
                {
                    state.loading ?
                    <LinearProgress />
                    :
                    <Grid container xs={12} spacing={2}>
                        {
                            data?.map((book) => (
                                <BookCard book={book}/>
                            ))
                        }
                    </Grid>
                }
        </Container>
    );
};

export default ListPage;