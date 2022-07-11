import styled from "styled-components";
import searchIcon from "../img/search.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


export default function SearchBar () {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/products/')
        promise.then((res) => {
            setProducts(res.data)
        });
        promise.catch((err) => {
            console.log(err);
        })
    }, []); 

    return (
        <Container>
            <SearchInputs>
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} required />
                <img src={searchIcon} />
            </SearchInputs>
            <DataResult>
                {products.map((value, key) => {
                    return (
                        <Link to=''>
                            <p>{value.albumName}</p>
                        </Link>
                    )
                })}
            </DataResult>
        </Container>
    )
}

const Container=styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`

const SearchInputs=styled.div`
    display: flex; 
    align-items: center;
    justify-content: center;

    img {
        width: 20px;
        height: 20px;
        margin-top: 10px;
        padding-right: 10px;
    }
    
    input {
        width: 100%;
        padding-left: 20px;
        height: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
        color: #fff;
    }

`

const DataResult=styled.div`
    margin-top: 10px;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction-column;
    justify-content: left;
    overflow: hidden;
    overflow-y: auto;
`