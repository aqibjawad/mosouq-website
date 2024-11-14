import React from 'react';
import { Pagination } from 'react-bootstrap';
import './index.css';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination className="custom-pagination">
      <Pagination.Prev onClick={handlePrevClick} disabled={currentPage === 1} className="previous">
        Prev
      </Pagination.Prev>
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={handleNextClick} disabled={currentPage === totalPages} className="next">
        Next
      </Pagination.Next>
    </Pagination>
  );
};

export default CustomPagination;
