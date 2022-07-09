import { useEffect, useState } from 'react';

export default function PaginationComponent ({ itensPerPage, setItensPerPage }) {
    return (
        <>
        {
            <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={15}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
        }
        </>

    )
}