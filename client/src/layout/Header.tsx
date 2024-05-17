import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import * as React from 'react';

export default function Header(props: any) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">My Shop</Typography>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="warning"
                />
            </Toolbar>
        </AppBar>
    );
}