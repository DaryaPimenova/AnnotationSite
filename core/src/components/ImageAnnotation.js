import React from 'react';
import Annotation from 'react-image-annotation';
import Menu from './Menu';
import Box from './Box';
import Selector from './Selector';
import Highlight from './Highlight';
import Content from './Content';
import Editor from './Editor';
import {connect} from 'react-redux';
import {annotation, auth} from "../actions";
import { Form, Row, Col, Button } from 'react-bootstrap';


class ImageAnnotation extends React.Component {

    state = {
        annotations: [],
        annotation: {},
        activeAnnotations: [],
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

    onChangeAnnotations = (annotation, id, word) => {
        let annotations = [...this.state.annotations]

        annotations[id] = {
            ...annotation,
            data: {
                ...annotation.data,
                ...word
            }
        }

        this.setState({annotations})
    }

    onSaveAnnotations = (event) => {
        event.preventDefault();
        this.props.saveAnnotations(this.state.annotations, this.props.image_id);
    }

    onLoadNextImage = (event) => {
        event.preventDefault();
        this.props.loadImage();
    }

    onDelete = (id) => {
        let annotations = [...this.state.annotations]
        annotations.splice(id, 1)
        this.setState({annotations})
    }

    onDeleteImage = () => {
        let is_delete = confirm('Вы уверены, что хотите удалить эту картинку?');
        if (is_delete) {
            this.props.deleteImage(this.props.image_id)
        }
    }

    onMouseOver = (id) => e => {
        this.setState({
            activeAnnotations: [
                ...this.state.activeAnnotations,
                id
            ]
        })
    }

    onMouseOut = (id) => e => {
        const index = this.state.activeAnnotations.indexOf(id)

        this.setState({
            activeAnnotations: [
                ...this.state.activeAnnotations.slice(0, index),
                ...this.state.activeAnnotations.slice(index + 1)
            ]
        })
    }

    activeAnnotationComparator = (a, b) => {
        return a.data.id === b
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.image_id != this.props.image_id) {
            this.setState({
                annotations: [],
                annotation: {},
                activeAnnotations: [],
            })
        }
    }

    componentWillMount() {
        this.props.loadImage();
    }

    render() {
        const { isAuthenticated, logout, saveAnnotations, image_url } = this.props;

        return (
            <div>
                <Menu isAuthenticated={isAuthenticated} logout={logout} />
                <Row>
                    <Col md={5}>
                        <div className='image-annotation'>
                            <Annotation                    
                                src={image_url}
                                annotations={this.state.annotations}
                                type={this.state.type}
                                value={this.state.annotation}
                                onChange={this.onChange}
                                onSubmit={this.onSubmit}
                                activeAnnotationComparator={this.activeAnnotationComparator}
                                activeAnnotations={this.state.activeAnnotations}
                                renderSelector={Selector}
                                renderEditor={Editor}
                                renderHighlight={Highlight}
                                renderContent={Content}
                            />
                        </div>
                    </Col>
                    <Col md={7}>
                        <Form className='form-annotation' onSubmit={::this.onSaveAnnotations}>
                        {this.state.annotations.map((annotation, id) => (
                            <Row
                                className='form-row' 
                                key={`${id}`}               
                                onMouseOver={this.onMouseOver(annotation.data.id)}
                                onMouseOut={this.onMouseOut(annotation.data.id)}>

                                <Col className="form-column">
                                    <input 
                                        className="form-control"
                                        type='text' 
                                        key={`${(id+1)*1}`}
                                        value={annotation.data.remark}
                                        required="required"
                                        onChange={e => this.onChangeAnnotations(
                                            annotation,
                                            id,
                                            {remark: e.target.value},
                                            `${id}remark`
                                        )}
                                    />
                                </Col>
                                <Col className="form-column">
                                    <input 
                                        className="form-control"
                                        type='text' 
                                        key={`${(id+1)*2}`}
                                        value={annotation.data.style}
                                        required="required"
                                        onChange={e => this.onChangeAnnotations(
                                            annotation,
                                            id,
                                            {style: e.target.value},
                                            `${id}style`
                                        )}
                                    />
                                </Col>
                                <Col className="form-column">
                                    <input 
                                    className="form-control"
                                        type='text' 
                                        value={annotation.data.sense}
                                        key={`${(id+1)*3}`}
                                        required="required"
                                        onChange={e => this.onChangeAnnotations(
                                            annotation,
                                            id,
                                            {sense: e.target.value},
                                            `${id}sense`
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <button type="button" className="btn remove-annotation" onClick={() => this.onDelete(id)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </Col>
                            </Row>
                        ))}
                        {this.state.annotations.length > 0 
                            ? 
                            <Button type='submit' className='btn btn-primary btn-sm'>
                                Сохранить
                            </Button> 
                            : 
                            <Button type='button' className='btn btn-primary btn-sm' onClick={this.onLoadNextImage}>
                                Пропустить...
                            </Button>
                        }
                        {this.props.user.is_superuser
                            ?
                            <Button type='button' id="delete-image" className='btn btn-primary btn-sm' onClick={this.onDeleteImage}>
                                Удалить
                            </Button>
                            :
                            null
                        }
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user,
        user: state.auth.user,
        image_url: state.annotation.image_url,
        image_id: state.annotation.image_id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        saveAnnotations: (annotations, image_id) => dispatch(annotation.saveAnnotations(annotations, image_id)),
        loadImage: () => dispatch(annotation.loadImage()),
        deleteImage: (image_id) => dispatch(annotation.deleteImage(image_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageAnnotation);
