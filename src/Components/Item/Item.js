import React from 'react'
import './Item.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import cartContext from '../../Context/cartContext'

const Item = ({ producto }) => {

    const { parseNumber} = useContext(cartContext)

    return (
        <div className="tarjetas">
            <div className="tarjeta">
                <div>
                    <Link className="tarjeta-contenido" to={`/detail/${producto.id}`}>
                        <div>
                            <img src={producto.img} alt={producto.name} className="cardImg"></img>
                        </div>
                        <div className="tarjeta-contenido-detalle">
                            <h6 className="tarjetaPrecio">$ {parseNumber(producto.precio)}</h6>
                        </div>
                        <p className="cuotas"> 12 cuotas sin interés</p>
                        <p className="detalleProd">{producto.detail}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Item
