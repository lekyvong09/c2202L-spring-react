import { AppBar, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
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

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >My Shop</Typography>
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
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}

                </List>
            </Toolbar>
        </AppBar>
    );
}