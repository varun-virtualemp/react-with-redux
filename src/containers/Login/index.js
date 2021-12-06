import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import LoginStyle from './style';
import {login} from '../../actions/Login'
import BlockUI from "../../components/BlockUI";

class Login extends Component {
    state = {
        fields    : {},
        errors    : {},
        location  : {}
    }

    componentDidMount(){
        this.setState({location:this.props});
    }

    /* validate login form */
    _validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["email"] || fields["email"].trim() === '') {
            formIsValid = false;
            errors["email"] = "*Please enter your email";
        }

        if (!fields["password"] || fields["password"].trim() === '') {
            formIsValid = false;
            errors["password"] = "*Please enter your password";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    /* handle input field changes */
    _handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /* submit login form */
    _handleSubmit = (event) => {
        event.preventDefault();
        if(this._validateForm()) {
            const { email, password } = event.target;
            const userData = {
                email       : email.value,
                password    : password.value
            }
            this.props.login(userData,this.state.location);
        }
    }

    render() {
        const {errors} = this.state;
        const { blocking } = this.props.loggedUser;

        return(
            <Fragment>
                <BlockUI blocking={blocking} />
                <LoginStyle>
                    <div className="background-design">
                        <div id="logreg-forms">
                            <form className="form-signin" onSubmit={this._handleSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal" style={{"textAlign": "center"}}> Sign in</h1>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email address" 
                                        required={true}
                                        name="email"
                                        onChange={this._handleChange}
                                    />
                                    <div className="errorMsg">{errors.email}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" 
                                        required={true}
                                        name="password"
                                        onChange={this._handleChange}
                                    />
                                    <div className="errorMsg">{errors.password}</div>
                                </div>
                                
                                <button className="btn btn-success btn-block center" type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </LoginStyle>
            </Fragment>
        )
    }
}

const mapsStateToProps = state => {
    return { 
        loggedUser  : state.authenticatedUser
    };
}

export default connect(mapsStateToProps, {login})(Login);