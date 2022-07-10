import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validCPF, setValidCPF] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);

    const inputName = useRef();
    const inputEmail = useRef();
    const inputCPF = useRef();
    const inputPassword = useRef();
    const inputConfirmPassword = useRef();

    const body = {name, email, cpf, password};
    const API = 'https://projeto-14-rocknvinil-back.herokuapp.com/sign-up';
    const navigate = useNavigate();

    async function Send(event){
        event.preventDefault();
        const isValidPassword = (password === confirmPassword);

        if(!isValidPassword){
            setValidConfirmPassword(false)
            inputConfirmPassword.current.focus();
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
            const errorMessage = error.response.data;

            setValidName(true);
            setValidEmail(true);
            setValidCPF(true);
            setValidPassword(true);
            setValidConfirmPassword(true);

            if(errorMessage === ('User name is not available.' || 'Invalid name.')){
                setValidName(false);
                return inputName.current.focus();
            }   

            if(errorMessage === ('User email is not available.' || 'Invalid email.')){
                setValidEmail(false);
                return inputEmail.current.focus();
            }

            if(errorMessage === ('User CPF is not available.' || 'Invalid CPF. Please, type numbers, only.')){
                setValidCPF(false);
                return inputCPF.current.focus();
            }

            if(errorMessage === 'Invalid password.'){
                setValidPassword(false);
                return inputPassword.current.focus();
            }
        }
    }  

    return(
        <Container nameBackground={validName ? '#FFFFFF' : '#EA8E86'}
                   emailBackground={validEmail ? '#FFFFFF' : '#EA8E86'}
                   CPFBackground={validCPF ? '#FFFFFF' : '#EA8E86'}
                   passwordBackground={validPassword ? '#FFFFFF' : '#EA8E86'}
                   confirmPasswordBackground={validConfirmPassword ? '#FFFFFF' : '#EA8E86'}>
            <form onSubmit={Send}>
                <img src={rocknvinil} alt='rocknvinil'/>
                
                <input id='name' type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} ref={inputName} required/>
                <h5 id='name' className={`${validName ? 'hidden' : ''}`}>Esse nome já está cadastrado.</h5>
                
                <input id='email' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} ref={inputEmail} required/>
                <h5 id='email' className={`${validEmail ? 'hidden' : ''}`}>Esse email já está cadastrado.</h5>
                
                <input id= 'CPF' type='text' placeholder='CPF' value={cpf} onChange={(e) => setCPF(e.target.value)} ref={inputCPF} required/>
                <h5 id='CPF' className={`${validCPF ? 'hidden' : ''}`}>Esse CPF já está cadastrado.</h5>

                <input id='password' type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} ref={inputPassword} required/>
                <h5 id='password' className={`${validPassword ? 'hidden' : ''}`}>Senha inválida.</h5>
                
                <input id='confirmPassword' type='password' placeholder='Confirmar senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ref={inputConfirmPassword} required/>
                <h5 id='confirmPassword' className={`${validConfirmPassword ? 'hidden' : ''}`}>A senha que você digitou é diferente.</h5>
                
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
    position: fixed;
    left: 0px;
    height: 100%;
    width: 100%;
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
        border-radius: 5px;
        margin-top: 13px;
        margin-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 18px;
        border: none;
        outline: none;
    }

    input#name {
        background-color: ${props => props.nameBackground};
    }

    input#email {
        background-color: ${props => props.emailBackground};
    }

    input#CPF {
        background-color: ${props => props.CPFBackground};
    }

    input#password {
        background-color: ${props => props.passwordBackground};
    }

    input#confirmPassword {
        background-color: ${props => props.confirmPasswordBackground};
    }

    input::placeholder{
        font-size: 18px;
        color: #000000;
    }

    button {
        width: 326px;
        height: 46px;
        border-radius: 5px; 
        margin-top: 13px;
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

    h5{
        color: #FFFFFF; 
    }
`