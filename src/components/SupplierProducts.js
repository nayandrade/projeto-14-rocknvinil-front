import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Header from './Header';
import SupplierProduct from './SupplierProduct';

export default function SupplierProducts () {
    const { user, token } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    

    console.log(user, token)


    useEffect(() => {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/myproducts', {headers: {Authorization: `Bearer ${token}`}});
        promise.then((res) => {
            setProducts(res.data)
            console.log(res.data)
        });
        promise.catch((err) => {
            console.log(err);
        })
    }, []);

    console.log(user)

    return (
        <>
        <Header />
        <Container>
            <SupplierHeader>
                {
                    token ? <h2>Oi, { user.name }! </h2> : <h2><Link to='/sign-in'>Faça login para continuar!</Link> </h2>
                }
                
                <h3>Obrigada por contribuir com nossa loja!</h3>
                <button onClick={() => navigate('/new-product')}>+</button>
            </SupplierHeader>           
            <ProductsForSale>
            <div>
                {
                    products.length > 0 ? (
                    products.map((product, index) => <SupplierProduct key={index} albumName={product.albumName} albumYear={product.albumYear} albumImage={product.albumImage} bandName={product.albumBand} prize={product.albumPrice} discount={product.albumDiscount} amountAvailable={product.albumQuantity} date={product.registerDate}/> ))
                    :
                    <h4>Você ainda não possui um produto à venda.</h4>
                }
            </div>                
            </ProductsForSale>
        </Container>
        </>
    )
}

const Container=styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    h4 {
        font-size: 20px;
    }

    a { 
        text-decoration: none;
    }

    a:visited { 
        text-decoration: none;
    }
`
const SupplierHeader=styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
    border-radius: 10px;
    background-color: #0d0d0d;
    margin-top: 100px;

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
        border: 2px solid #ffffff;   
    }

    button:hover {
        cursor: pointer;
    }
`

const ProductsForSale=styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #0d0d0d;
    overflow: hidden;
`