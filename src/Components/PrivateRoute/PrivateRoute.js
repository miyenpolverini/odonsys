import React, { useContext } from 'react'
import cartContext from '../../Context/cartContext'
import { Navigate } from 'react-router-dom'



const PrivateRoute = ({ children, privType }) => {

    const { carrito, order } = useContext(cartContext)

    if (privType === 'formBuy') {
        return carrito.length === 0 ? <Navigate to='/' /> : children
    }
    else {
        if (privType === 'historyRegistered') {    
            return order === '' ? <Navigate to='/' /> : children
        }
    }
}

export default PrivateRoute
