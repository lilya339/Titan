import { Button, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: '1px solid var(--text-dark)',
            outline: 'none'
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: `var(--primary-color)`, // Label color when focused
    },
})

export const StyledButton = styled(Button)({
    "&.MuiButton-root": {
        backgroundColor: `var(--primary-color)`,
        color: `var(--white)`,
        "&:hover": {
            backgroundColor: `var(--primary-color-dark)`,
        }
    }
});