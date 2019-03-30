import React from 'react';


const Content = ({ annotation }) => {
    if (!(annotation.data && annotation.data.remark)) {
        return <div key={Math.random}></div>
    }

    const { geometry } = annotation
    return (
        <div
            key={annotation.data.id}
            style={{
                background: 'black',
                color: 'white',
                padding: 10,
                position: 'absolute',
                fontSize: 12,
                left: `${geometry.x}%`,
                top: `${geometry.y}%`
            }}
        >
            {annotation.data.remark}
        </div>    
    )
}

export default Content
