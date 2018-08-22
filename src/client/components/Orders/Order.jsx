import React, { Component } from 'react';

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchOrders();
    }

    renderOrders() {
        return(
            <ul>
                {
                    this.props.orders.map(function(order){
                        return <li key = {order.orderID}>{ order.name }</li>
                    })
                }
            </ul>
         )
    }

    render() {
        return (this.renderOrders());
    }
}

export default Orders;