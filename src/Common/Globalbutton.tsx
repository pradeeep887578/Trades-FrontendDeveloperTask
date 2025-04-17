import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import styles from './Global.module.css';

interface GlobalButtonProps extends ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Globalbutton: React.FC<GlobalButtonProps> = ({
  onClick,
  children,
  variant = 'contained',
  className,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={styles.globalbutton}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default Globalbutton;
