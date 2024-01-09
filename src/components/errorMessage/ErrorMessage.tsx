import React from 'react';
interface IErrorMessageProps {
  message: string;
}
const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => {
  return <div style={{ color: 'red' }}>{message}</div>;
};

export default ErrorMessage;
