import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ServerError() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Container component={Paper}>
            <Typography variant="h5" gutterBottom>Server Error</Typography>
            <div>{location.state ? location.state.error : 'Internal server error' }</div>
            <Divider />
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </Container>
    );
}