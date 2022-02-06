import React, { useState, useEffect, useContext } from 'react'
import Loader from '../../Loader'
import { dataBase } from '../../Services/firebase/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import HistoryList from '../ItemList/HistoryList'
import cartContext from '../../Context/cartContext'
import { Link, useNavigate } from 'react-router-dom'

const ItemConsulta = () => {

    const { saveHistories } = useContext(cartContext)

    const [search, setSearch] = useState({ tipoBusqueda: '', codBusqueda: '' })


    let navigate = useNavigate()


    const dateFormat = (date, locale, options) =>
        new Intl.DateTimeFormat(locale, options).format(date)


    const sendData = (event) => {
        event.preventDefault()
        console.log(search.tipoBusqueda + ' ' + search.codBusqueda)

    }


    const ButtonsSearch = () => {
        return (
            <div>
                <Link to={'/consultar-por-dni'}>
                    <button className='botonSeguirCompra'>Por DNI</button>
                </Link>
                <Link to={'/consultar-por-obra-social'}>
                    <button className='botonVerCarrito'>Por obra social</button>
                </Link>
            </div>
        )
    }




    return (
        <div>
            <ButtonsSearch />
        </div>
    )
}

export default ItemConsulta
