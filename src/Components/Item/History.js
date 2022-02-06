import React, { useState, useContext } from 'react'
import { dataBase } from '../../Services/firebase/firebase'
import { collection, getDocs, query, where, orderBy, doc, updateDoc, arrayUnion, arrayRemove, Timestamp } from 'firebase/firestore'
import cartContext from '../../Context/cartContext'
import { useNavigate } from 'react-router-dom'
import { Button, Loading } from '@nextui-org/react';



const History = ({ historia }) => {

    const { search, historyID, saveHistories } = useContext(cartContext)

    const [btnRegistrar, setBtnRegistrar] = useState(true)
    const [btnAddLoading, setBtnAddLoading] = useState(false)
    const [btnDeleteLoading, setBtnDeleteLoading] = useState(false)
    const [visita, setVisita] = useState({ fecha: '', tratamiento: '' })

    let navigate = useNavigate()

    const dateFormat = (date, locale, options) =>
        new Intl.DateTimeFormat(locale, options).format(date)

    const registerVisit = () => {

        setBtnRegistrar(false)

    }


    const handleInputVisit = (event) => {
        setVisita({
            ...visita,
            [event.target.name]: event.target.value
        })

    }


    const addOrderVisit = (event) => {

        setBtnAddLoading(true)

        event.preventDefault()

        const newVisit = {
            fecha: Timestamp.fromDate(new Date(visita.fecha)),
            tratamiento: visita.tratamiento

        }

        const historyRef = doc(dataBase, "historias", historyID);

        // Atomically add a new region to the "regions" array field.
        (async () => {

            try {
                await updateDoc(historyRef, {
                    tratamientos: arrayUnion(newVisit)

                })

            } catch (error) {
                console.log('error', error)
            }
        })()

        setTimeout(() => {

            /* VUELVO A CONSULTAR DESPUES DE ACTUALIZAR LA VISITA EN EL ARRAY */
            getDocs(query(collection(dataBase, 'historias'), where('dni', '==', search.codBusqueda), orderBy('date', 'desc'))).then((QuerySnapshot) => {

                const histories = QuerySnapshot.docs.map(doc => {

                    const data = doc.data()
                    const { date } = data
                    const fecha = new Date(date.seconds * 1000)
                    const fechaFormat = dateFormat(fecha, 'es')

                    return { id: doc.id, ...doc.data(), fechaFormat }
                })
                saveHistories(histories)


            }).catch((error) => {
                console.log('Error conexion firebase', error)
            }).finally(() => {
                event.target.reset()
                setBtnAddLoading(false)
            })

        }, 2000)



    }



    const removeVisit = (visita) => {

        setBtnDeleteLoading(true)

        const deleteVisit = {
            fecha: visita.fecha,
            tratamiento: visita.tratamiento

        }

        const historyRef = doc(dataBase, "historias", historyID);

        // Atomically remove a region from the "regions" array field.
        (async () => {

            try {
                await updateDoc(historyRef, {
                    tratamientos: arrayRemove(deleteVisit)
                })

            } catch (error) {
                console.log('error', error)
            }
        })()


        setTimeout(() => {

            /* VUELVO A CONSULTAR DESPUES DE ACTUALIZAR LA VISITA EN EL ARRAY */
            getDocs(query(collection(dataBase, 'historias'), where('dni', '==', search.codBusqueda), orderBy('date', 'desc'))).then((QuerySnapshot) => {

                const histories = QuerySnapshot.docs.map(doc => {

                    const data = doc.data()
                    const { date } = data
                    const fecha = new Date(date.seconds * 1000)
                    const fechaFormat = dateFormat(fecha, 'es')

                    return { id: doc.id, ...doc.data(), fechaFormat }
                })
                saveHistories(histories)


            }).catch((error) => {
                console.log('Error conexion firebase', error)
            }).finally(() => {
                setBtnDeleteLoading(false)
            })

        }, 2000)


    }

    const AddVisit = () => {
        return (

            <form className='formAdd' onSubmit={addOrderVisit}>
                <div className="formDate form-floating mt-3">
                    <input type="date"
                        className="form-control"
                        id="floatingInput"
                        placeholder='name@example.com'
                        name='fecha'
                        maxLength={10}
                        onChange={handleInputVisit}
                        required></input>
                    <label className='form-compra'>Fecha</label>
                </div>
                <div className="formVisit form-floating mt-3">
                    <textarea className="form-control"
                        id="floatingTextarea"
                        placeholder='name@example.com'
                        name='tratamiento'
                        onChange={handleInputVisit}
                        required></textarea>
                    <label className='form-compra'>Tratamiento realizado e indicaciones</label>
                </div>
                <button className='btnAdd mt-3' type='submit'>Agregar</button>
            </form>

        )
    }



    return (
        <>
            <h2 className='order-tit'>Historia clínica del paciente {historia.name}</h2>
            <div className="order">
                <li key={historia.id} className='titOrder'>
                    <div>
                        <p className="detalleOrderDate">Fecha de carga: {historia.fechaFormat}</p>
                        <p className="detalleOrder">DNI: {historia.dni}</p>
                        <p className="detalleOrder">Tel: {historia.phone}</p>
                        <p className="detalleOrder">Obra social: {historia.osocial}</p>
                        <p className="detalleOrder">Nro afiliado: {historia.nroafiliado}</p>
                    </div>
                </li>
            </div>
            <h4 className='order-visit'>Registro de prestaciones</h4>
            <div className='table-histories'>
                <table className="table table-hover table-light table-bordered border-dark">
                    <thead>
                        <tr>
                            <th className='table-dark table-tit-date' scope="col">Fecha</th>
                            <th className='table-dark table-tit-trat' scope="col">Tratamiento realizado e indicaciones</th>
                            <th className='table-dark table-tit-tach' scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {historia.tratamientos.map(trat => {
                            const fecha = new Date(trat.fecha.seconds * 1000)
                            const fechaFormat = dateFormat(fecha, 'es')
                            return (
                                <tr key={trat.id}>
                                    <td>{fechaFormat}</td>
                                    <td>{trat.tratamiento}</td>
                                    <td>
                                        <img className='tachito' src='https://res.cloudinary.com/dw94zgfgu/image/upload/v1641066871/tachito_yzwc0i.svg' alt='carrito-lleno' onClick={() => removeVisit(trat)}
                                        ></img>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {btnDeleteLoading && <Loading type="spinner" size="xl" /> }
            {btnRegistrar ? <button className='botonSeguirCompra' onClick={() => registerVisit()}>Registrar nueva visita</button>
                :
                <form className='formAdd' onSubmit={addOrderVisit}>
                    <div className="formDate form-floating mt-3">
                        <input type="datetime-local"
                            className="form-control"
                            id="floatingInput"
                            placeholder='name@example.com'
                            name='fecha'
                            onChange={handleInputVisit}
                            required></input>
                        <label className='form-compra'>Fecha</label>
                    </div>
                    <div className="formVisit form-floating mt-3">
                        <textarea className="form-control"
                            id="floatingTextarea"
                            placeholder='name@example.com'
                            name='tratamiento'
                            onChange={handleInputVisit}
                            required></textarea>
                        <label className='form-compra'>Tratamiento realizado e indicaciones</label>
                    </div>
                    {btnAddLoading ?
                        <Button className='btnAdd mt-3' auto clickable={false} color="primary" css={{ px: '$13' }}>
                            <Loading color="white" size="sm" />
                        </Button>
                        :
                        <Button className='btnAdd mt-3' shadow color="primary" auto type='submit'>
                            Agregar
                        </Button>

                    }
                </form>}
        </>
    )
}

export default History
