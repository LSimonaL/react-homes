import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {

    const onClickHandler = () => {
        console.log("Clicked!")

    }

    return (
        <div>
            <h2>Parent Component</h2>
            <ChildComponent name="Simona" age="24" />
            <button onClick={onClickHandler}>Click me</button>
        </div>
    )
}

export default ParentComponent;