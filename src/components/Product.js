import styled from "styled-components";
import { useState } from "react";

export default function Product ({ albumName, albumYear, albumId, albumImage, bandName, prize, discount}) {

    const [actualPrize, setActualPrize] = useState(prize);

    function calculatePrize () {
        if (discount !== 0) {
            setActualPrize = prize * ((100 - discount) / 100 )
        }
    }

    return (
        <Container>
            <Album>
                <AlbumPic>
                    <img src={albumImage} />
                </AlbumPic>
                <AlbumInfo>
                    <h4>{albumName}</h4>
                    <h3>{albumYear}</h3>
                    <h3>{bandName}</h3>
                    <h3>Preço: R${actualPrize}</h3>                
                </AlbumInfo>
            </Album>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    width: 40%;
    height: 30%;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
    padding: 5px;
    border: 2px solid #f2f2f2;
    border-radius: 10px;
    overflow: hidden;

`

const Album=styled.div`
    display: flex;
    margin: 10px;

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