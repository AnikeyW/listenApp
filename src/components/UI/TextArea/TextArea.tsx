import React from 'react';
import styles from './TextArea.module.scss';

const TextArea: React.FC<any> = (props) => {
  return <textarea className={styles.text} {...props}></textarea>;
};

export default TextArea;
