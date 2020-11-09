import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
    useRef,
    useEffect,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    width?: string;
    value?: any;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<PropsInput> = ({
    name,
    icon: Icon,
    width,
    placeholder,
    ...rest
}) => {
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
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container
            width={width}
            isErrored={!!error}
            isFilled={isFilled}
            isFocused={isFocused}
            hasIcon={!!Icon}
        >
            {Icon && <Icon size={18} />}
            <input
                defaultValue={defaultValue}
                ref={inputRef}
                onFocus={handleOnFocused}
                onBlur={handleOnBlur}
                placeholder={placeholder}
                name={name}
                {...rest}
            />

            <span>{placeholder}</span>

            <span className="slidemotion" />
        </Container>
    );
};

export default Input;
