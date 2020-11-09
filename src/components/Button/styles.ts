import styled, { css } from 'styled-components';
import { darken, shade } from 'polished';

interface ButtonStyled {
    coloration?: 'success' | 'cancel' | 'primary';
}

const stylesButton = {
    primary: css`
        color: #691dbc;
        background: #14f484;

        &:hover {
            color: #691dbc;
            background: ${shade(0.2, '#14f484')};
        }
    `,
    success: css`
        color: #72cc44;

        &:hover {
            color: ${shade(0.2, '#72cc44')};
        }

        &:active {
            color: ${darken(0.2, '#72cc44')};
        }
    `,
    cancel: css`
        color: #888;

        &:hover {
            color: ${shade(0.2, '#888')};
        }

        &:active {
            color: ${darken(0.2, '#888')};
        }
    `,
};

export const Container = styled.button<ButtonStyled>`
    ${props => {
        switch (props.coloration) {
            case 'cancel':
                return stylesButton.cancel;
            case 'success':
                return stylesButton.success;
            default:
                return stylesButton.primary;
        }
    }}

    display: flex;
    align-items: center;
    border: 0.5px solid #6666;
    border-radius: 5px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 12px;
    margin-left: 4px;
    padding: 10px 15px;
    transition: background 0.2ms;

    svg {
        width: 18px;
        height: 18px;
    }
`;
