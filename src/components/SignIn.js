import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const body = {email, password};
    const API = 'http://localhost:5000/';

    async function Send(event){
        event.preventDefault()

        try{
            //await axios.post(API, body);
            alert('Acesso realizado com sucesso!')
            setEmail('');
            setPassword('');

        } catch(error){
            return alert(error.response.data);
        }
    }
    
    return(
        <Container>
            <form onSubmit={Send}>
                <img src={rocknvinil} alt='rocknvinil'/>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit'>
                    Entrar
                </button>
            </form>
            <Link to='/sign-up' style={{textDecoration: 'none'}}>
                <h4>É novo por aqui? Cadastre-se!</h4>
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
        margin-top: 43px;
        margin-bottom: 43px;
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