import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary.jsx';
import PropTypes from 'prop-types';

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
                    return(
                        <div className = {`L-${gridMap[order.grid]} S-tewelve clearfix`} key = { order.orderID }>
                            <div className = 'material-card text text--sub'>{ order.name }</div>
                        </div>
                    )
                })
            }
            </div>
        )
    }

    render() {
        let { orders } = this.props;
        if(orders.data.length == 0 && !orders.fetched) {
            return(
                <div className = {`L-tewelve S-tewelve clearfix`} key = { 12 }>
                    <div className = 'material-card text text--sub'>Loading list of orders</div>
                </div> 
            )
        } else if(orders.data.length == 0 && orders.fetched) {
            return(
                <div className = {`L-tewelve S-tewelve clearfix`} key = { 12 }>
                    <div className = 'material-card text text--sub'>oops, looks like kitchen is empty today :(</div>
                </div>
            )
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