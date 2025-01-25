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

export const StyledChip = styled(StyledTag)({

    "&.MuiChip-root": {
        cursor: 'pointer',
        color: "var(--text-light)",
        backgroundColor: `var(--primary-color-light)`,

        "&:hover": {
            "& .MuiChip-icon": {
                fill: "var(--gray)",
            }
        },

        "& .MuiChip-icon": {
            fill: "var(--background-light)",
        }
    },
});

