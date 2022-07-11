import styled from "styled-components";

export default function PaginationComponent ({ setCurrentPage, pages }) {
    return (
        <Pagination>
        {
            Array.from(Array(pages), (item, index) => {
                return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
            })
        }
        </Pagination>

    )
}

const Pagination=styled.div`
    font-size: 15px;
    background-color: #a6a6a6;
    width: 100px;
    height: 40px;
    display: flex;

    button {
        disaplay: flex;
        background-color: #a6a6a6;
        border: solid 1px white;
        margin: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`