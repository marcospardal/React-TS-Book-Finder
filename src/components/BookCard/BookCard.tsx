import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { Book } from '../../store/ducks/books/types';

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '20px',
        backgroundColor: 'blue',
        padding: '10px',
        minHeight: '250px',
        maxHeight: '250px',
        minWidth: '180px',
        transition: 'transform 0.15s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        backgroundSize: 'cover', 
        textOverflow: 'ellipsis',
        maxWidth: '350px'
    },
    cardHovered: {
        transform: 'scale3d(1.05, 1.05, 1)'
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
    size?: number,
    onClick: () => void,
}

function BookCard(props: BookCardProps) {
    const classes = useStyles();
    const [cardState, setCardState] = React.useState({
        raised: false,
        shadow: 1
    })
    const { book } = props;

    return (
        <Grid item xs>
            <Paper
                onClick={props.onClick}
                variant='elevation'
                classes={{root: cardState.raised ? classes.cardHovered : ''}}
                className={classes.card}
                onMouseOver={() => setCardState({raised: true, shadow: 3})} onMouseLeave={() => setCardState({raised: false, shadow: 1})}
                style={{ 
                    backgroundImage: `url(${book.imageLinks?.thumbnail ?? ''})`, zIndex: cardState.shadow }}
            >
                <p className={classes.bookTitle}>{book.title},{book.subtitle}</p>
                <p style={{ margin: '2px 0px', fontFamily: 'Raleway', color: 'white', fontSize: '18px', textShadow: '2px 2px 0px black', backgroundColor: 'rgba(117,117,117 ,0.5)' }}>{book.authors}</p>
            </Paper>
        </Grid>
    );
};

export default BookCard;