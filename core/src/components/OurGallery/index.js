import React from 'react';
import Menu from '../Menu';
import Gallery from "react-photo-gallery";
import {Pagination} from 'react-bootstrap';
import SelectedImage from './SelectedImage';
import {connect} from 'react-redux';
import {annotation} from "../../actions";


const PHOTOS_NUMBER_PER_PAGE = 20;


class OurGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images_gallery.slice(0, PHOTOS_NUMBER_PER_PAGE),
            page: 1,
            selectAll: false,
        }
    }

    componentWillMount() {
        this.props.getImagesGalery();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.images_gallery != nextProps.images_gallery){
            let page = this.state.page || 1;
            this.setState({images: nextProps.images_gallery});
        }
    }

    selectPhoto = (event, obj) => {
        let index = PHOTOS_NUMBER_PER_PAGE * (this.state.page - 1) + obj.index;
        let currImages = [...this.state.images];
        currImages[index].selected = !currImages[index].selected;
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
        let image_ids = this.state.images.filter(img => img.selected).map(img => img.key);
        let is_delete = confirm('Вы уверены, что хотите удалить эти картинки?');
        if (is_delete) {
            this.props.bulkDeleteImages(image_ids)
        }
    }

    updatePage = (num) => {
        this.setState({
            page: num
        });
    }

    get_pagination = () => {
        let items_count = Math.ceil(this.props.images_gallery.length / PHOTOS_NUMBER_PER_PAGE);
        return (
            <Pagination 
                prev
                next
                ellipsis
                boundaryLinks
                bsSize='small'
                items={items_count}
                maxButtons={6}
                activePage={this.state.page || 1}
                onSelect={this.updatePage}
            />
        )
    }

    render() {
        const { page, images } = this.state;
        const { user, images_gallery } = this.props;

        if (images.length == 0) {
            return null;
        }
        return (
            <div style={{paddingTop: '20px'}}>
                <Menu />
                {user && user.is_superuser
                    ?
                    <div className='btn-gallery'>
                        <button className="btn btn-primary" onClick={this.toggleSelect}>
                            Выбрать все
                        </button>
                        <button className="btn btn-primary" onClick={this.onDeleteImages}>
                            Удалить выбранные
                        </button>
                    </div>
                    :
                    null
                }
                {this.get_pagination()}
                <Gallery 
                    photos={images.slice(PHOTOS_NUMBER_PER_PAGE * (page - 1), PHOTOS_NUMBER_PER_PAGE * page)} 
                    onClick={this.selectPhoto}
                    renderImage={SelectedImage}
                    direction={"column"}
                />
                {this.get_pagination()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        images_gallery: state.annotation.images_gallery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getImagesGalery: () => dispatch(annotation.getImagesGalery()),
        bulkDeleteImages: (image_ids) => dispatch(annotation.bulkDeleteImages(image_ids)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OurGallery);
