import React from 'react';
import Button from 'react-bootstrap/Button';

export default function PrimaryButton ({onClick, ButtonText, className}) {

  return (
    <div>
        <Button variant="primary" type="button" className={className} onClick={onClick}>{ButtonText}</Button>
    </div>
  )
}
