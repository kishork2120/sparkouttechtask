import React from'react';

/**
 * @function Loader
 * @param {Boolean} props.isLoading - boolean value specifying loading
 * @return {JSX} - returns jsx component
 */
const Loader = ({props})=>{
    return(
        <>
        {props.isLoading && <div className="has-text-centered">
            <img src={require('../loading-ring.gif')} width={50}/>
        </div> }
        </>
    )
}

// Export component
export default Loader;
