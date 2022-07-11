import styled from "styled-components";

export default function PaginationSelector ({ itensPerPage, setItensPerPage }) {
    return (
        <Pagination>
        {
            <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={15}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
        }
        </Pagination>

    )
}

const Pagination=styled.div`
    width: 100%;
    position: relative;


    select {
        font-size: 15px;
        background-color: #a6a6a6;
        width: 80px;
        height: 40px;
        position: absolute;
        right: -120px;
        bottom: -5px;
    }

    option {
        display: flex;
        align-items: center;
    }

`