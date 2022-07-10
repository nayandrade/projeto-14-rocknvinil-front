import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import PaginationComponent from './PaginationComponent';
import PaginationSelector from './PaginationSelector';
import Product from './Product';
import UserContext from '../contexts/UserContext';

export default function MainMenu () {
    const [products, setProducts] = useState([]);
    const { user, token } = useContext(UserContext);
    // const [itensPerPage, setItensPerPage] = useState(10);
    // const [currentPage, setCurrentPage] = useState(0);

    function getProducts () {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/products', {headers: {Authorization: `Bearer ${token}`}});
        promise.then((res) => {
            setProducts(res.data)
            console.log(res.data)
        });
        promise.catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProducts();
    }, []);

    // useEffect(() => {
    //     setCurrentPage(0)
    // }, [itensPerPage])

    // const pages = Math.ceil(products.length / itensPerPage);
    // const startIndex = currentPage * itensPerPage;
    // const endIndex = startIndex + itensPerPage;
    // const currentItens = products.slice(startIndex, endIndex);

   
    return (
        <>
        <Header />
        <Container>
            <ProductsForSale>
                {
                    products.length > 0 ? products.map((product, index) => <Product key={index} albumId = {product._id} albumName={product.albumName} albumYear={product.albumYear} albumImage={product.albumImage} bandName={product.albumBand} prize={product.albumPrice} discount={product.albumDiscount} amountAvailable={product.amountQuantity} date={product.registerDate}/> )
                   : <h2>Não encontramos nenhum disco </h2>
                }
            </ProductsForSale>        
            <div>
                {/* <PaginationComponent setCurrentPage={setCurrentPage} pages={pages}/>
                <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/> */}
            </div>
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

    div {
        width: 100%;
    }

`

const ProductsForSale=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60%;
    border-radius: 10px;
    color: #ffffff;
    background-color: #0D0D0D;
    overflow: hidden;
`
