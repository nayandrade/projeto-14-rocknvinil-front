import styled from "styled-components";

export default function Product ({ albumName, albumYear, albumPic, bandName, prize, discount}) {

    let actualPrize = prize * ((100 - discount) / 100 )

    return (
        <Container>
            <AlbumPic>
                <img src={albumPic} />
            </AlbumPic>
            <AlbumInfo>
                <h4>{albumName}</h4>
                <h3>{albumYear}</h3>
                <h3>{bandName}</h3>
                <h3>Preço: {actualPrize}</h3>                
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