import React from 'react';
import Annotation from 'react-image-annotation'
import Menu from './Menu';
import {connect} from 'react-redux';
import {annotation, auth} from "../actions";



class ImageAnnotation extends React.Component {

    state = {
        annotations: [],
        annotation: {}
    }

    onChange = (annotation) => {
        this.setState({ annotation })
    }

    onSubmit = (annotation) => {
        const { geometry, data } = annotation

        this.setState({
            annotation: {},
            annotations: this.state.annotations.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }



    render() {
        const { isAuthenticated, logout } = this.props;

        return (
        <div>
            <Menu isAuthenticated={isAuthenticated} logout={logout} />
            <h1>Здесь будет отображаться картинка + форма для пометок</h1>
            <Annotation
                className='image-annotation'
                src={'media/annotated_images/wtf.jpg'}
                annotations={this.state.annotations}
                type={this.state.type}
                value={this.state.annotation}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageAnnotation);
