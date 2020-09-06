import React from 'react';

const ChildComponent = (props) => {
    return (
        <h2>my name is {props.name} and im {props.age}</h2>
    )
}

export default ChildComponent;