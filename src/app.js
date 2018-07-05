import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {v4} from 'node-uuid';

import {loadState, saveState} from './components/localstore';
import Topbar from './components/topbar';
import Timer from './components/timer';

const initialState = {
    projects: [],
    showSideMenu: false,
    showAddField: false
}

const persistedState = loadState();

function reducer(state = initialState, action) 
{
    switch(action.type)
    {
        case "SM_SHOW": return {...state, showSideMenu: true};
        case "SM_HIDE": return {...state, showSideMenu: false};
        case "AF_SHOW": return {...state, showAddField: true };
        case "AF_HIDE": return {...state, showAddField: false};
        case "ADD_PROJECT": 
        {
            let newProject = {id:v4(), name: action.name, time: {}};
            let newArray = state.projects.concat(newProject);
            return {...state, projects: newArray};
        }
        case "RM_PROJECT": 
        {
            let newArray = state.projects.concat();
            newArray.splice(action.index, 1);
            return {...state, projects: newArray};
        }
        case "SAVE_TIME":
        {
            let newTime = Object.assign({}, action.payload.savedTime);
            state.projects[action.payload.index].time = newTime;
            return state;
        }
        default: return state;
    }
};


const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(()=> {
    saveState(store.getState());
})

class App extends React.Component
{
    render() {
        return (
            <div>
                <Topbar />
                <div>
                {store.getState().projects.map(({id, time}, index) => (
                        <Route path={"/" + id} key={id} render={()=><Timer id={index} savedTime={time}/>}/>
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