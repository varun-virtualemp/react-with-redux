import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import validateUserForm from './UserFormValidation'
import { fetchUserEditFormDependantData, submitUserFormData, resetUserData} from '../../actions/User'

class UserForm extends Component {
    state = {
        fields      : {},
        errors      : {},
        applyCheck  : this.props.match.params.id ? false : true
    }
    
    /*lifecycle method to get data */
    componentDidMount() {
        if(this.props.match.params.id)
            this.props.fetchUserEditFormDependantData(this.props.match.params.id); // action is called to fetch record
    }

    /*lifecycle method to reset data */
    componentWillUnmount(){
        this.props.resetUserData();
    }

    /*lifecycle method to update state when data received from redux store */
    static getDerivedStateFromProps(props, state) {
        if(typeof props.userData.user != "undefined") {
            if (_.size(props.userData.user) !== _.size(state.fields)) {
                return {
                    fields  : props.userData.user,
                };
            }
        }
        return null;
    }

    /* validate user form */
    _validateForm = () => {
        let fields = this.state.fields;
        let response = validateUserForm(fields, this.state.applyCheck);

        this.setState({errors: response.errors});
        return response.formIsValid;
    }

    /* handle input field changes */
    _handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }
    
    /* submit user form */
    _handleSubmit = (event) => {
        event.preventDefault();
        
        if (this._validateForm()) {
            const {first_name, last_name, email, password, username} = event.target;
            const postData = {
                first_name  : first_name.value,
                last_name   : last_name.value,
                email       : email.value,
                username    : username.value,
            }

            if(this.props.match.params.id){
                this.props.submitUserFormData(this.props.match.params.id,postData);  //action is called to submit data
            } else {
                postData.password = password.value
                this.props.submitUserFormData('',postData);  // action is called to submit data
            }
        }
    }

    _handleCancelForm = () => {
        history.push('/user')
    }

    render() {
        const {fields, errors} = this.state;
        const { blocking } = this.props.userData

        return (
            <Fragment>
                <BlockUI blocking={blocking} />
                <div className="col main pt-5 mt-3">
                    <h1 className="display-4 d-none d-sm-block">
                        User Details
                    </h1>

                    <form onSubmit={this._handleSubmit} className="user-form">
                        <div className="row clearfix mb-3">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="row clearfix">
                                    <div className="col-md-6 mb-3"> <b className="required">First Name</b>
                                        <div className="form-group">
                                            <input type="text" name="first_name" className="form-control" 
                                                    value={fields.first_name || ''} 
                                                    onChange={this._handleChange} 
                                                    minLength="5" />
                                            <div className="errorMsg">{errors.first_name}</div>        
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3"> <b className="required">Last Name</b>
                                        <div className="form-group">
                                            <input type="text" name="last_name" className="form-control" 
                                                    value={fields.last_name || ''} 
                                                    onChange={this._handleChange} 
                                                    minLength="5" />
                                            <div className="errorMsg">{errors.last_name}</div>        
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3"> <b className="required">Username</b>
                                        <div className="form-group">
                                            <input type="text" name="username" className="form-control" 
                                                    value={fields.username || ''}
                                                    onChange={this._handleChange} 
                                                    minLength="3" />
                                            <div className="errorMsg">{errors.username}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3"> <b className="required">Email</b>
                                        <div className="form-group">
                                            <input type="email" name="email" className="form-control" 
                                                    value={fields.email || ''}
                                                    onChange={this._handleChange} 
                                                    />
                                            <div className="errorMsg">{errors.email}</div>        
                                        </div>
                                    </div>

                                    {!this.props.match.params.id ? 
                                        <>
                                            <div className="col-md-6"> <b className="required">Password</b>
                                                <div className="form-group">
                                                    <input type="password" name="password" className="form-control"  
                                                            value={fields.password || ''} 
                                                            onChange={this._handleChange} 
                                                            minLength="6" />
                                                    <div className="errorMsg">{errors.password}</div>        
                                                </div>
                                            </div>
                                            <div className="col-md-6"> <b className="required">Confirm Password</b>
                                                <div className="form-group">
                                                    <input type="password" name="confirm_password" className="form-control"  
                                                            value={fields.confirm_password || ''} 
                                                            onChange={this._handleChange} 
                                                            minLength="6" />
                                                    <div className="errorMsg">{errors.confirm_password}</div>        
                                                </div>
                                            </div>
                                        </> 
                                    : ''}                                             
                                </div>
                            </div>
                        </div>
                            
                        <button type="submit" className="btn btn-success">Submit</button>
                        <button className="btn btn-danger ms-2" onClick={this._handleCancelForm}>Cancel</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapsStateToProps = state => {
    return { 
        loggedUser  : state.authenticatedUser,
        userData    : state.user
    }
}

export default connect(
                mapsStateToProps, 
                {fetchUserEditFormDependantData, submitUserFormData, resetUserData}
            )(UserForm)