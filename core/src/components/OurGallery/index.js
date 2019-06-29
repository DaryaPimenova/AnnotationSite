import React from 'react';
import Menu from '../Menu';
import Gallery from "react-photo-gallery";
import SelectedImage from './SelectedImage';
import {connect} from 'react-redux';
import {annotation} from "../../actions";


class OurGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images_gallery,
            selectAll: false,
        }
    }

    componentWillMount() {
        this.props.getImagesGalery();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.images_gallery != nextProps.images_gallery){
            this.setState({images: nextProps.images_gallery});
        }
    }

    selectPhoto = (event, obj) => {
        let currImages = [...this.state.images];
        currImages[obj.index].selected = !currImages[obj.index].selected;
        this.setState({images: currImages});
    }

    toggleSelect = (event, obj) => {
        let selectAll = this.state.selectAll;
        let currImages = [...this.state.images].map(img => {
            return { ...img, selected: !selectAll };
        });
        this.setState({images: currImages});
        this.setState({selectAll: !selectAll});
    }

    onDeleteImages = () => {
        let is_delete = confirm('Вы уверены, что хотите удалить эти картинки?');
        // if (is_delete) {
        //     this.props.deleteImage(this.props.image_for_classification, true)
        // }
    }

    render() {
        if (this.state.images.length == 0) {
            return null;
        }
        return (
            <div style={{paddingTop: '20px'}}>
                <Menu />
                <div className='btn-gallery'>
                    <button className="btn btn-primary" onClick={this.toggleSelect}>
                        Выбрать все
                    </button>
                    <button className="btn btn-primary" onClick={this.onDeleteImages}>
                        Удалить выбранные
                    </button>
                </div>
                <Gallery 
                    photos={this.state.images} 
                    onClick={this.selectPhoto}
                    renderImage={SelectedImage}
                    direction={"column"}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        images_gallery: state.annotation.images_gallery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getImagesGalery: () => dispatch(annotation.getImagesGalery()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OurGallery);
