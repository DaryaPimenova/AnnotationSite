import React from 'react';
import Box from './Box';


const Highlight = ({ annotation, active }) => {
    const { geometry } = annotation
    if (!geometry) return null

    return (
        <Box
            key={annotation.data.id}
            geometry={geometry}
            style={{
                border: 'solid 1px red',
                boxShadow: active && '0 0 20px 20px rgba(255, 255, 255, 0.3) inset'
            }}
        />
    )
}

export default Highlight
