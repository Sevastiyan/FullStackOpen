import React from 'react';

const Form = ({ onSubmit, name, number, nameHandler, phoneHandler }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <p>
            name:
            <input value={name} onChange={nameHandler} />
          </p>
          <p>
            number:
            <input value={number} onChange={phoneHandler} />
          </p>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    );
};
  
export default Form