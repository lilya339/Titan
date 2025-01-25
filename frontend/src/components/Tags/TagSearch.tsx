import { Autocomplete, TextField } from "@mui/material"
import Tag from "./Tag";
import { useRef, useState } from "react";

const TAGS = ["life", "power", "moment", "chance", "photographer", "wisdom", "truth"]

interface iTagSearchProps {
    className?: string;
    tags: Array<string>;
    setTags: (tags: Array<string>) => void;
}

export default function TagSearch(props: iTagSearchProps) {


    function onSearchChanged(_event: any, newValue: string | null) {
        const newTags = [...props.tags];

        if (props.tags.includes(newValue!)) return;
        if (newValue) {
            newTags.push(newValue);
            props.setTags(newTags);
        }

    }

    function onRemoveTag(tag: string) {
        const newTags = props.tags.filter((t) => t !== tag);
        props.setTags(newTags);
    }

    function getSelectedTags() {
        return props.tags.map((tag) => {
            return <Tag label={tag} onRemove={onRemoveTag} />
        });
    }

    return (
        <div className={`${props.className} gap-2`}>

            <Autocomplete
                onChange={onSearchChanged}
                className="w-100"
                options={TAGS}
                renderInput={(params) => <TextField {...params} label="Tag" size="small" />}
            />

            {props.tags.length > 0 && <div className="d-flex gap-2 mt-2">
                {getSelectedTags()}
            </div>}

        </div>

    )
}
