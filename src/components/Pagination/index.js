import React from 'react';

    const Pagination = () => {
        const paginationNumbers = [1,2,3,4,5,6,7,8,9,10];

        return (
            <div className='pagination'>
                {paginationNumbers.map((pageNumber) => (
                    <button key={pageNumber}>{pageNumber}</button>
                ))}
            </div>
        );
    };
    export default Pagination;