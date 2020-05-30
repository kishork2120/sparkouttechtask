import React from 'react';

/**
 * @function TextInput
 * @description - text input component
 * @param {Object} props - object of input attributes
 * @return {JSX} - return react component
 */
const TextInput = (props)=>{
  return(
    <input {...props} ref={props.forwardRef} />
  )
}

// Exporting the component
export default TextInput;