import React from 'react';
import {TextField} from '@mui/material';
import {MenuItem} from "@mui/material";
import {useField, useFormikContext} from 'formik';
interface SelectWrapperProps {
    name: string,
    options: string[]
}
const SelectWrapper = ({
        name,
        options,
        ...otherProps }: SelectWrapperProps) => {
    const { setFieldValue } = useFormikContext()
    const [field, metadata] = useField(name)


    const handleChange = evt => {
        const {value} = evt.target
        setFieldValue(name, value)

    }
    const configSelect = {
        ...field,
        ...otherProps,
        select:true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange
    }

    if (metadata && metadata.touched && metadata.error) {
        configSelect.error = true
        configSelect.helperText = metadata.error
    }
    return (
        <TextField {...configSelect}>
            {Object.keys(options).map((item,pos) =>
            {
                <MenuItem key={pos} value={item}>
                    {options[item]}
                </MenuItem>
            }
            )}
        </TextField>
    )
}
export default SelectWrapper