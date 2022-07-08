import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const body = {name, email, cpf, password};
    const API = 'http://localhost:5000/sign-up';
    const navigate = useNavigate();

    async function Send(event){
        event.preventDefault();
        const isValidPassword = password === confirmPassword;

        if(!isValidPassword){
            return alert('Você não está confirmando sua senha corretamente.')
        }

        try{
            await axios.post(API, body);
            alert('Usuário cadastrado com sucesso!');
            setName('');
            setEmail('');
            setCPF('');
            setPassword('');
            setConfirmPassword('');
            navigate('/sign-in')

        } catch(error){
            return alert(error.response.data);
        }
    }  

    return(
        <Container>
            <form onSubmit={Send}>
                <img src={rocknvinil} alt='rocknvinil'/>
                <input type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type='text' placeholder='CPF' value={cpf} onChange={(e) => setCPF(e.target.value)} required/>
                <input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type='password' placeholder='Confirmar senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <button type='submit'>
                    Cadastrar
                </button>
            </form>
            <Link to='/sign-in' style={{textDecoration: 'none'}}>
                <h4>Já tem uma conta? Entre agora!</h4>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img{
        width: 200px;
        height: 117px;
        margin-bottom: 15px;
    }

    input {
        width: 326px;
        height: 58px;
        background-color: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 13px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 20px;
        border: none;
        outline: none;
    }

    input::placeholder{
        font-size: 20px;
        color: #000000;
    }

    button {
        width: 326px;
        height: 46px;
        border-radius: 5px; 
        margin-bottom: 32px;
        border: none;
        font-size: 20px;
        font-weight: 700;
        color: #F2F2F2;
        background-color: #A6A6A6;
    }

    button:hover{
        cursor: pointer;
    }

    h4{
        font-size: 15px;
        font-weight: 700;
        color: #F2F2F2; 
    }
`