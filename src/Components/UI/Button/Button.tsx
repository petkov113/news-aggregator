import React, { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classes from './Button.module.scss';

type Button = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  btnType: 'primary' | 'secondary';
  onClick?: any;
  disabled: boolean;
  value: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button: FC<Button> = ({ btnType, onClick, disabled, value, type }) => (
  <button type={type} className={classes[btnType]} onClick={onClick} disabled={disabled}>
    {value}
  </button>
);

export default Button;
