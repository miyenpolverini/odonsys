import React, { useContext } from 'react'
import cartContext from '../../Context/cartContext'
import { Link } from 'react-router-dom'
import './HistoryRegistered.scss'

const HistoryRegistered = () => {

    const { order } = useContext(cartContext)

    return (
        <div className='container-compra'>
            <h4 className='detail-compra'>¡Nueva historia clínica registrada con éxito!</h4>
            <Link to={'/consultar'}>
                <button className='botonVerCarrito'>Consultar</button>
            </Link>
        </div>
    )
}

export default HistoryRegistered
