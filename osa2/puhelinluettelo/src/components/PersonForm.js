import React from 'react';

const PersonForm = ({onSubmit, name, nameChange, number, numberChange}) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input 
            value={name}
            onChange={nameChange}
            placeholder="name..."
          />
        </div>
        <div>
          number: <input 
            value={number}
            onChange={numberChange}
            placeholder="number..."
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
    )
  }

export default PersonForm