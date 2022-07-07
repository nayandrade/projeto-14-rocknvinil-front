import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SupplierContext from '../contexts/SupplierContext';
import Header from './Header'

export default function SupplierProducts () {
    const { supplier } = useContext(SupplierContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/products', {headers: {Authorization: `Bearer ${user.token}`}});
        promise.then((res) => {
            setProducts(res.data)
        });
        promise.catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <Container>
            <Header />
            <h2>Oi, { supplier.name } </h2>
            <h3>Confira aqui seus vinis à venda!</h3>
            <ProductsForSale>
            <div>
                {
                    products.length > 0 ? (
                    products.map((product, index) => <SupplierProduct key={index} albumName={product.albumName} albumYear={product.albumName} albumPic={product.albumPic} bandName={product.bandName} prize={product.prize} discount={product.discount} amountAvailable={product.amountAvailable} date={product.registryDay}/> ))
                    :
                    <ZeroProducts>Você ainda não possui um produto a venda. Cadastre um aqui!</ZeroProducts>
                }
            </div>                
            </ProductsForSale>
        </Container>
    )
}