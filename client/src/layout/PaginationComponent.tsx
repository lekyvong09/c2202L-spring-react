import { Box, Pagination, Typography } from "@mui/material";
import { PaginationResponse } from "../model/pagination";


interface Props {
    pagination: PaginationResponse;
    onPageChange: (page: number) => void;
}


export default function PaginationComponent({pagination, onPageChange}: Props) {
    const {number, totalElements, totalPages, size} = pagination;

    return (
        <Box display='flex' justifyContent='space-between' alignContent='content'>
            <Typography>
                Display {(number * size) + 1}
                -
                {(number + 1) * size > totalElements ? totalElements : (number + 1) * size} of {totalElements} items
            </Typography>
            <Pagination 
                color="primary"
                count={totalPages}
                page={number + 1}
                onChange={(e, page) => {console.log(`page number ${page}`); onPageChange(page);}}
            />
        </Box>
    );
}