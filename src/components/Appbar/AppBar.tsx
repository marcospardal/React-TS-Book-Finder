import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, IconButton, AppBar, Toolbar, fade, Menu, MenuItem, Box, InputAdornment, TextField } from '@material-ui/core';
import { Favorite, SearchOutlined, MoreVertOutlined } from '@material-ui/icons';
import { getBooks, showFavorites } from '../../store/ducks/books/actions';
import { RootStore } from '../../store';

const useStyle = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(2),
        padding: 0
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
    sectionMobile: {
    display: 'flex',
    margin: '0px 10px',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    },
}));

function NavBar() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state: RootStore) => state.booksReducer);
    const [search, setSearch] = React.useState<string>('');
    const [mobileMoreVertOutlinedAnchorEl, setMobileMoreVertOutlinedAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreVertOutlinedAnchorEl);

    const onSubmit = () => dispatch(getBooks(search, 0));

    const handleFavorites = (show: boolean) => dispatch(showFavorites(show)); 

    const handleMobileMenuClose = () => {
        setMobileMoreVertOutlinedAnchorEl(null);
      };
    
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreVertOutlinedAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'show-MoreVertOutlined';

    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreVertOutlinedAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton component="span" style={{ color: state.showFavorites ? 'red' : 'grey' }} onClick={() => handleFavorites(!state.showFavorites)}>
                <Favorite />
            </IconButton>
          </MenuItem>
        </Menu>
      );

    return(
        <div className={classes.grow}>
            <AppBar position='static' style={{ backgroundColor: 'rgb(78, 52, 46)' }}>
                <Toolbar>
                    <div className={classes.sectionDesktop}>
                        <IconButton edge='start' className={classes.homeButton} onClick={() => history.push('/')}>
                            <h1 style={{ fontFamily: 'Playfair Display', margin: 0, color: '#FFFFFF' }}>BookFinder</h1>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                    <h1 style={{ fontFamily: 'Playfair Display' }}>BF</h1>
                    </div>
                    <div className={classes.search}>
                        <TextField
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton component='span' onClick={() => {
                                        onSubmit();
                                        if(history.location.pathname !== '/books') {
                                            history.push('/books')
                                        }
                                    }}>
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            placeholder='Buscar' 
                            variant='outlined' 
                            value={search ?? ''} 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                    <Box alignItems='center' alignContent='center' justifyContent='center' display='flex'>
                        <Box display='flex' flexDirection='column' alignItems='center'>
                            <IconButton component="span" style={{ color: state.showFavorites ? 'red' : 'white' }} onClick={() => handleFavorites(!state.showFavorites)}>
                                <Favorite style={{ height: '40px', width: '40px' }}/>
                            </IconButton>
                        </Box>
                    </Box>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                        aria-label="show MoreVertOutlined"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                        <MoreVertOutlined />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
};

export default NavBar;
