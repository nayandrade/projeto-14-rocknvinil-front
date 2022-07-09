import styled from "styled-components";

export default function SupplierProduct ({ albumName, albumYear, albumImage, bandName, prize, discount, date, amountAvailable}) {
    return (
        <Container>
            <AlbumPic>
                <img src={albumImage} />
            </AlbumPic>
            <AlbumInfo>
                <h4>{bandName} | {albumYear} | {albumName}</h4>
                <h3>Você o colocou a venda por: {prize} em {date}</h3>
                <h3>O desconto aplicado foi: {discount}</h3>
                <h3>A quantidade disponibilizada foi: {amountAvailable}</h3>                
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

const AlbumPic=styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
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