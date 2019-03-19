import React from 'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {annotation, auth} from "../actions";


class Annotation extends React.Component {

    render() {
        const { isAuthenticated, logout } = this.props;

        return (
        <div>
            <Menu isAuthenticated={isAuthenticated} logout={logout} />
            <h1>Здесь будет отображаться картинка + форма для пометок</h1>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Annotation);
