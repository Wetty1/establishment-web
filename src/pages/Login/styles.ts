import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 45%;
    height: 55%;
    border-radius: 15px;
    background-color: #691dbc;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        text-align: center;
        background-color: #691dbc;

        * {
            margin: 5px;
        }
    }

    a { 
        color: #fff;
        text-decoration: none;

        &:hover {
            color: #ccc;
            text-decoration: underline;
        }
    }
`;