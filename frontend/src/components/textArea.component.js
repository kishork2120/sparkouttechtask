import React from 'react';

/**
 * @function TextArea
 * @description - text area component
 * @param {Object} props - object of input attributes
 * @return {JSX} - return react component
 */
const TextArea = (props)=>{
  return(
    <textarea {...props} ref={props.forwardRef} />
  )
}

// Export component
export default TextArea;