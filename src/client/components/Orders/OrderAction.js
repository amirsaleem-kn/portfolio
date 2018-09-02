import axios from 'axios';
import { FETCH_ORDERS } from '../../actions/types';

export function fetchOrders ( next ) {
    let orders = axios.get(`/orders`);
    return({
        type: FETCH_ORDERS,
        payload: orders
    });
}