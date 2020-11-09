import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useEstablishment, ICreateNewEstablishment } from '../../hooks/establishment';
import getValidateErrors from '../../utils/getValidateErrors'

const NewEstablishment: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { createEstablishment } = useEstablishment();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ICreateNewEstablishment) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                address: Yup.string().required('Campo endereço obrigatório'),
                neighborhood: Yup.string().min(6, 'No minimo 6 digitos'),
                city: Yup.string().required('Campo cidade obrigatório'),
                type: Yup.string().required('Campo tipo obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const newEstablishment = await createEstablishment(data);

            return history.push('/home')
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
                <Link to="/home">Voltar</Link>
                <h2>Novo Estabelecimento</h2>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                    />
                    <p>Rua exemplo, 1234</p>
                    <Input
                        type="text"
                        name="neighborhood"
                        placeholder="Bairro"
                    />
                    <p>Aldeota, Jóquei Club...</p>
                    <Input
                        type="text"
                        name="city"
                        placeholder="Cidade"
                    />
                    <p>Fortaleza, Caucaia...</p>

                    <Input
                        type="text"
                        name="type"
                        placeholder="tipo"
                    />
                    <p>Restaurante, Shopping...</p>

                    <Button type="submit">
                        Enviar
                    </Button>
                </Form>
            </Content>
        </Container>
    );
}

export default NewEstablishment;