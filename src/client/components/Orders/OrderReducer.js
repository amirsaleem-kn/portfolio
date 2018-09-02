import { FETCH_ORDERS } from '../../actions/types';

export default function(state = { data: [], fetched: false }, action) {
    switch(action.type) {
        case FETCH_ORDERS: return { data: action.payload.data.data, fetched: true };
        default: return state
    }
}