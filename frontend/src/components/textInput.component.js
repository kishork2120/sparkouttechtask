import React from 'react';

/**
 * @function TextInput
 * @description - text input component
 * @param {Object} props - object of input attributes
 * @return {JSX} - return react component
 */
const TextInput = (props)=>{

  // handling move to next field when pressing enter
  const handleEnter = (event)=>{
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  return(
    <input {...props} ref={props.forwardRef} onKeyDown={handleEnter} />
  )
}

// Exporting the component
export default TextInput;