import { Link } from 'react-router-dom';
import Header from "./Header.js";
export default function Base() {
    return (
        <>  
            <Header />
            <h1>Hello World</h1>
            <Link to="/carrinho">Carrinho</Link>
        </>
        
    )

}