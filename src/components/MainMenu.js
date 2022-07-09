import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import PaginationComponent from './PaginationComponent';
import PaginationSelector from './PaginationSelector';
import Product from './Product';

export default function MainMenu () {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(products.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = products.slice(startIndex, endIndex);

    function getProducts () {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/products');
        promise.then((res) => {
            setProducts(res.data)
        });
        promise.catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])

    return (
        <Container>
            <Header setProducts={setProducts} getProducts={getProducts}/>
            <ProductsForSale>
                {
                    currentItens.length > 0 ? currentItens.map((product, index) => <Product key={index} albumName={product.albumName} albumYear={product.albumName} albumPic={product.albumPic} bandName={product.bandName} prize={product.prize} discount={product.discount} amountAvailable={product.amountAvailable} date={product.registryDay}/> )
                   : <h2>Não encontramos nenhum disco :(</h2>
                }
            </ProductsForSale>        
            <div>
                <PaginationComponent setCurrentPage={setCurrentPage} pages={pages}/>
                <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
            </div>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    flex-direction: column;
    h4 {
        font-size: 20px;
    }

`

const ProductsForSale=styled.div`
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

    div {
        display: flex;
        justify-content: space-between;
    }

    h2 {
        font-size: 20px;
        color: #000000;
    }

    h2:hover {
        cursor: pointer;
    }

    img {
        width: 100px;
        height: 70px;
    }

    input {

    }
`