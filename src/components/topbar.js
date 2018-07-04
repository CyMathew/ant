import React from 'react';
import {connect} from 'react-redux';

import SideMenu from './sidemenu'


class Topbar extends React.Component
{

    constructor(props)
    {
        super(props);
        
        this.menuShow = this.menuShow.bind(this);
        this.menuHide = this.menuHide.bind(this);
    }

    menuShow()
    {
        this.props.dispatch({type: "SM_SHOW"});
    }

    menuHide()
    {
        this.props.dispatch({type: "SM_HIDE"});
    }

    render() 
    {
        return (
            <div id="topbar">
                <SideMenu show={this.props.showSideMenu} toggleMenu={this.menuHide}/>
                <svg id="menuButton" width="25" height="25" viewBox="0 0 512 512" onClick={this.menuShow}>
                    <g>
                        <path d="M32 96h448v96h-448zM32 224h448v96h-448zM32 352h448v96h-448z"></path>
                    </g>
                </svg>
                <p>Ant</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => 
({
    showSideMenu: state.showSideMenu
});

export default connect(mapStateToProps)(Topbar);