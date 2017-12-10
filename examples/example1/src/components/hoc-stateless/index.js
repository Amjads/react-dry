import React from 'react'

const HocStateless = (WrappedComponent) => (
  (props) => <WrappedComponent {...props}/>
);

export default HocStateless