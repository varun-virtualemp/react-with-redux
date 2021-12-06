import React, { Component } from "react";
import { Link } from "react-router-dom";

import SidebarStyle from './style';

class Sidebar extends Component {
    render() {
        return (
            <div className="col-md-3 col-lg-2 sidebar-offcanvas bg-dark pl-0 sidebar" id="sidebar" role="navigation">
                <SidebarStyle>
                    <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3 sidebar">
                        <li className="nav-item">
                            <Link to='/dashboard' className="nav-link active">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/user' className="nav-link active">Users</Link>
                        </li>
                    </ul>
                </SidebarStyle>
            </div>
        )
    }
}

export default Sidebar;