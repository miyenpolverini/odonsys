import React, { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const Context = React.createContext()

export const AddCartContextProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([])
    const [order, setOrder] = useState('')
    const [histories, setHistories] = useState([])
    const [historyID, setHistoryID] = useState('')
    const [notifAdd, setNotifAdd] = useState(false)
    const [notifDel, setNotifDel] = useState(false)
    const [search, setSearch] = useState({ tipoBusqueda: '', codBusqueda: '' })

    /* FUNCIONES */
    const isInCart = (prodId) => {

        return carrito.some(prod => prod.id === prodId)
    }

    const removeVisit = (prodId) => {

        setNotifDel(true)

        const carritoFiltrado = carrito.filter(element => element.id !== prodId)

        setCarrito(carritoFiltrado);

    }

    const addCarrito = (prodId, prodName, prodPrice, prodImg, prodQuantity) => {

        const EstaEnElCarrito = isInCart(prodId)

        if (EstaEnElCarrito) {

            let productoDuplicado = carrito.find(elemento => elemento.id === prodId);
            productoDuplicado.cantidad += prodQuantity;

            let cartSinRepetido = carrito.filter(elemento => elemento.id !== prodId);
            setCarrito([...cartSinRepetido, productoDuplicado]);

        }
        else {

            setCarrito([...carrito, { id: prodId, name: prodName, price: prodPrice, img: prodImg, cantidad: prodQuantity }]);

        }

        calculateCantTotal()
        calculatePrecioTotal()
    }

    const calculateCantTotal = () => {

        let total = 0

        for (let i = 0; i < carrito.length; i++) {
            let objeto_producto = carrito[i]
            total = total + (parseInt(objeto_producto.cantidad))
        }

        return total
    }

    const calculatePrecioTotal = () => {

        let precioTotal = 0

        for (let i = 0; i < carrito.length; i++) {
            let objeto_producto = carrito[i];
            precioTotal = precioTotal + (parseInt(objeto_producto.cantidad) * objeto_producto.price)
        }

        return parseNumber(precioTotal)
    }

    const emptyCart = () => {

        setCarrito([])
        window.localStorage.clear();
    }

    const parseNumber = (precio) => {

        let precioPars = precio.toString()

        if (precioPars.length === 4) {
            precioPars = precioPars.slice(0, 1) + "." + precioPars.slice(1, 4);
        }
        else if (precioPars.length === 5) {
            precioPars = precioPars.slice(0, 2) + "." + precioPars.slice(2, 5);
        }
        else if (precioPars.length === 6) {
            precioPars = precioPars.slice(0, 3) + "." + precioPars.slice(3, 6);
        }
        else if (precioPars.length === 7) {
            precioPars = precioPars.slice(0, 1) + "." + precioPars.slice(1, 4) + "." + precioPars.slice(4, 7);
        }

        return precioPars
    }

    const loadOrder = (id) => {
        setOrder(id)
    }

    const saveHistories = (histories) => {
        setHistories(histories)
    }


    const SetNotification = (props) => {

        setTimeout(() => {
            setNotifAdd(false)
            setNotifDel(false)
        }, 6000)

        return (
            <>
                    {
                        props.message === 'add' ?
                            <div className='notif-add animate__animated animate__slideInUp'>
                                <AiOutlineCheckCircle />
                                <h4 className='notif-name'>¡Listo! Historia clínica registrada con éxito</h4>
                            </div>
                            :
                            <div className='notif-delete animate__animated animate__slideInUp'>
                                <AiOutlineCloseCircle />
                                <h4 className='notif-name'>Ya existe una historia clínica registrada con el DNI ingresado</h4>
                            </div>
                    }
            </>

        )


    }

    return (
        <Context.Provider value={{
            setSearch, search, calculateCantTotal, calculatePrecioTotal,
            emptyCart, parseNumber, carrito, loadOrder, order, saveHistories, histories,
            setHistoryID, historyID, SetNotification, setNotifAdd, notifAdd, setNotifDel, notifDel
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context
