import axios from 'axios';
import { FETCH_ORDERS } from '../../actions/types';

export function fetchOrders ( next ) {
    const orders = axios.get(`${localIP}:3000/fetch/active-orders`);
    return({
        type: FETCH_ORDERS,
        payload: orders
    });
}