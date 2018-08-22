import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary.jsx';
import PropTypes from 'prop-types';

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = 'My Page';
        this.props.fetchOrders();
    }

    renderOrders() {
        return (<ul>{ this.props.orders.map(function(order){ return <li key = {order.orderID}>{ order.name }</li> }) }</ul>)
    }

    render() {
        return (
            <ErrorBoundary>
                {this.renderOrders()}
            </ErrorBoundary>
        );
    }
}

export default Orders;