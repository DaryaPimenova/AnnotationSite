import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Menu from './Menu';
import {connect} from 'react-redux';
import {annotation, auth} from "../actions";


class Annotation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            crop: {
                x: 20,
                y: 10,
                width: 300,
                height: 100
            }
        };
    }

    onChange = (crop) => {
        this.setState({ crop });
    }


    render() {
        const { isAuthenticated, logout } = this.props;

        return (
        <div>
            <Menu isAuthenticated={isAuthenticated} logout={logout} />
            <h1>Здесь будет отображаться картинка + форма для пометок</h1>
            <ReactCrop src="/home/vladislav/Desktop/tmp.jpeg" crop={this.state.crop} onChange={this.onChange}/>
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
