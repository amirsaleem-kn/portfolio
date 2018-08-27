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
                <div className = 'L-four S-tewelve clearfix'>
                    <div className = 'material-card text text--sub'>Some Text</div>
                </div>
                <div className = 'L-eight S-tewelve clearfix'>
                    <div className = 'material-card'>Some Text</div>
                </div>
                <div className = 'L-three M-six S-tewelve clearfix'>
                    <div className = 'material-card'>Some Text</div>
                </div>
                <div className = 'L-three M-six S-tewelve clearfix'>
                    <div className = 'material-card'>Some Text</div>
                </div>
                <div className = 'L-three M-six S-tewelve clearfix'>
                    <div className = 'material-card'>Some Text</div>
                </div>
                <div className = 'L-three M-six S-tewelve clearfix'>
                    <div className = 'material-card'>Some Text</div>
                </div>
                {this.renderOrders()}
            </ErrorBoundary>
        );
    }
}

Orders.propTypes = {
    orders: PropTypes.array
}

export default Orders;