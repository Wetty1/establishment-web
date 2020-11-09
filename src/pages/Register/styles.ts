import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 55%;
    height: 75%;
    border-radius: 15px;
    background-color: #691dbc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    h2 {
        color: #f4f4f4;
        margin-bottom: 18px;
    }

    a {
        position: absolute;
        top: 15px;
        left: 15px;
        color: #fff;
        text-decoration: none;

        &:hover {
            color: #ccc;
            text-decoration: underline;
        }
    }

    form {
        text-align: center;
        background-color: #691dbc;

        >div, button {
            margin-top: 8px;
        }

        p {
            color: #fff;
            font-size: 10px;
            margin: 1px;
        }

        label {
            color: #fff;
        }

        button {
            margin: 8px auto;
        }
    }

`;