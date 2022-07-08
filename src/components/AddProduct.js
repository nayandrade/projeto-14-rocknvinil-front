import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';

export default function AddProduct(){
    const [albumName, setAlbumName] = useState('');
    const [albumYear, setAlbumYear] = useState('');
    const [albumBand, setAlbumBand] = useState('');
    const [albumImage, setAlbumImage] = useState('');
    const [albumPrize, setAlbumPrize] = useState('');
    const [albumDiscount, setAlbumDiscount] = useState('');

    return (
        <Container>
        <form>
            <img src={rocknvinil} alt='rocknvinil'/>
            <input type='text' placeholder='nome do album' value={albumName} onChange={(e) => setAlbumName(e.target.value)} required/>
            <input type='text' placeholder='ano de lançamento' value={albumYear} onChange={(e) => setAlbumYear(e.target.value)} required/>
            <input type='text' placeholder='imagem' value={albumImage} onChange={(e) => setAlbumImage(e.target.value)} required/>
            <input type='text' placeholder='nome da banda' value={albumBand} onChange={(e) => setAlbumBand(e.target.value)} required/>
            <input type='number' placeholder='preço' value={albumPrize} onChange={(e) => setAlbumPrize(e.target.value)} required/>
            <input type='number' placeholder='% de desconto' value={albumDiscount} onChange={(e) => setAlbumDiscount(e.target.value)} required/>
            <button type='submit'>
                Cadastrar produto
            </button>
        </form>
        <Link to='/' style={{textDecoration: 'none'}}>
            <h4>Voltar</h4>
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
        height: 48px;
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