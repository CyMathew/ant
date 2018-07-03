import React from 'react';

import AddField from './addfield'

export default class SideMenu extends React.Component
{ 
    constructor(props)
    {
        super(props);

        this.state = 
        {
            showAddField: false
        }

        this.addProject = this.addProject.bind(this);
        this.hideField = this.hideField.bind(this);
    }  

    addProject()
    {
        this.setState({showAddField: true});
    }

    hideField()
    {
        this.setState({showAddField: false});
    }

    render()
    {       
        if(this.props.show)
            return (
                <div>                
                    <div id="sideMenu">
                        <header>
                            <h3>Projects</h3>
                            <svg id="plusButton" height="25px" width="25px" viewBox="0 0 32 32" onClick={this.addProject}>
                                <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
                            </svg>
                        </header>
                        {/* <AddField show={this.state.show} hide={this.hideField}/> */}
                    </div>
                    <div id="sideMenuOverlay" onClick={this.props.toggleMenu}>
                    </div>
                </div>
            );
        
        return null;
    }
}