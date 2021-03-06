import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Button = styled.button`
    border: none;
    border-radius: 10px;
    height: 30px;
    color: #691dbc;
    background-color: #14f484;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    span {
        text-decoration: none;
        text-decoration-line: none;
        white-space: wrap;
        font-weight: bold;
    }
`

export const Header = styled.div`
    width: 100%;
    height: 55px;
    background-color: #0fcdce;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
`;

export const InputSearch = styled.div`
    height: 30px;
    width: 30%;
    background-color: #f4f4f4;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    margin-left: 50px;

    svg {
        color: #691dbc;
        margin: auto 10px; 
    }

    input {
        background-color: transparent;
        border: none;
        width: 100%;
        height: 100%
    }
`;

export const Content = styled.div`
    width: 100%;
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: row;

    > div:last-child {
        width: 100%;
        height: 100%;
    }
`;

export const SideBar = styled.div`
    width: 20%;
    height: 100%;
    min-width: 230px;
    background-color: #f4f4f4;
    color: #691dbc;
    box-shadow: 3px 2px 5px 1px #2222;

    form {
        padding: 20px;

        > div {
            margin: 5px;

            div {
                margin: 5px 0;
            }
        }

        button {
            width: 120px;
            font-weight: bold;
            margin-top: 15px;
        }
    }
`;

export const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 30px;
    position: relative;

    div { 
        background-color: #691dbc;
        color: #fff;
        padding: 10px 15px;
        position: absolute;
        opacity: 0;
        width: 120px;
        border-radius: 15px;
        top: 0px;
        right: -5px;
        max-width: 30px;
        transition: all 250ms ease-in-out;

        span {
            font-weight: bold;
            cursor: pointer;
        }

        &:hover {
            min-width: 130px;
            opacity: 1;

        }
    }

    > span {
        color: #691dbcaa;
    }

    > p{
        color: #691dbc;
        font-size: 18px;
        font-weight: 500;
    }
`