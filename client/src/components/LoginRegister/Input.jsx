import React from 'react';

function Input({ type, val, onChange }) {
    return (
        <input
            value={val}
            onChange={onChange}
            placeholder={type}
            name={type}
            type={type}
            id={type}
        />
    )
}

export default Input;
