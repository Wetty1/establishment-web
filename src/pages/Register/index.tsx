import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidateErrors from '../../utils/getValidateErrors'
import CheckBox from '../../components/CheckBox';
import { useAuth, SignUpCredentials } from '../../hooks/auth';

const Register: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signUp } = useAuth();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpCredentials) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                login: Yup.string().required('Campo login obrigatório'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
                name: Yup.string().required('Campo nome obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const newUser = await signUp(data);

            return history.push('/')
        } catch (err) {
            console.error(err);
            if (err instanceof Yup.ValidationError){
                const errors = getValidateErrors(err);
                formRef.current?.setErrors(errors);
            }
        }
    }, [history]);

    return (
        <Container>
            <Content>
                <Link to="/">Voltar</Link>
                <h2>Cadastrar-se</h2>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome"
                    />
                    <Input
                        type="text"
                        name="login"
                        placeholder="Login"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Senha"
                    />
                    <CheckBox name="level" label="Parceiro?"/>

                    <Button type="submit">
                        Cardastrar
                    </Button>
                </Form>
            </Content>
        </Container>
    );
}

export default Register;