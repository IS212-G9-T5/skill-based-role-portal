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

    return (
        <TextareaAutosize {...configTextarea} />
    )
};

export default TextareaWrapper;
