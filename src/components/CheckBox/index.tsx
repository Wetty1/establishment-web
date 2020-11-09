import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
    useRef,
    useEffect,
} from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const CheckBox: React.FC<PropsInput> = ({ name, label, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleOnFocused = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleOnBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'checked',
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            <input
                ref={inputRef}
                type="checkbox"
                defaultValue={defaultValue}
                name={name}
                id={name}
                {...rest}
            />{' '}
            <label htmlFor={name}>{label}</label>
        </Container>
    );
};

export default CheckBox;
