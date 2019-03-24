import React from 'react';


const Editor = (props) => {
    const { geometry } = props.annotation
    if (!geometry) return null
    
    return (
        <div
            style={{
            background: 'white',
            borderRadius: 3,
            position: 'absolute',
            left: `${geometry.x}%`,
            top: `${geometry.y + geometry.height}%`,
            }}
        >
            <input
                onChange={e => props.onChange({
                    ...props.annotation,
                    data: {
                        ...props.annotation.data,
                        remark: e.target.value
                    }
                })}
            />
            <input
                onChange={e => props.onChange({
                    ...props.annotation,
                    data: {
                        ...props.annotation.data,
                        style: e.target.value
                    }
                })}
            />
            <input
                onChange={e => props.onChange({
                    ...props.annotation,
                    data: {
                        ...props.annotation.data,
                        sense: e.target.value
                    }
                })}
            />
            <button onClick={props.onSubmit}>Comment</button>
        </div>
    )
}

export default Editor
