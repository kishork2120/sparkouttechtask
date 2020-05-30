import React from 'react';

/**
 * @function ButtonLoader
 * @param {Boolean} props.isButtonLoader - loading boolean
 * @param {Boolean} props.buttonClass - bulma class for differentiating buttons
 * @param {Boolean} props.buttonName - button name
 * @return {JSX} - return react component
 */
const ButtonLoader = ({ props }) => {
  return (
    <>
      {props.isButtonLoader ? <button className={`${props.buttonClass} is-loading`} type="button">Loading</button> : <button className={props.buttonClass} type="submit">{props.buttonName}</button>}
    </>
  )
}

// Exporting component
export default ButtonLoader;
