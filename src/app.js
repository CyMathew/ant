import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Topbar from './components/topbar';

class App extends React.Component
{
    render() {
        return (
            <div>
                <Topbar />
            </div>

        );
    }
    
}

ReactDOM.render((
            <Router>
                <App/>
            </Router>), 
            document.getElementById('app'));