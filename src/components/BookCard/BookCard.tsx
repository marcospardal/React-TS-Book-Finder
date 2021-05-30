import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { Book } from '../../types';

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '20px',
        backgroundColor: 'blue',
        padding: '10px',
        minHeight: '200px',
        maxHeight: '200px',
        minWidth: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
    },
    bookTitle: {
        margin: 0,
        fontFamily: 'Raleway',
        color: 'white',
        fontSize: 25,
        textShadow: '2px 2px 0px black',
        fontWeight: 'bold',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        backgroundColor: 'rgba(117, 117,117 ,0.5)'
    }
}));

interface BookCardProps {
    book: Book,
    size?: number
}

function BookCard(props: BookCardProps) {
    const classes = useStyles();
    const { book } = props;


    React.useEffect(() => {
        console.log(book);
    })

    return (
        <Grid item xs>
            <Paper
                variant='elevation'
                className={classes.card}
                style={{ backgroundImage: `url(${book.imageLinks?.thumbnail ?? ''})`, backgroundSize: 'cover', textOverflow: 'ellipsis' }}
            >
                <p className={classes.bookTitle}>{book.title},{book.subtitle}</p>
                <p style={{ margin: '2px 0px', fontFamily: 'Raleway', color: 'white', fontSize: '18px', textShadow: '2px 2px 0px black', backgroundColor: 'rgba(117,117,117 ,0.5)' }}>{book.authors}</p>
            </Paper>
        </Grid>
    );
};

export default BookCard;