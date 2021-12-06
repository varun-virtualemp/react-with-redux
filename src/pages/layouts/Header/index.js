import React, { Component } from "react"
import { connect } from 'react-redux'

import HeaderStyle from './style'
import {loginRedirect} from '../../../utils/helper'
import { resetLoggedUserData } from '../../../actions/Login'

class Header extends Component {
    _loggedOutUser = () => {
        this.props.resetLoggedUserData();
        loginRedirect()
    }

    render() {
        return (
            <HeaderStyle>
                <nav className="navbar fixed-top navbar-expand-md bg-info mb-3">
                    <div className="flex-row d-flex">
                        <button type="button" className="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                            <span className="navbar-toggler-icon"></span>
                            <i className="fa fa-bars"></i>
                        </button>
                        <h4 className="ms-3">Admin Template</h4>
                    </div>

                    <button className="btn btn-success align-right" onClick={this._loggedOutUser}>Logout</button>
                </nav>
            </HeaderStyle>
        )
    }
}

export default connect(null, {resetLoggedUserData})(Header);        