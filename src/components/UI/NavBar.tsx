import * as React from 'react';
import Link from "next/link"
import { getLocalCart } from "../../utils/cart"
import { useCartContext } from "../../context"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = [
    {
        caption: 'Home',
        href: '/',
    },
    {
        caption: 'Shop',
        href: '/shop',
    },
    {
        caption: 'Cart',
        href: '/cart',
        cartCounter: true,
    },
];

const NavBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const { cart, setCart } = useCartContext()

    React.useEffect(() => {
        setCart(getLocalCart())
    }, [])
    
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                    >
                        <Link href="/">
                            <span style={{color: 'white', cursor: 'pointer'}}>OMG STORE</span>
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        {pages.map((page) => (
                            <Link href={page.href} key={page.caption}>
                                <MenuItem key={page.caption} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.caption} {(page.cartCounter && cart.length) ? `(${cart.length})` : ''}</Typography>
                                </MenuItem>
                            </Link>
                        ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link href="/">
                            <span style={{color: 'white', cursor: 'pointer'}}>OMG STORE</span>
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link href={page.href} key={page.caption}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.caption} {(page.cartCounter && cart.length) ? `(${cart.length})` : ''}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar
