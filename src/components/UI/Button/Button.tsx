import React from 'react'
import styles from './Button.module.scss';

const Button: React.FC<any> = ({ children, ...restProps}) => {
  return (
    <button className={styles.button} {...restProps}>{children}</button>
  )
}

export default Button