import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container component={Paper}>
            <Typography variant="h5" gutterBottom>Page not found</Typography>
            <Divider />
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </Container>
    );
}