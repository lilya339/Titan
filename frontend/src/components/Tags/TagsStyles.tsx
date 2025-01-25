import { Chip, styled } from "@mui/material";

export const StyledTag = styled(Chip)({
    "&.MuiChip-root": {
        fontSize: "14px",
        padding: "6px 12px",
        color: "var(--text-dark)",
        backgroundColor: `var(--background-light)`,
        border: 'none'
    }
});