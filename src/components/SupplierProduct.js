import styled from "styled-components";

export default function SupplierProduct ({ albumName, albumYear, albumImage, bandName, prize, discount, date, amountAvailable}) {
    return (
        <Container>
            <AlbumPic>
                <img src={albumImage} />
            </AlbumPic>
            <AlbumInfo>
                <h4>{bandName} | {albumName} | {albumYear} </h4>
                <h3>Você o colocou a venda por: <br /> R$ {prize} em {date}</h3>
                <h3>O desconto aplicado foi: {discount}%</h3>
                <h3>A quantidade disponibilizada foi: {amountAvailable}</h3>                
            </AlbumInfo>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    width: 450px;
    height: 60%;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
    padding: 5px;
    border: 2px solid #f2f2f2;
    border-radius: 10px;
    overflow: hidden;

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
`