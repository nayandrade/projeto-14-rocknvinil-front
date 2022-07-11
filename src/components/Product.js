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
        <Container onClick={() => SendToCard(albumId)}>
            <AlbumPic>
                <img src={albumImage} />
            </AlbumPic>
            <AlbumInfo>
                <h4>{albumName}</h4>
                <h3>{albumYear}</h3>
                <h3>{bandName}</h3>
                <h3>Preço: {actualPrize}</h3>                
            </AlbumInfo>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    width: 80vw;
    height: 80px;
    border: 2px solid #f2f2f2;
    border-radius: 10px;
`

const AlbumPic=styled.div`
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`

const AlbumInfo=styled.div`
    display: flex;
    flex-direction: column;

    h4 {
        font-size: 15px;
    }

    h3 {
        font-size: 12px;
    }
`