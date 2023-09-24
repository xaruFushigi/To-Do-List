import React from 'react';
import PropTypes from 'prop-types';

const Scroll = props => {
  return (
    <div
      style={{
        overflowY: 'scroll',
        height: '150px',
        width: '100%',
      }}
    >
      {props.children}
    </div>
  );
};
// Prop Validation
Scroll.propTypes = {
  children: PropTypes.func.isRequired,
};
export default Scroll;
