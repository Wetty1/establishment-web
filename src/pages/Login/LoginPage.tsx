import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { Container, Content } from './styles';
import { FiUser, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';

import getValidateErrors from "../../utils/getValidateErrors";
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth, SignInCredentials } from '../../hooks/auth';
import { Link, useHistory } from 'react-router-dom';

const LoginPage: React.FC = () =>{ 
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignInCredentials) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                login: Yup.string().required('Login obrigatório'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const user = await signIn(data);

            return history.push('/home')
        } catch (err) {
            console.error(err);
            if (err instanceof Yup.ValidationError){
                const errors = getValidateErrors(err);
                formRef.current?.setErrors(errors);
            }
        }
    }, [history, signIn]);

    return (
    <Container>
        <Content>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="login"
                    icon={FiUser}
                    placeholder="Login"
                />
                <Input
                    type="password"
                    name="password"
                    icon={FiLock}
                    placeholder="Senha"
                />
                <Button type="submit">
                    Entrar
                </Button>
                <Link to="/register">Cadastrar-se</Link>
            </Form>
        </Content>
    </Container>
);
}
export default LoginPage;