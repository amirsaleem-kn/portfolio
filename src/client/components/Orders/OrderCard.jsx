import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary.jsx';
import PropTypes from 'prop-types';

var OrderCard = ( props ) => {
    var { grid, orderName } = props;
    return(
        <div className = {`L-${grid} S-tewelve clearfix`}>
            <div className = 'material-card text text--sub'>{ orderName }</div>
        </div>
    )
}

OrderCard.propTypes = {
    grid: PropTypes.string,
    orderName: PropTypes.string
}

export default OrderCard;