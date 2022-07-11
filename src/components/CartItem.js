import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../contexts/UserContext.js"

export default function CartItem({ key, albumName, albumPic, albumYear, bandName, discount, price, quantity, buyerQuantity, supplierId, supplierName, userId, _id, element, setLoading }) {
    const [albumQuantity, setAlbumQuantity] = useState(buyerQuantity)
    const { token } = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

function removeAlbumQuantity() {
    console.log(_id, albumQuantity)
    if( albumQuantity > 1 ) {
            
        axios.put(`https:projeto-14-rocknvinil-back.herokuapp.com/cart/${_id}`, {
            buyerQuantity: albumQuantity - 1
        }, config)
        .then(res => {
            setAlbumQuantity(albumQuantity - 1)
            setLoading(true)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}

function addAlbumQuantity() {
    console.log(_id, albumQuantity)
    if( albumQuantity < quantity ) {
        axios.put(`https://projeto-14-rocknvinil-back.herokuapp.com/cart/${_id}`, {
            buyerQuantity: albumQuantity + 1
        }, config)
        .then(res => {
            setAlbumQuantity(albumQuantity + 1)
            setLoading(true)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}

    function removeFromCart() {
        console.log(_id, albumQuantity)
        const promise = axios.delete(`https://projeto-14-rocknvinil-back.herokuapp.com/cart/${_id}`, config)
        promise.then(res => {
            console.log(res)
            console.log(albumQuantity)
            setLoading(true)
        })
        promise.catch(err => {
            console.log(err)
        })
    }

    return(
        <Item>
            <Image className="image" albumPic={albumPic}></Image>
            <div className="column">
                <div className="flex">
                    <h3>R$ {parseFloat(price).toFixed(2).replace('.', ',')}</h3>
                    <p>desconto de {discount}%</p>
                    <h3 onClick={removeFromCart}>X</h3>
                </div>
                <p>{albumName}</p>
                <p>{bandName}</p>
                <p className="flex">
                    <p>Quantidade: </p> 
                    <div className="flex">
                        <div className="button" onClick={removeAlbumQuantity}> - </div>
                        <div>{albumQuantity}</div>
                        <div className="button" onClick={addAlbumQuantity}> + </div>
                    </div>
                </p>
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