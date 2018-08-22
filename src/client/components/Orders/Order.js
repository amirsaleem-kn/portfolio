import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Orders from './Order.jsx';
import { fetchOrders } from './OrderAction';

function mapStateToProps( { orders } ) {
    return { orders };
}

function mapDispatchToProps( dispatch ) {
    bindActionCreators ( { fetchOrders }, dispatch );
}

export default connect(mapStateToProps, { fetchOrders })(Orders);