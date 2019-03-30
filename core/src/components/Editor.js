import React from 'react';


const Editor = (props) => {
    const { geometry } = props.annotation
    if (!geometry) return null
    
    return (
        <div
            className='editor'
            style={{ left: `${geometry.x}%`, top: `${geometry.y + geometry.height}%` }}
        >   
            <div className="form-group row">
                <label htmlFor="static-remark" className="col-sm-3 col-form-label">
                    Подпись
                </label>
                <div className="col-sm-9">
                    <input
                        id="static-remark"
                        className="form-control"
                        onChange={e => props.onChange({
                            ...props.annotation,
                            data: {
                                ...props.annotation.data,
                                remark: e.target.value
                            }
                        })}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="static-style" className="col-sm-3 col-form-label">
                    Стиль
                </label>
                <div className="col-sm-9">
                    <input
                        id='static-style'
                        className="form-control"
                        onChange={e => props.onChange({
                            ...props.annotation,
                            data: {
                                ...props.annotation.data,
                                style: e.target.value
                            }
                        })}
                    />
                </div>
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
