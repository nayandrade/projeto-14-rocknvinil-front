import styled from 'styled-components';
import { Link } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';

export default function SignUp(){
    return(
        <Container>
            <img src={rocknvinil}/>
            <input type='text' placeholder='Nome' required/>
            <input type='email' placeholder='Email' required/>
            <input type='text' placeholder='CPF' required/>
            <input type='password' placeholder='Senha' required/>
            <input type='password' placeholder='Confirmar senha' required/>
            <button>
                Cadastrar
            </button>
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

    img{
        width: 150px;
        height: 72px;
        margin-top: 30px;
        margin-bottom: 30px;
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