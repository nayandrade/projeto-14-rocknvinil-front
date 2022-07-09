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
    width: 100px;
`