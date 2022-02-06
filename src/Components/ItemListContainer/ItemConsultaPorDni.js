import React, { useState, useContext } from 'react'
import Loader from '../../Loader'
import { dataBase } from '../../Services/firebase/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import cartContext from '../../Context/cartContext'
import { Link, useNavigate } from 'react-router-dom'
import './ItemConsulta.scss'

const ItemConsultaPorDni = () => {

    const { saveHistories, setHistoryID, search, setSearch } = useContext(cartContext)

    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()


    const dateFormat = (date, locale, options) =>
        new Intl.DateTimeFormat(locale, options).format(date)


    const sendData = (event) => {
        event.preventDefault()
        console.log(search.tipoBusqueda + ' ' + search.codBusqueda)

    }

    const handleInputChange = (event) => {
        setSearch({
            ...search,
            [event.target.name]: event.target.value
        })
    }


    const findOrder = (event) => {

        setLoading(true)

        event.preventDefault()


        /* conexion firebase parametros: referencia base de datos y nombre de la coleccion */
        getDocs(query(collection(dataBase, 'historias'), where('dni', '==', search.codBusqueda), orderBy('date', 'desc'))).then((QuerySnapshot) => {

            const histories = QuerySnapshot.docs.map(doc => {

                const data = doc.data()
                const { date } = data
                const fecha = new Date(date.seconds * 1000)
                const fechaFormat = dateFormat(fecha, 'es')
                setHistoryID(doc.id)

                return { id: doc.id, ...doc.data(), fechaFormat }
            })
            saveHistories(histories)
          
            
        }).catch((error) => {
            console.log('Error conexion firebase', error)
        })



        setTimeout(() => {
            navigate('/consultedHistory')
        }, 3000)

    }


    return (
        <div >
            {loading ? <Loader tipo='buscando' />
                :
                <div>
                    <h2 className='titleForm'>Buscar historia clínica</h2>
                    <form className='formConsulta' onSubmit={findOrder}>
                        <div className="form-floating mb-3 mt-5">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                name='codBusqueda'
                                required
                                maxLength={8}
                                placeholder='name@example.com'
                                onChange={handleInputChange}>
                            </input>
                            <label className='form-compra'>Ingrese DNI</label>
                        </div>
                        <button className='btnFinish' type='submit'>Buscar</button>
                        <Link to={'/consultar'}>
                            <button className='btnCancel'>Volver</button>
                        </Link>
                    </form>
                </div>
            }


        </div>
    )
}

export default ItemConsultaPorDni
