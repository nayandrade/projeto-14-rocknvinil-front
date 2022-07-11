import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../contexts/UserContext.js"

export default function CheckoutItem({key, albumName, albumPic, albumYear, bandName, discount, disponibility, price, quantity, buyerQuantity, supplierId, supplierName, userId, _id, element, setLoading}) {
    return(
        <Item>
            <Image className="image" albumPic={albumPic}></Image>
            <div className="column">
                <p>Unidades compradas: {buyerQuantity}</p>
                <p>R$ unitátio: {parseFloat(price).toFixed(2).replace('.', ',')}</p>
                <p>R$ total: {parseFloat(price * buyerQuantity).toFixed(2).replace('.', ',')}</p>
                <p>Nome do Artista: {bandName}</p>
                <p>Nome do Album: {albumName}</p>
                <p>Ano de lançamento: {albumYear}</p>
            </div>
        </Item>
    )
}

const Item = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    border: 1px solid #FFFFFF;
    padding: 15px;

    h3 {
        margin: 0;
    }
    p{
        margin: 0;
    }
    .column {
        width: 100%;
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
    .flex {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .button {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
    }
`

const Image = styled.div`
    width: 110px;
    min-width: 110px;
    height: 110px;
    background-image: url(${props => props.albumPic});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 10px;
`
