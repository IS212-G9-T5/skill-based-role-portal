
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import { FormikTouched, useField, useFormikContext } from "formik";
import React from "react";

interface SelectWrapperProps {
    name: string,
    label: string,
    options: string,
    error: boolean,
    helperText: FormikTouched<any>

}
const SelectWrapper = ({
        name,
        options,
        ...otherProps }: SelectWrapperProps) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(name)



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

                return (
                  <MenuItem key={pos} value={item}>
                      {options[item]}
                  </MenuItem>
                )

            })}

                <MenuItem key={pos} value={item}>
                    {options[item]}
                </MenuItem>
            }
            )}
        </TextField>
    )
}
export default SelectWrapper