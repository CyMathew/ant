import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import AddField from './addfield'

class SideMenu extends React.Component
{ 
    constructor(props)
    {
        super(props);

        this.addProject = this.addProject.bind(this);
    }  

    addProject()
    {
        this.props.dispatch({type: "AF_SHOW"});
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
                        <div id="projectLinks">
                            <nav>
                                {this.props.projectLinks.map((name, index) => (
                                    <Link to={"/" + name} key={index} onClick={this.props.toggleMenu}>{name}</Link>
                                ))}
                            </nav> 
                        </div>
                        <AddField show={this.props.showAddField} />
                    </div>
                    <div id="sideMenuOverlay" onClick={this.props.toggleMenu}>
                    </div>
                </div>
            );
        
        return null;
    }
}

const mapStateToProps = (state) =>
({
    showAddField: state.showAddField,
    projectLinks: state.projectLinks
});

export default connect(mapStateToProps)(SideMenu);