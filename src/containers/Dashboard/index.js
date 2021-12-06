import React from "react";
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    render() {
        const {user} = this.props.loggedUser;
        
        return (
            <div className="col main pt-5 mt-3">
                <h1 className="display-4 d-none d-sm-block">
                    Welcome {user.full_name || ''}
                </h1>
            </div>
        );
    }
}

const mapsStateToProps = state => {
    return { 
        loggedUser  : state.authenticatedUser
    }
}

export default connect(mapsStateToProps, null)(Dashboard);