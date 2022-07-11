import styled from "styled-components";
import searchIcon from "../img/search.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


export default function SearchBar () {
    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);


    useEffect(() => {
        const promise = axios.get('https://projeto-14-rocknvinil-back.herokuapp.com/products')
        promise.then((response) => {
            setAllData(response.data);
            setFilteredData(response.data);
        });
        promise.catch((err) => {
            console.log(err);
        })
    }, []);

    const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        result = allData.filter((data) => {
            return data.albumName.search(value) != -1;
        });
        setFilteredData(result);
    }

    return (
        <Container>
            <SearchInputs>
                <input type='text' placeholder='Procure um álbum...' onChange={(event) =>handleSearch(event)} required />
                <img src={searchIcon} />
            </SearchInputs>
            <DataResult>
            {filteredData.map((value,index)=>{return(<div key={value.id}><div>{value.albumName}</div></div>)})}
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
    display:'inline';
    width:'30%',;
    height:50;
    float:'left';
    padding:5;
    border:0.5px solid black;
    margin-bottom:10px;
    margin-right:10px;
    display: flex;
`

const Album=styled.div`
`