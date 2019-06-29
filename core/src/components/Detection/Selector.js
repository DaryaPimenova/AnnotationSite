import React from 'react';
import Box from './Box';


const Selector = ({ annotation, active }) => {
    const { geometry } = annotation
    if (!geometry) return null

    return (
        <Box
            geometry={geometry}
            style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: 'solid 1px red'
            }}
        />
    )
}

export default Selector
