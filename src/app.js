import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Topbar from './components/topbar';
import Timer from './components/timer';

const initialState = {
    projectLinks: [],
    showSideMenu: false,
    showAddField: false
}


function reducer(state = initialState, action) 
{
    switch(action.type)
    {
        case "SM_SHOW": return {...state, showSideMenu: true};
        case "SM_HIDE": return {...state, showSideMenu: false};
        case "AF_SHOW": return {...state, showAddField: true };
        case "AF_HIDE": return {...state, showAddField: false};
        case "ADD_PROJECT": let newArray = state.projectLinks.concat(action.name);
                        return {...state, projectLinks: newArray};
        default: return state;
    }
};


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class App extends React.Component
{
    render() {
        return (
            <div>
                <Topbar />
                <div>
                {store.getState().projectLinks.map((name, index) => (
                        <Route path={"/" + name} key={index} component={Timer}/>
                    ))}
                </div>
            </div>

        );
    }
    
}

ReactDOM.render((
        <Provider store={store}>
            <Router>
                    <App/>
            </Router> 
        </Provider>),
        document.getElementById('app'));