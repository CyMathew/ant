import React from 'react';

import SideMenu from './sidemenu'


export default class Topbar extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            showMenu: false
        };
    
        this.menuShow = this.menuShow.bind(this);
        this.menuHide = this.menuHide.bind(this);
    }

    menuShow()
    {
        this.setState({
            showMenu: true
        });
    }

    menuHide()
    {
        this.setState({
            showMenu: false
        })
    }

    render() 
    {
        return (
            <div id="topbar">
                <SideMenu show={this.state.showMenu} toggleMenu={this.menuHide}/>
                <svg id="menuButton" width="25" height="25" viewBox="0 0 512 512" onClick={this.menuShow}>
                    <g>
                        <path d="M32 96h448v96h-448zM32 224h448v96h-448zM32 352h448v96h-448z"></path>
                    </g>
                </svg>
                <p>This is a topbar</p>
            </div>
        )
    }
}