import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    coloration?: 'success' | 'cancel' | 'primary';
}

const Button: React.FC<PropsButton> = ({
    children,
    coloration = 'primary',
    ...rest
}) => (
    <Container type="button" coloration={coloration} {...rest}>
        {children}
    </Container>
);

export default Button;
