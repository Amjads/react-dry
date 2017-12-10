import React from 'react'

const Authorization = (WrappedComponent) => (
  class extends React.Component{
    render(){
      const {...rest} = this.props
      return (
        <WrappedComponent {...rest}/>
      )
    }
  }
);

export default Authorization