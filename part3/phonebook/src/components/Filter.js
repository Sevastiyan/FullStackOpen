import React from 'react';

const Filter = ({ value, handler }) => {
    return (
      <div>
        Filter Contacts:
        <input value={value} onChange={handler} />
      </div>
    );
  };

export default Filter
  