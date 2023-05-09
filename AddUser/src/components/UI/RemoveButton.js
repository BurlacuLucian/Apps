import React from "react";
import classes from "./RemoveButton.module.css";

const RemoveButton = props => {
    return <button className={classes.button} 
    type={props.type || 'button'} 
    onClick={props.onClick}
    >
        {props.children}
    </button>
};

export default RemoveButton;