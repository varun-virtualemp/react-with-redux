import React, {Component, Fragment} from "react"
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import SearchBox from "../../components/Search/SearchBox"
import { fetchUserData, resetUserData, deleteUser } from "../../actions/User"
import { displayRecordNotFound } from '../../utils/helper'
import Modal from '../../components/ConfirmationModal/Modal'

class UserList extends Component {
    state = {
        searchTitle     : '',
        showModal       : false,
        selectedRowId   : '',
    }

    /*lifecycle method to get data */
    componentDidMount(){
        this._getData();
    }

    /*lifecycle method to reset data */
    componentWillUnmount(){
        this.props.resetUserData();
    }

    _getData = (data) => {
        const params = {
            page    : data ? data : 1,
            search  : this.state.searchTitle
        }
        this.props.fetchUserData(params);
    }

    /**method for calling api based on page change  */
    _handlePageChange = (pageNumber) => {
        this._getData(pageNumber)
    }

    /*method called to when search is performed and called parent method*/
    _handleSearchInputChange(value) {
        this.setState({ searchTitle : value }, () => {
            this._getData();
        });
    }

    /* build user list */
    _userList = users => {
        if (!_.isEmpty(users)) {
            return (
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr role="row">
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data, index) => (
                            <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{data.username}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.email}</td>
                                <td className="actions">
                                    <NavLink to={`/user/edit/${data.id}`} className="ms-2" title="Edit">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </NavLink>
                                    {/* eslint-disable-next-line */}
                                    <a className="delete" title="Delete" className="ms-2" style={{'cursor':'pointer'}}
                                        onClick={(event) => this._handleModalShowClick(event,index)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            )
        } else if (_.isEmpty(users)) {
            return (
                displayRecordNotFound('No User Records Found')
            )
        }
    }

    /*method called to display modal*/
    _handleModalShowClick(e,i){
        e.preventDefault();
        this.setState({showModal: true, selectedRowId : this.props.users.userList[i].id})
    }

    /*method called to close modal*/
    _handleModalCloseClick = (value) => {
        this.setState({showModal: value})
    }

    /*method called to when record deleted option is chosen*/
    _deleteUserData = (status) => {
        if(status) {
            this.props.deleteUser(this.state.selectedRowId);  // action is called to get data
            this._handleModalCloseClick(false);  //modal is closed
        }
    }

    render() {
        const { searchTitle, showModal } = this.state;
        const {totalRecords, per_page , blocking, userList, currentPage } = this.props.users;
        let total = 0;
        if(typeof totalRecords != 'undefined')
            total = totalRecords;
        
        return (
            <Fragment>
                <BlockUI blocking={blocking} />
                <div className="col main pt-5 mt-3">
                    <h3>User List</h3>

                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 mb-2">
                                    <NavLink to={'/user/create'} className="btn btn-primary">Create User</NavLink>
                                </div>
                            
                                <SearchBox searchParentClass="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-2 offset-lg-7 offset-md-7"
                                            searchText="Search by username/email"
                                            searchInputChangeValue={(val) => this._handleSearchInputChange(val)}
                                            searchValue={searchTitle}
                                />
                            </div>
                            
                            <div className="table-responsive">
                                {/* list of records */}
                                {this._userList(userList)}

                                {(total > per_page) ? 
                                    <div className="pagination mb-3" style={{"justifyContent" : "right"}}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={Number(per_page)}
                                            totalItemsCount={total}
                                            pageRangeDisplayed={5}
                                            onChange={this._handlePageChange}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            innerClass="pagination text-center"
                                        /> 
                                    </div> 
                                : ''} 
                            </div>
                        </div>
                    </div>

                    {/* delete pop up modal */}
                    {showModal ? (<Modal 
                                    showModal={showModal} 
                                    handleModalClose={this._handleModalCloseClick} 
                                    updateData={this._deleteUserData}
                                    modalTitle="Delete Record"
                                    modalBody="Are you sure you wish to perform this action? This action is irreversible!"
                    />) : null}
                </div>
            </Fragment>
        );
    }
}

const mapsStateToProps = state => {
    return { 
        users  : state.user,
    }
}

export default connect(
                mapsStateToProps, 
                {fetchUserData, resetUserData, deleteUser}
            )(UserList)