import React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import {useField} from 'formik'

interface TextareaWrapperProps {
    name: string,
    label: string,
    error: boolean,
    placeholder: string
}
const TextareaWrapper  = ({
    name: name,
    ...otherProps
                          }: TextareaWrapperProps) => {
    const [field] = useField(name);

    const configTextarea = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    }

    if (metadata && metadata.touched && metadata.error){
        configTextarea.error = true
        configTextarea.helperText = metadata.error
    }
    return (
        <TextareaAutosize {...configTextarea} />
    )
};

export default TextareaWrapper;
