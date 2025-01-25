import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { StyledTag } from "./TagsStyles";

const StyledChip = styled(StyledTag)({

    "&.MuiChip-root": {
        cursor: 'pointer',
        color: "var(--background-light)",
        backgroundColor: `var(--primary-color-light)`,

        "& .MuiChip-icon": {
            fill: "var(--background-light)",
        }
    },
});

interface iTagProps {
    label: string;
    onRemove: (tag: string) => void;
}

export default function Tag(props: iTagProps) {

    function onClickRemove() {
        props.onRemove(props.label);
    }

    return (
        <StyledChip
            variant="outlined"
            label={props.label}
            icon={<CloseIcon onClick={onClickRemove} fontSize="small" />}
        />
    )
}
