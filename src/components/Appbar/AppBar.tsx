import React from 'react';
import { Box, TextField, makeStyles, IconButton, InputAdornment } from '@material-ui/core';
import { BookOutlined, Favorite, Restore, SearchOutlined } from '@material-ui/icons';

const useStyle = makeStyles(() => ({
    root: {
        width: '100%'
    },
    searchBar: {
        width: '800px',
    },
}));

function AppBar() {
    const classes = useStyle();
    const [search, setSearch] = React.useState<String | undefined>()

    function handleSearch() {
        if (search) {

        };
    };

    return(
        <div className={classes.root}>
            <Box flexDirection='row' justifyContent='space-between' display='flex' padding='10px' alignItems='center'>
                <Box alignItems='center' alignContent='center' justifyContent='center' display='flex'>
                    <BookOutlined />
                    <p style={{ fontSize: 22 }}>Buscador de Livros</p>
                </Box>
                <TextField
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton component='span' onClick={handleSearch}>
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>,
                    }}
                    placeholder='Buscar' 
                    variant='outlined' 
                    className={classes.searchBar} 
                    value={search ?? ''} 
                    onChange={(e) => setSearch(e.target.value)}/>
                <Box alignItems='center' alignContent='center' justifyContent='center' display='flex'>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <IconButton component="span" style={{ color: '#FF0000' }}>
                            <Favorite />
                        </IconButton>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center' padding='5px'>
                        <Restore />
                    </Box>
                </Box>
                
            </Box>
        </div>
    );
};

export default AppBar;