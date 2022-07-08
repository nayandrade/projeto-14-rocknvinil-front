import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SupplierContext from '../contexts/supplierContext';
import Header from './Header';
import SupplierProduct from './SupplierProduct';
import logo from '../logo/logo.png'

export default function SupplierProducts () {
    const { supplier } = useContext(SupplierContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/products', {headers: {Authorization: `Bearer ${supplier.token}`}});
        promise.then((res) => {
            setProducts(res.data)
        });
        promise.catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <Container>
            <Header>
                <MainHeader>
                    <div>
                        <h2 onClick={() => navigate('/login')}>Entrar</h2>
                        <h2 onClick={() => navigate('/cart')}>Carrinho</h2>
                    </div>
                    <div>
                        <img src={logo} />
                    </div>
                    <div>
                        <h2>Buscar</h2>
                        <h2 onClick={() => navigate('/')}>Vinis</h2>
                        <h2 onClick={() => navigate('/myproducts')}>Meus produtos</h2>
                    </div>  
                </MainHeader>
            </Header>
            <SupplierHeader>
                <h2>Oi, { supplier.name } </h2>
                <h3>Obrigada por contribuir com nossa loja!</h3>
                <button onClick={() => navigate('/addproduct')}>+</button>
            </SupplierHeader>           
            <ProductsForSale>
            <div>
                {
                    products.length > 0 ? (
                    products.map((product, index) => <SupplierProduct key={index} albumName={product.albumName} albumYear={product.albumName} albumPic={product.albumPic} bandName={product.bandName} prize={product.prize} discount={product.discount} amountAvailable={product.amountAvailable} date={product.registryDay}/> ))
                    :
                    <h4>Você ainda não possui um produto à venda. Cadastre um aqui!</h4>
                }
            </div>                
            </ProductsForSale>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h4 {
        font-size: 20px;
    }

`
const SupplierHeader=styled.div`
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
    background-color: #000000;
    opacity: 0.7;
    
    h2 {
        font-size: 25px;
    }

    h3 {
        font-size: 20px;
    }

    button {
        width: 50px;
        height: 50px;
        border-radius: 50%;        
    }

    button:hover {
        cursor: pointer;
    }
`

const ProductsForSale=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #000000;
    opacity: 0.7;
    overflow: scroll;
`

const MainHeader=styled.div`
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h2 {
        font-size: 25px;
        color: #000000;
    }

    h2:hover {
        cursor: pointer;
    }

    img {
        width: 60px;
        height: 100px;
    }
`