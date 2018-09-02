import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary.jsx';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard.jsx';

const gridMap = [ 'zero','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'tewelve' ];

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = 'My Page';
        this.props.fetchOrders();
    }

    randomVal = (min, max) => {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    getGridValues() {
        let sum = 12;
        let grids = {
            firstGrid: this.randomVal(3, 12),
            secondGrid: 0
        };
        grids.firstGrid == 12 ? grids.secondGrid = 12 : grids.secondGrid = 12 - grids.firstGrid;
        return grids;
    } 

    renderOrders() {
        let { orders } = this.props;
        let  gridVal;
        var i;
        for (i = 0; i < orders.data.length - 1;) {
            gridVal = this.getGridValues();
            orders.data[i]['grid'] = gridVal.firstGrid;
            orders.data[i+1]['grid'] = gridVal.secondGrid;
            i += 2;
        }
        return(
            <div>
            {
                orders.data.map(function( order, index ){
                    return <OrderCard grid = { gridMap[order.grid] } orderName = {order.name} key = {order.orderID}/>
                })
            }
            </div>
        )
    }

    render() {
        let { orders } = this.props;
        if(orders.data.length == 0 && !orders.fetched) {
            return <OrderCard grid = 'tewelve' orderName = 'Loading list of orders..'/>
        } else if(orders.data.length == 0 && orders.fetched) {
            return <OrderCard grid = 'tewelve' orderName = 'oops, looks like kitchen is empty today :('/>
        }
        return (
            <ErrorBoundary>
                { this.renderOrders() }
            </ErrorBoundary>
        );
    }
}

Orders.propTypes = {
    orders: PropTypes.object
}

export default Orders;