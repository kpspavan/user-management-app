import React from 'react';
import { Button } from '@mui/material';

const MyButton = ({ onClick, color, variant, children, ...props }) => {
  return (
    <Button onClick={onClick} color={color} variant={variant} {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
