import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../contexts/UserContext.js"
import Header from "./Header.js"
import CheckoutItem from "./CheckoutItem.js"


export default function Checkout() {
    const { token, cart, setCart, total } = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [cpf, setCpf] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [ccv, setCcv] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [phone, setPhone] = useState("")

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    function submitPurchase(e) {
        e.preventDefault()
        const promise = axios.post("https://projeto-14-rocknvinil-back.herokuapp.com/checkout", {
            name,
            address,
            cpf,
            cardNumber,
            ccv,
            expirationDate,
            phone
        }, config)
        promise.then(response => {
            setCart([])
            navigate("/")
        }).catch(error => {
            console.error(error)
        })
    }

    function renderCart() {
        return(
            cart.map((element, index) => (
                <CheckoutItem 
                    key={index} 
                    albumName={element.albumName} 
                    albumPic={element.albumImage} 
                    albumYear={element.albumYear} 
                    bandName={element.albumBand} 
                    discount={element.albumDiscount} 
                    disponibility={element.disponibility} 
                    price={element.albumPrice} 
                    quantity={element.albumQuantity}
                    buyerQuantity={element.buyerQuantity} 
                    supplierId={element.supplierId} 
                    supplierName={element.supplierName} 
                    userId={element.userId} 
                    _id={element._id}
                    element={element}
                />
            ))    
        )
    }

    return (
        <Container>
            <Header />
            {
                !cart ? "carregando..." : renderCart()
            }
            {
                cart && cart.length > 0 ? <TotalCartValue>Subtotal: R$ {total.replace('.', ',')}</TotalCartValue> : cart && cart.length === 0 ? <EmptyCart>Seu carrinho está vazio, <br></br>Adicione itens para continuar</EmptyCart> : null
            }
            <Form onSubmit={submitPurchase}>
                <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required></input>
                <input type="number" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
                <input type="text" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                <input type="number" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required></input>
                <div>
                    <input id="card" type="text" placeholder="Cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required></input>
                    <input id="ccv" type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} required></input>
                    <input id="expiration" type="text" placeholder="Expira em" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required></input> 
                </div>
                <button type="submit">Finalizar compra</button>
                <button onClick={() => navigate("/cart")}>Cancelar compra</button>
            </Form>
        </Container>
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
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px;
    margin: 25px 0;

    input {
        width: 100%;
        height: 38px;
        background-color: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 13px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 18px;
        border: none;
        outline: none;
        margin: 1px;
    }

    input::placeholder{
        font-size: 15px;
        color: #000000;
    }

    button {
        width: 100%;
        height: 46px;
        border-radius: 5px; 
        border: none;
        font-size: 18px;
        font-weight: 700;
        color: #F2F2F2;
        background-color: #A6A6A6;
        margin-top: 10px;
    }

    button:hover{
        cursor: pointer;
    }

    div {
        display: flex;
        flex-wrap: nowrap;
    }
    #card {
        width: 50%;
    }
    #ccv {
        width: 20%;
    }
    #expiration {
        width: 30%;
    }
`

const TotalCartValue = styled.p`
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const EmptyCart = styled.p`
    text-align: center;
`