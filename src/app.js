import React from 'react';
import ReactDOM from 'react-dom';

import Timer from './components/timer';


class App extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Timer />
        );
    }
    
}

ReactDOM.render(<App/>, document.getElementById('app'));