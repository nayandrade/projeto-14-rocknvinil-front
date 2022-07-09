import { useEffect, useState } from 'react';

export default function PaginationComponent ({ setCurrentPage, pages }) {
    return (
        <>
        {
            Array.from(Array(pages), (item, index) => {
                return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
            })
        }
        </>

    )
}