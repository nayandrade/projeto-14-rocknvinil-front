import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext.js"
import { useNavigate } from "react-router-dom"

export default function Product ({ albumName, albumYear, albumId, albumImage, bandName, prize, discount}) {
    const { token, setLoading } = useContext(UserContext);
    const [actualPrize, setActualPrize] = useState(prize);
    const navigate = useNavigate();

    function SendToCard(albumId) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        console.log(albumId)
        const promise = axios.post("https://projeto-14-rocknvinil-back.herokuapp.com/cart", {
            _id: albumId,
        }, config)
        promise.then(response => {
            console.log(response)
            setLoading(true)
            
        })
        promise.catch(error => {
            console.error(error)
        })
    }

    function calculatePrize () {
        if (discount !== 0) {
            setActualPrize = prize * ((100 - discount) / 100 )
        }
    }

    return (
        <Container>
            <Album>
                <AlbumPic>
                    <img src={albumImage} />
                </AlbumPic>
                <AlbumInfo>
                    <h4>{albumName}</h4>
                    <h3>{albumYear}</h3>
                    <h3>{bandName}</h3>
                    <h3>Preço: R$ {actualPrize}</h3>  
                    <h3><button onClick={() => SendToCard(albumId)}>+</button> Adicionar ao carrinho</h3>              
                </AlbumInfo>
            </Album>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    width: 40%;
    height: 30%;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
    padding: 5px;
    border: 2px solid #f2f2f2;
    border-radius: 10px;
    overflow: hidden;

`

const Album=styled.div`
    display: flex;
    margin: 10px;

`

const AlbumPic=styled.div`
    img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
`

const AlbumInfo=styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;


    h4 {
        font-size: 25px;
        margin-bottom: 5px;
    }

    h3 {
        font-size: 16px;
        margin-bottom: 8px;
    }
    button {
        background-color: #f2f2f2;
        margin-right: 10px;
        box-shadow: 0px 4px 3px rgba(242, 242, 242, 0.2);
        border: none;
    }
    button:active {
        transform: translateY(2px);
        box-shadow: 0px 2px 4px rgba(242, 242, 242, 0.2);

    }
`