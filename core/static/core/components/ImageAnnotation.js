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
        focusName: '',
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

    onChangeAnnotations = (annotation, id, word, focusName) => {
        let annotations = [...this.state.annotations]

        annotations[id] = {
            ...annotation,
            data: {
                ...annotation.data,
                ...word
            }
        }

        this.setState({
            annotations: annotations,
            focusName: focusName,
        })
    }

    onSaveAnnotations = (event) => {
        event.preventDefault();
        this.props.saveAnnotations(event.target);
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

    render() {
        const { isAuthenticated, logout, saveAnnotations, loadImage, imageUrl } = this.props;

        return (
            <div>
                <Menu isAuthenticated={isAuthenticated} logout={logout} />
                <Row>
                    <Col>
                        <div className='image-annotation'>
                            <Annotation                    
                                src={imageUrl}
                                annotations={this.state.annotations}
                                type={this.state.type}
                                value={this.state.annotation}
                                onChange={this.onChange}
                                onSubmit={this.onSubmit}

                                renderSelector={Selector}
                                renderEditor={Editor}
                                renderHighlight={Highlight}
                                renderContent={Content}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Form className='form-annotation' onSubmit={::this.onSaveAnnotations}>
                        {this.state.annotations.map((annotation, id) => (
                            <Row key={Math.random()}>
                                <Col>
                                    <input 
                                        type='text' 
                                        value={annotation.data.remark}
                                        autoFocus={this.state.focusName == `${id}remark`}
                                        onChange={e => this.onChangeAnnotations(
                                            annotation,
                                            id,
                                            {remark: e.target.value},
                                            `${id}remark`
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <input 
                                        type='text' 
                                        value={annotation.data.style}
                                        autoFocus={this.state.focusName == `${id}style`}
                                        onChange={e => this.onChangeAnnotations(
                                            annotation,
                                            id,
                                            {style: e.target.value},
                                            `${id}style`
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <input 
                                        type='text' 
                                        value={annotation.data.sense}
                                        autoFocus={this.state.focusName == `${id}sense`}
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
        imageUrl: state.annotation.imageUrl,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        saveAnnotations: () => dispatch(annotation.saveAnnotations()),
        loadImage: () => dispatch(annotation.loadImage()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageAnnotation);
