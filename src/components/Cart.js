import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../contexts/UserContext.js"
import CartItem from "./CartItem.js"
import Header from "./Header.js"
    
export default function Cart() {
    const [loading, setLoading] = useState(true)
    const { token, cart, setCart, total, setTotal } = useContext(UserContext);
    const navigate = useNavigate();
    console.log(cart)
    console.log(token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    if (loading) {
        const promise = axios.get("https://projeto-14-rocknvinil-back.herokuapp.com/cart", config)
        promise.then(response => {
            setCart(response.data.myCart)
            setTotal(parseFloat(response.data.totalValue).toFixed(2))
            setLoading(false)     
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

    function renderButtons() {
        return(
            <>
                <Button onClick={() => navigate("/checkout")}>Concluir</Button>
                <Button onClick={() => navigate("/")}>Cancelar</Button>
            </>
        )
    }

    function renderCancelButton() {
        return(
            <Button onClick={() => navigate("/")}>Cancelar</Button>
        )

    }

    return (
        <>
            <Header />
            <Container>
                {
                    token.length < 1 ? "faça login para continuar" : !cart ? "carregando..." : renderCart()
                }
                {
                    cart && cart.length > 0 ? <TotalCartValue>Subtotal: R$ {total.replace('.', ',')}</TotalCartValue> : cart && cart.length === 0 ? <EmptyCart>Seu carrinho está vazio, <br></br>Adicione itens para continuar</EmptyCart> : null
                }
                {
                    cart && cart.length > 0 ? renderButtons() : renderCancelButton()
                }
            </Container>           
        </>        
    )
}

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    margin-top: 140px;

    a {
        font-size: 15px;
        color: #FFFFFF;
        font-weight: 700;
        margin: 36px 0;
        text-decoration: none;  
    }
`

const Button = styled.div`
    color: #0b0b0b;
    width: calc(100% - 30px);
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: inset 0px 0 4px rgba(0, 0, 0, 0.25);
`

const EmptyCart = styled.p`
    text-align: center;
`

const TotalCartValue = styled.p`
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

