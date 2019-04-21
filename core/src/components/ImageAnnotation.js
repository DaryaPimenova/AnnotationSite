import React from 'react';
import Annotation from 'react-image-annotation';
import Menu from './Menu';
import Box from './Box';
import Selector from './Selector';
import Highlight from './Highlight';
import Content from './Content';
import Editor from './Editor';
import {connect} from 'react-redux';
import {annotation} from "../actions";
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';


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

    getClasses = () => {
        let classes = [];
        this.props.classes.map((c, i) => {
            classes[i] = {
                value: c.pk,
                label: c.title
            }
        });

        return classes;
    }

    renderEditor = (props) => {
        return <Editor {...props} classes={this.getClasses()} />
    }

    componentWillMount() {
        this.props.loadImage();
    }

    render() {
        const { saveAnnotations, image_url, classes} = this.props;

        return (
            <div>
                <Menu />
                {this.props.user.is_superuser
                    ?
                    <a href="/api/annotations/download/">Выгрузить отчёт</a>
                    :
                    null
                }
                <Row className="justify-content-md-center">
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
                                renderEditor={this.renderEditor}
                                renderHighlight={Highlight}
                                renderContent={Content}
                            />
                        </div>
                    </Col>
                    <Col md={4}>
                        <Form className='form-annotation' onSubmit={::this.onSaveAnnotations}>
                        <h2>Annotations</h2>
                        {this.state.annotations.map((annotation, id) => (
                            <Row
                                className='form-row' 
                                key={`${id}`}               
                                onMouseOver={this.onMouseOver(annotation.data.id)}
                                onMouseOut={this.onMouseOut(annotation.data.id)}
                            >
                                <Col className='form-column'>
                                    <Select
                                        value={annotation.data.image_class}
                                        options={this.getClasses()}
                                        onChange={opt => this.onChangeAnnotations(
                                            annotation,
                                            id,
                                            {image_class: opt},
                                            `${id}image_class`
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
                        <div style={{marginTop: '20px'}}>
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
                        </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        image_url: state.annotation.image_url,
        image_id: state.annotation.image_id,
        classes: state.annotation.classes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveAnnotations: (annotations, image_id) => dispatch(annotation.saveAnnotations(annotations, image_id)),
        loadImage: () => dispatch(annotation.loadImage()),
        deleteImage: (image_id) => dispatch(annotation.deleteImage(image_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageAnnotation);
