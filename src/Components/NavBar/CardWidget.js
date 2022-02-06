import { Link } from 'react-router-dom';
import { useContext } from 'react';
import cartContext from '../../Context/cartContext'
import './NavBar.scss';

const CardWidget = () => {

    const { calculateCantTotal } = useContext(cartContext)

    return (
        <>
            <Link className='carritoContainer' to={'/cart'}>
                <img className='carrito' src='https://res.cloudinary.com/dw94zgfgu/image/upload/v1640988719/carrito_vgr69e.png' alt='imagen-carrito'></img>
                <h5 className='cantCarrito'>{calculateCantTotal()}</h5>
            </Link >
        </>

    )
}

export default CardWidget




