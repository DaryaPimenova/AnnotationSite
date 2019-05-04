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


class Detection extends React.Component {

    state = {
        detections: [],
        detection: {},
        activeDetections: [],
    }

    onChange = (detection) => {
        this.setState({ detection })
    }

    onSubmit = (detection) => {
        const { geometry, data } = detection;

        this.setState({
            detection: {},
            detections: this.state.detections.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }

    onChangeDetections = (detection, id, word) => {
        let detections = [...this.state.detections]

        detections[id] = {
            ...detection,
            data: {
                ...detection.data,
                ...word
            }
        }

        this.setState({detections})
    }

    onSaveDetections = (event) => {
        event.preventDefault();
        this.props.saveDetections(this.state.detections, this.props.image_id);
    }

    onLoadNextImage = (event) => {
        event.preventDefault();
        this.props.loadImage();
    }

    onDelete = (id) => {
        let detections = [...this.state.detections]
        detections.splice(id, 1)
        this.setState({detections})
    }

    onDeleteImage = () => {
        let is_delete = confirm('Вы уверены, что хотите удалить эту картинку?');
        if (is_delete) {
            this.props.deleteImage(this.props.image_id)
        }
    }

    onMouseOver = (id) => e => {
        this.setState({
            activeDetections: [
                ...this.state.activeDetections,
                id
            ]
        })
    }

    onMouseOut = (id) => e => {
        const index = this.state.activeDetections.indexOf(id)

        this.setState({
            activeDetections: [
                ...this.state.activeDetections.slice(0, index),
                ...this.state.activeDetections.slice(index + 1)
            ]
        })
    }

    activeDetectionComparator = (a, b) => {
        return a.data.id === b
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.image_id != this.props.image_id) {
            this.setState({
                detections: [],
                detection: {},
                activeDetections: [],
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
        const { saveDetections, image_url, classes} = this.props;

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
                                annotations={this.state.detections}
                                type={this.state.type}
                                value={this.state.detection}
                                onChange={this.onChange}
                                onSubmit={this.onSubmit}
                                activeAnnotationComparator={this.activeDetectionsComparator}
                                activeAnnotations={this.state.activeDetections}
                                renderSelector={Selector}
                                renderEditor={this.renderEditor}
                                renderHighlight={Highlight}
                                renderContent={Content}
                            />
                        </div>
                    </Col>
                    <Col md={4}>
                        <Form className='form-annotation' onSubmit={::this.onSaveDetections}>
                        <h2>Detections</h2>
                        {this.state.detections.map((detection, id) => (
                            <Row
                                className='form-row' 
                                key={`${id}`}               
                                onMouseOver={this.onMouseOver(detection.data.id)}
                                onMouseOut={this.onMouseOut(detection.data.id)}
                            >
                                <Col className='form-column'>
                                    <Select
                                        value={detection.data.image_class}
                                        options={this.getClasses()}
                                        onChange={opt => this.onChangeDetections(
                                            detection,
                                            id,
                                            {image_class: opt},
                                            `${id}image_class`
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
                        {this.state.detections.length > 0 
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
        saveDetections: (detections, image_id) => dispatch(annotation.saveDetections(detections, image_id)),
        loadImage: () => dispatch(annotation.loadImage()),
        deleteImage: (image_id) => dispatch(annotation.deleteImage(image_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detection);
