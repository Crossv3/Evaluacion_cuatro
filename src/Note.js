import React from "react";
import './diseño.css';

export default function Note(props) {
    return (
        <div className={`nota ${props.importante ? 'important' : ''}`}>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
        </div>
    );
}
