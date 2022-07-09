import styled from 'styled-components';
import axios from 'axios';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import rocknvinil from '../img/ROCK & VINIL2 1.png';
import UserContext from '../contexts/UserContext';

export default function NewProduct(){
    const [albumName, setAlbumName] = useState('');
    const [albumYear, setAlbumYear] = useState('');
    const [albumImage, setAlbumImage] = useState('');
    const [albumBand, setAlbumBand] = useState('');
    const [albumPrice, setAlbumPrice] = useState('');
    const [albumQuantity, setAlbumQuantity] = useState('');
    const [albumDiscount, setAlbumDiscount] = useState('');
    const API = 'https://projeto-14-rocknvinil-back.herokuapp.com/new-product';

    const body = {albumName, albumYear, albumImage, albumBand, albumPrice, albumQuantity, albumDiscount}
    const {token} = useContext(UserContext); 
    const config = {headers: {Authorization: `Bearer ${token}`}};
    async function Send(event){
        event.preventDefault();
        try{
            const response = await axios.post(API, body, config);
            alert('Produto registrado com sucesso!')
            console.log(response.data)
        } catch(error){
            alert('Opa! Algo deu errado :(.')
            console.log(error.response.data);
        }
        
    }

    return (
        <Container>
        <form onSubmit={Send}>
            <img src={rocknvinil} alt='rocknvinil'/>
            <input type='text' placeholder='nome do album' value={albumName} onChange={(e) => setAlbumName(e.target.value)} required/>
            <input type='text' placeholder='ano de lançamento' value={albumYear} onChange={(e) => setAlbumYear(e.target.value)} required/>
            <input type='text' placeholder='imagem' value={albumImage} onChange={(e) => setAlbumImage(e.target.value)} required/>
            <input type='text' placeholder='nome da banda' value={albumBand} onChange={(e) => setAlbumBand(e.target.value)} required/>
            <input type='number' placeholder='preço' value={albumPrice} onChange={(e) => setAlbumPrice(e.target.value)} required/>
            <input type='number' placeholder='quantidade disponível' value={albumQuantity} onChange={(e) => setAlbumQuantity(e.target.value)} required/>
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
        height: 38px;
        background-color: #FFFFFF;
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