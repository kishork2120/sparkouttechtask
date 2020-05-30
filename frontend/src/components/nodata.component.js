import React from 'react';

/**
 * @function NoData
 * @description - No Data component
 * @param {Boolean} props.condition - boolean condition for displaying no data
 * @param {JSX} - returns a jsx component
 */
const NoData = ({ props }) => {
  return props.condition && <div className="has-text-centered">No data found</div>
}

// Export component
export default NoData;