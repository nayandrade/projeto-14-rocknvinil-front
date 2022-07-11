import { useState, useContext, useRef } from "react"
import { useNavigate} from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../contexts/UserContext.js"
import Header from "./Header.js"
import CheckoutItem from "./CheckoutItem.js"


export default function Checkout() {
    const { token, cart, setCart, total } = useContext(UserContext);
    const navigate = useNavigate();
    const API = "https://projeto-14-rocknvinil-back.herokuapp.com/checkout"

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [cpf, setCpf] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [ccv, setCcv] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [phone, setPhone] = useState("")

    const [validName, setValidName] = useState(true);
    const [validAddress, setValidAddress] = useState(true);
    const [validCPF, setValidCPF] = useState(true);
    const [validCardNumber, setValidCardNumber] = useState(true);
    const [validCCV, setValidCCV] = useState(true);
    const [validExpirationDate, setValidExpirationDate] = useState(true);
    const [validPhone, setValidPhone] = useState(true);

    const inputName = useRef();
    const inputAddress = useRef();
    const inputCPF = useRef();
    const inputCardNumber = useRef();
    const inputCCV = useRef();
    const inputExpiratioDate = useRef();
    const inputPhone = useRef();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function submitPurchase(e) {
        e.preventDefault()
        try {
            const response =  await axios.post(API, {
                name,
                address,
                cpf,
                cardNumber,
                ccv,
                expirationDate,
                phone
            }, config);
            console.log(response.data);
            setCart([])
            navigate("/")

        } catch(error){
            const errorMessage = error.response.data;
    
            setValidName(true);
            setValidAddress(true);
            setValidCPF(true);
            setValidCardNumber(true);
            setValidCCV(true);
            setValidExpirationDate(true);
            setValidPhone(true);
    
            if(errorMessage === 'Invalid user name.'){
                setValidName(false);
                return inputName.current.focus();
            }
    
            if(errorMessage === 'Invalid address.'){
                setValidAddress(false);
                return inputAddress.current.focus();
            }
    
            if(errorMessage === 'Invalid CPF.'){
                setValidCPF(false);
                return inputCPF.current.focus();
            }
    
            if(errorMessage === 'Invalid card number.'){
                setValidCardNumber(false);
                return inputCardNumber.current.focus();
            }
    
            if(errorMessage === 'Invalid CCV.'){
                setValidCCV(false);
                return inputCCV.current.focus();
            }
    
            if(errorMessage === 'Invalid expiration date.'){
                setValidExpirationDate(false);
                return inputExpiratioDate.current.focus();
            }
    
            if(errorMessage === 'Invalid phone number.'){
                setValidPhone(false);
                return inputPhone.current.focus();
            }
        }
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
            <Form onSubmit={submitPurchase}
                  nameBackground={validName ? '#FFFFFF' : '#EA8E86'}
                  phoneBackground={validPhone ? '#FFFFFF' : '#EA8E86'}
                  addressBackground={validAddress ? '#FFFFFF' : '#EA8E86'}
                  cpfBackground={validCPF ? '#FFFFFF' : '#EA8E86'}
                  cardBackground={validCardNumber ? '#FFFFFF' : '#EA8E86'}
                  ccvBackground={validCCV ? '#FFFFFF' : '#EA8E86'}
                  expirationBackground={validExpirationDate ? '#FFFFFF' : '#EA8E86'}>

                <input id='name' type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} ref={inputName} required></input>
                <h5 id='name' className={`${validName ? 'hidden' : ''}`}>Nome inválido</h5>
                
                <input id='phone' type="number" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} ref={inputPhone} required></input>
                <h5 id='phone' className={`${validPhone ? 'hidden' : ''}`}>Telefone inválido</h5>
                
                <input id='address' type="text" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} ref={inputAddress} required></input>
                <h5 id='address' className={`${validAddress ? 'hidden' : ''}`}>Endereço inválido</h5>
                
                <input id='cpf' type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} ref={inputCPF} required></input>
                <h5 id='cpf' className={`${validCPF ? 'hidden' : ''}`}>CPF inválido</h5>

                <div>
                    <input id="card" type="text" placeholder="Cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} ref={inputCardNumber} required></input>
                    <h5 id='card' className={`${validCardNumber ? 'hidden' : ''}`}>Cartão inválido</h5>
                    
                    <input id="ccv" type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} ref={inputCCV} required></input>
                    <h5 id='ccv' className={`${validCCV ? 'hidden' : ''}`}>CCV inválido</h5>
                    
                    <input id="expiration" type="text" placeholder="Expira em" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} ref={inputExpiratioDate} required></input> 
                    <h5 id='expiration' className={`${validExpirationDate ? 'hidden' : ''}`}>Data inválida</h5>
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

    input#name {
        background-color: ${props => props.nameBackground};
    }

    input#phone {
        background-color: ${props => props.phoneBackground};
    }

    input#address {
        background-color: ${props => props.addressBackground};
    }

    input#cpf {
        background-color: ${props => props.cpfBackground};
    }

    input#card {
        background-color: ${props => props.cardBackground};
    }

    input#ccv {
        background-color: ${props => props.ccvBackground};
    }

    input#expiration {
        background-color: ${props => props.expirationBackground};
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

    h5{
        font-family: 'Raleway';
        color: #EA8E86; 
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