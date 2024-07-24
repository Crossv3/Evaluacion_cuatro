import React, { useEffect, useRef, useState } from "react";
import Note from "./Note";
import { v4 as uuid } from "uuid";
import './diseño.css';

export default function Formulario() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState("");
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();

    // Limpiar localStorage al cargar la página
    useEffect(() => {
        localStorage.removeItem("notas-app");
    }, []);

    // useEffect para guardar las notas en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem("notas-app", JSON.stringify(notas));
    }, [notas]);

    const agregarNota = () => {
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const importante = importanteRef.current.checked;

        if (descripcion === "") {
            setError("Se necesita una descripción");
            return;
        };

        setError(""); // Limpiar el mensaje de error si pasa la validación

        const Notanueva = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            importante: importante
        };

        setNotas(prev => [...prev, Notanueva]);
        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: '50px' }}>
            <h1>Escribir notas</h1>
            <div className="input-group my-3">
                <div className="titulo col-12 col-md-3"><input ref={tituloRef} className="form-control" placeholder="Ingrese un título (opcional)" /></div>
                <div className="descrip col-12 col-md-6"><input ref={descripcionRef} className="form-control" placeholder="Ingrese una descripción" /></div>
                <div className="impor col-12 col-md-3">
                    <label>
                        <input ref={importanteRef} type="checkbox" /> Importante
                    </label>
                </div>
                <div className="boton col-12"><button onClick={agregarNota} className="btn btn-primary">Agregar</button></div>
            </div>
            {error && <div className="error-mensaje">{error}</div>}
            <div className="notas-container">
                {notas.map(nota => (
                    <Note
                        key={nota.id}
                        titulo={nota.titulo}
                        descripcion={nota.descripcion}
                        importante={nota.importante}
                    />
                ))}
            </div>
        </div>
    );
}
