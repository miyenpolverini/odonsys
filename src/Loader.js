import React from 'react';
import './Loader.css'

const Loader = (props) => {
    return (
        <>
            <div className="loader">
                <img className="logoMain" src='https://res.cloudinary.com/dw94zgfgu/image/upload/v1642984158/logo-main2_oq8nxa.png' alt="logo-main" />
            </div>
            {props.tipo === 'buscando' && <h3 className="loaderDesc">Buscando historia clínica...</h3>
            }
        </>
    )
}

export default Loader;