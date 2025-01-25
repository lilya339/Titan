import CloseIcon from '@mui/icons-material/Close';
import { StyledChip } from "./TagsStyles";

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
