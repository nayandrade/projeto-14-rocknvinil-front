import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';
import UserContext from '../contexts/UserContext';

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validInput, setValidInput] = useState(true);
    const inputElement = useRef();

    const body = {email, password};
    const serialData = localStorage.getItem('data');
    const data = JSON.parse(serialData);
    const {token, setToken} = useContext(UserContext);

    const navigate = useNavigate();
    //const API = 'https://projeto-14-rocknvinil-back.herokuapp.com/sign-in';
    const API = 'http://localhost:5000/sign-in';
    
    function Autologin(data){
        if(data){
            setEmail(data.email);
            setPassword(data.password);
        }
    }
    useEffect(() => {Autologin(data)}, [])

    async function Send(event){
        event.preventDefault()

        try{
            const response = await axios.post(API, body);
            alert('Acesso realizado com sucesso!');
            localStorage.setItem(`data`, JSON.stringify(body));
            setEmail('');
            setPassword('');
            setToken(response.data);
            navigate('/');
            
        } catch(error){
            setValidInput(false);
            inputElement.current.focus();
            return alert(error.response.data);
        }
    }
    
    return(
        <Container backgroundColor={validInput ? '#FFFFFF' : '#EA8E86'}>
            <form onSubmit={Send}>
                <img src={rocknvinil} alt='rocknvinil'/>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} ref={inputElement} required/>
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
    position: fixed;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    background-color: #0D0D0D;

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
        height: 38px;
        background-color: ${props => props.backgroundColor};
        border-radius: 5px;
        margin-bottom: 13px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 18px;
        border: none;
        outline: none;
    }

    input::placeholder{
        font-size: 18px;
        color: #000000;
    }

    button {
        width: 326px;
        height: 46px;
        border-radius: 5px; 
        margin-bottom: 32px;
        border: none;
        font-size: 18px;
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