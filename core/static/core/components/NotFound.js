import React from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';
import { auth } from '../actions';


class NotFound extends React.Component {

    render() {
        const { isAuthenticated, logout } = this.props;

        return (
        <div>
            <Menu isAuthenticated={isAuthenticated} logout={logout} />
            <h1>Not Found 404</h1>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
