import React from 'react';

const Pagination = ({pageLength}) => {
  return (
    <div>
      {Array(pageLength).fill().map((page,idx) => <button>{idx+1}</button>)}
    </div>
  );
};

export default Pagination;