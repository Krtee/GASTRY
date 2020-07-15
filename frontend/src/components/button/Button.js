import React from "react";
import "./Button.css";

const Button = (props) => {
    return (
        <button className={"button "+ props.className} form={props.form} onClick={props.onClick}>
            {props.label}
        </button>
    );
};

export default Button;
