import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import { RootStore } from '../../store';
import { getBooks } from '../../store/ducks/books/actions';

function Footer() {
    const state = useSelector((state: RootStore) => state.booksReducer);
    const dispatch = useDispatch();

    const handlePageNext = (page: number) => dispatch(getBooks(state.search, page));
    const handlePreviewPage = (page: number) => dispatch(getBooks(state.search, page));

    return (
        <Box display='flex' flexDirection='row' justifyContent='center' width='100%'>
            <Button disabled={state.page === 0} onClick={() => {
                const page = state.page;
                handlePreviewPage(page-1);
            }}>
                <ArrowBack />
            </Button>
            <Button>
                <Typography>
                    {state.page + 1}
                </Typography>
            </Button>
            <Button onClick={() => {
                const page = state.page;
                handlePageNext(page+1);
            }}>
                <ArrowForward />
            </Button>
        </Box>
    );
}

export default Footer;