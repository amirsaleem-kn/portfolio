import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Loader = () => {
    return(<div className = 'L-tewelve S-tewelve clearfix'>
        <div className = 'material-card text text--sub'>Loading orders component</div>
    </div>)
};

const Orders = Loadable({
    loader: () => import('./Orders/Order'),
    loading: Loader
});

var App = () => {
    return (
    <Router>
        <Switch>
            <Route exact path = '/' component = { Orders }/>
        </Switch>
    </Router>
    );
}

export default App;