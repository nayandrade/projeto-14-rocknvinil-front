import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo_light.svg";
import searchIcon from "../img/search.svg";
import axios from "axios";
import { useEffect } from "react";
import SearchBar from './SearchBar'

export default function Header() {
    const navigate = useNavigate();

    return (
        <MyHeader>
            <div>
                <p><Link to="/sign-in">Login</Link></p>
                <img src={logo} onClick={() => navigate('/')}  />
                <p><Link to="/cart">Cart</Link></p>
            </div>
            <div>
                <Link to='/myproducts'>
                    <p>Meus <br></br>Produtos</p>
                </Link>               
                
                <p><Link to='/'>Home</Link></p>
            </div>
        </MyHeader>
    )
}

const MyHeader = styled.header`
    background-color: #0d0d0d;
    width: 100%;
    height: 140px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0px 4px 10px #a6a6a6;
    

    div{
        display: flex;
        height: 40%;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
    }
    div > img{
        width: 150px;
    }

    p{
        color: #fff;
        text-align: center;
    }
    span{
        width: 150px;
        display: flex;
        align-items: center;
        position: relative;
    }
    span > img {
        width: 20px;
        position: absolute;
        top: 4px;
        right: 5px;
    }
    input{
        width: 100%;
        padding-left: 20px;
        height: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
        color: #fff;
    }
    a {
        text-decoration: none;
    }
    a:visited,
    a:active,
    a:link {
        color: inherit;
    }
`
