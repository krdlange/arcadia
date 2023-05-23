import React from 'react';

export default function Button({onClick, ButtonText, className}) {

  return (
    <div>
        <button type="button" className={className} onClick={onClick}>{ButtonText}</button>
    </div>
  )
}
