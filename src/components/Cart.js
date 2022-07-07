import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../contexts/UserContext.js"
import CartItem from "./CartItem.js"

// function CartItem({ key, albumName, albumPic, albumYear, bandName, discount, disponibility, price, quantity, buyerQuantity, supplierId, supplierName, userId, _id, element, setLoading }) {
//     const [albumQuantity, setAlbumQuantity] = useState(buyerQuantity)

//     function removeAlbumQuantity() {
//         if( albumQuantity > 1 ) {
//             setAlbumQuantity(albumQuantity - 1)
//             axios.put(`http://localhost:5002/carrinho/${_id}`, {
//                 buyerQuantity: albumQuantity - 1
//             })
//             .then(res => {
//                 console.log(res)
//             }).catch(err => {
//                 console.log(err)
//             })
//         }
//     }

//     function addAlbumQuantity() {
//         if( albumQuantity < quantity ) {
//             setAlbumQuantity(albumQuantity + 1)
//             axios.put(`http://localhost:5002/carrinho/${_id}`, {
//                 buyerQuantity: albumQuantity + 1
//             } )
//             .then(res => {
//                 console.log(res)
//             }).catch(err => {
//                 console.log(err)
//             })
//         }
//     }

//     function removeFromCart() {
//         axios.delete(`http://localhost:5002/carrinho/${_id}`)
//         .then(res => {
//             console.log(res)
//             setLoading(true)
//         }).catch(err => {
//             console.log(err)
//         })
//     }

//     return(
//         <Item>
//             <Image className="image" albumPic={albumPic}></Image>
//             <div className="column">
//                 <div className="flex">
//                     <h3>R$ {parseFloat(price).toFixed(2).replace('.', ',')}</h3>
//                     <h3 onClick={removeFromCart}>X</h3>
//                 </div>
//                 <p>{albumName}</p>
//                 <p>{bandName}</p>
//                 <p className="flex">
//                     <p>Quantidade: </p> 
//                     <div className="flex">
//                         <div className="button" onClick={removeAlbumQuantity}> - </div>
//                         <div>{albumQuantity}</div>
//                         <div className="button" onClick={addAlbumQuantity}> + </div>
//                     </div>
//                 </p>
//             </div>
//         </Item>
//     )
// }
    
export default function Cart() {
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState()
    const [total, setTotal] = useState(0)
    const { token } = useContext(UserContext);
    console.log(cart)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    if (loading) {
        const promise = axios.get("http://localhost:5002/carrinho", config)
        promise.then(response => {
            setLoading(false)
            setCart(response.data.myCart)
            setTotal(parseFloat(response.data.total).toFixed(2))         
        })
        promise.catch(error => {
            console.error(error)
        })
    }

    function renderCart() {
        return(
            cart.map((element, index) => (
                <CartItem 
                    key={index} 
                    albumName={element.albumName} 
                    albumPic={element.albumPic} 
                    albumYear={element.albumYear} 
                    bandName={element.bandName} 
                    discount={element.discount} 
                    disponibility={element.disponibility} 
                    price={element.price} 
                    quantity={element.quantity}
                    buyerQuantity={element.buyerQuantity} 
                    supplierId={element.supplierId} 
                    supplierName={element.supplierName} 
                    userId={element.userId} 
                    _id={element._id}
                    element={element}
                    setLoading={setLoading}
                    />
            ))
        )
    }

    return (
        <>
            <Container>
                {
                    !cart ? "carregando" : renderCart()
                } 
            </Container>           
        </>
        
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F2F2F2;

    a {
        font-size: 15px;
        color: #FFFFFF;
        font-weight: 700;
        margin: 36px 0;
        text-decoration: none;  
    }
`

