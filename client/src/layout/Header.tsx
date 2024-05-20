import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import * as React from 'react';
import { NavLink } from "react-router-dom";

interface Props {
    darkMode: boolean,
    onSetDarkMode: (isDark: boolean) => void
}

export default function Header(props: Props) {
    const midLinks = [
        {title: 'catalog', path: '/catalog'},
        {title: 'about', path: '/about'},
        {title: 'contact', path: '/contact'},
        {title: 'manage product', path: '/manage-product'},
    ];

    const rightLinks = [
        {title: 'login', path: '/login'},
        {title: 'register', path: '/register'},
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSetDarkMode(event.target.checked);
    };

    const navStyles = {
        color: 'inherit',
        '&:hover': {
            color: 'grey.500'
        },
        '&.active': {
            color: 'text.secondary'
        }
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography 
                        variant="h6" 
                        component={NavLink} to={'/'}
                        sx={{color: 'inherit', textDecoration: 'none'}}
                    >
                        My Shop
                    </Typography>
                    <Switch
                        checked={props.darkMode}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="warning"
                    />
                    <List sx={{display: 'flex'}}>
                        {midLinks.map(({title, path}) => (
                            <ListItem
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton size="large" sx={{color:'inherit'}}>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
            </Toolbar>
        </AppBar>
    );
}