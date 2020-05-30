import React from 'react';
import { handleEnter } from '../common/helper';

/**
 * @function TextInput
 * @description - text input component
 * @param {Object} props - object of input attributes
 * @return {JSX} - return react component
 */
const TextInput = (props)=>{
  return(
    <input {...props} ref={props.forwardRef} onKeyDown={handleEnter} />
  )
}

// Exporting the component
export default TextInput;