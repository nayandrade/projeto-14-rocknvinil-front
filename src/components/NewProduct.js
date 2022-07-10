import styled from 'styled-components';
import axios from 'axios';
import { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    const [validAlbumName, setValidAlbumName] = useState(true);
    const [validAlbumYear, setValidAlbumYear] = useState(true);
    const [validAlbumImage, setValidAlbumImage] = useState(true);
    const [validAlbumBand, setValidAlbumBand] = useState(true);
    const [validAlbumPrice, setValidAlbumPrice] = useState(true);
    const [validAlbumQuantity, setValidAlbumQuantity] = useState(true);
    const [validAlbumDiscount, setValidAlbumDiscount] = useState(true);

    const inputAlbumName = useRef();        
    const inputAlbumYear = useRef();        
    const inputAlbumImage = useRef();
    const inputAlbumBand = useRef();       
    const inputAlbumPrice = useRef();
    const inputAlbumQuantity = useRef();
    const inputAlbumDiscount = useRef(); 
    
    const body = {albumName, albumYear, albumImage, albumBand, albumPrice, albumQuantity, albumDiscount}
    const {token} = useContext(UserContext); 
    const config = {headers: {Authorization: `Bearer ${token}`}};
    const API = 'https://projeto-14-rocknvinil-back.herokuapp.com/new-product';
    const navigate = useNavigate();

    async function Send(event){
        event.preventDefault();
        try{
            const response = await axios.post(API, body, config);
            alert('Produto registrado com sucesso!')
            navigate('/');
        } catch(error){
            const errorMessage = error.response.data;
            console.log(errorMessage);

            setValidAlbumName(true);
            setValidAlbumYear(true);
            setValidAlbumImage(true);
            setValidAlbumBand(true);
            setValidAlbumPrice(true);
            setValidAlbumQuantity(true);
            setValidAlbumDiscount(true);

            if(errorMessage === 'Album name must be a non-empty valid string.'){
                setValidAlbumName(false);
                return inputAlbumName.current.focus();
            }

            if(errorMessage === 'Album year must be a valid year.'){
                setValidAlbumYear(false);
                return inputAlbumYear.current.focus();
            }

            if(errorMessage === 'Image link is not valid.'){
                setValidAlbumImage(false);
                console.log(validAlbumImage)
                return inputAlbumImage.current.focus();
            }

            if(errorMessage === 'Album band must be a non-empty valid string.'){
                setValidAlbumBand(false);
                return inputAlbumBand.current.focus();
            }

            if(errorMessage === 'Album price must contain only numbers.'){
                setValidAlbumPrice(false);
                return inputAlbumPrice.current.focus();
            }

            if(errorMessage === 'Album quantity must a positive integer.'){
                setValidAlbumQuantity(false);
                return inputAlbumQuantity.current.focus();
            }

            if(errorMessage === 'Album discount must be a number between 0 and 100.'){
                setValidAlbumDiscount(false);
                return inputAlbumDiscount.current.focus();
            }
        }
        
    }

    return (
        <Container nameBackground={validAlbumName ? '#FFFFFF' : '#EA8E86'}
                   yearBackground={validAlbumYear ? '#FFFFFF' : '#EA8E86'}
                   imageBackground={validAlbumImage ? '#FFFFFF' : '#EA8E86'}
                   bandBackground={validAlbumBand ? '#FFFFFF' : '#EA8E86'}
                   priceBackground={validAlbumPrice ? '#FFFFFF' : '#EA8E86'}
                   quantityBackground={validAlbumQuantity ? '#FFFFFF' : '#EA8E86'}
                   discountBackground={validAlbumDiscount ? '#FFFFFF' : '#EA8E86'}>
        <form onSubmit={Send}>
            <img src={rocknvinil} alt='rocknvinil'/>
            <input id='name' type='text' placeholder='nome do album' value={albumName} onChange={(e) => setAlbumName(e.target.value)} ref={inputAlbumName} required/>
            <h5 id='name' className={`${validAlbumName ? 'hidden' : ''}`}>Nome inválido</h5>
            
            <input id='year' type='text' placeholder='ano de lançamento' value={albumYear} onChange={(e) => setAlbumYear(e.target.value)} ref={inputAlbumYear} required/>
            <h5 id='year' className={`${validAlbumYear ? 'hidden' : ''}`}>Ano inválido</h5>
            
            <input id='image' type='text' placeholder='imagem' value={albumImage} onChange={(e) => setAlbumImage(e.target.value)} ref={inputAlbumImage} required/>
            <h5 id='image' className={`${validAlbumImage ? 'hidden' : ''}`}>Link inválido</h5>
            
            <input id='band' type='text' placeholder='nome da banda' value={albumBand} onChange={(e) => setAlbumBand(e.target.value)} ref={inputAlbumBand} required/>
            <h5 id='band' className={`${validAlbumBand ? 'hidden' : ''}`}>Nome de banda inválido</h5>
            
            <input id='price' type='number' min={0} placeholder='preço' value={albumPrice} onChange={(e) => setAlbumPrice(e.target.value)} ref={inputAlbumPrice} required/>
            <h5 id='price' className={`${validAlbumPrice ? 'hidden' : ''}`}>Campo inválido</h5>
            
            <input id='quantity' type='number' min={0} placeholder='quantidade disponível' value={albumQuantity} onChange={(e) => setAlbumQuantity(e.target.value)} ref={inputAlbumQuantity} required/>
            <h5 id='quantity' className={`${validAlbumQuantity ? 'hidden' : ''}`}>Campo inválido</h5>
            
            <input id='discount' type='number' min={0} placeholder='% de desconto' value={albumDiscount} onChange={(e) => setAlbumDiscount(e.target.value)} ref={inputAlbumDiscount} required/>
            <h5 id='discount' className={`${validAlbumDiscount ? 'hidden' : ''}`}>Campo inválido</h5>
            
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
        margin-bottom: 15px;
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

    input#year {
        background-color: ${props => props.yearBackground};
    }

    input#image {
        background-color: ${props => props.imageBackground};
    }

    input#band {
        background-color: ${props => props.bandBackground};
    }

    input#price {
        background-color: ${props => props.priceBackground};
    }

    input#quantity {
        background-color: ${props => props.quantityBackground};
    }

    input#discount {
        background-color: ${props => props.discountBackground};
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