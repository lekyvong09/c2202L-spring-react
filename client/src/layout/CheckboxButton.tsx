import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[],
    currentChecked?: string[],
    onChange: (items: string[]) => void;
}

export default function CheckboxButton({items, currentChecked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(currentChecked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(i => i === value);

        let newChecked: string[] = [];
        if (currentIndex === -1) {
            newChecked = [...checkedItems, value];
        } else {
            newChecked = checkedItems.filter(i => i !== value);
        }

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map((item: string) => (
                <FormControlLabel 
                    label={item}
                    key={item}
                    control={<Checkbox 
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                />
            ))

            }
        </FormGroup>
    );
}