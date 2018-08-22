import { combineReducers } from 'redux';
import OrderReducers from '../components/Orders/OrderReducer';

const rootReducer = combineReducers({
    orders: OrderReducers
});

export default rootReducer;