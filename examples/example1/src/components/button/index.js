import React from 'react'

const Button = (WrappedComponent) => (
  (props) => <WrappedComponent {...props}/>
);

export default Button