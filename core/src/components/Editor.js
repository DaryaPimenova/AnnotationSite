import React from 'react';
import Select from 'react-select';


const Editor = (props) => {
    const { geometry } = props.annotation
    if (!geometry) return null

    return (
        <div
            className='editor'
            style={{ left: `${geometry.x}%`, top: `${geometry.y + geometry.height}%` }}
        >
            <div className="form-group row">
                <label htmlFor='image-class' className="col-sm-3 col-form-label">
                    Класс
                </label>
                <Select
                    id='image-class'
                    options={props.classes}
                    onChange={
                        opt => props.onChange({
                            ...props.annotation,
                            data: {
                                ...props.annotation.data,
                                image_class: opt
                            }
                        })
                    }
                />
            </div>
            <div className="form-group row">
                <label htmlFor="static-sense" className="col-sm-3 col-form-label">
                    Смысл
                </label>
                <div className="col-sm-9">
                    <input
                        id="static-sense"
                        className="form-control"
                        onChange={e => props.onChange({
                            ...props.annotation,
                            data: {
                                ...props.annotation.data,
                                sense: e.target.value
                            }
                        })}
                    />
                </div>
            </div>
            <button className='btn btn-primary btn-sm' onClick={props.onSubmit}>
                Comment
            </button>
        </div>
    )
}

export default Editor
