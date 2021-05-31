import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import Contact from './components/Contact';
import NotFound from "./components/NotFound";
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
        <div className={'App Container'}>
            <div className={'form-wrapper container'}>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/contact" component={Contact}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
