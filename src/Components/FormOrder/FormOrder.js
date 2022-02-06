import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartContext from '../../Context/cartContext'
import './FormOrder.scss'
import { dataBase } from '../../Services/firebase/firebase'
import { collection, addDoc, writeBatch, getDocs, query, where, Timestamp } from 'firebase/firestore'
import Loader from '../../Loader'

const FormOrder = () => {

    const { loadOrder, SetNotification, setNotifAdd, notifAdd, setNotifDel, notifDel } = useContext(cartContext)

    let navigate = useNavigate()

    const [buying, setBuying] = useState(false)
    const [contact, setContact] = useState({
        name: '', dni: '', email: '', phone: '', osocial: ''
        , nroafiliado: '', comment: ''
    })


    const handleInputChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })

    }


    const confirmOrder = (event) => {

        setBuying(true)

        event.preventDefault()

        const newHistory = {
            date: Timestamp.fromDate(new Date()),
            name: contact.name,
            dni: contact.dni,
            email: contact.email,
            phone: contact.phone,
            osocial: contact.obraSocial.toUpperCase(),
            nroafiliado: contact.obraSocialNumber,
            tratamientos: [{fecha: Timestamp.fromDate(new Date()), tratamiento: contact.tratam}]
        }


        const batch = writeBatch(dataBase)
        const historyExists = []


        /* conexion firebase parametros: referencia base de datos y nombre de la coleccion */
        getDocs(query(collection(dataBase, 'historias'), where('dni', '==', contact.dni))).then((QuerySnapshot) => {


            QuerySnapshot.forEach((doc) => {
                historyExists.push(doc.data().name);
            })


        }).catch((error) => {
            console.log('Error conexion firebase', error)
        }).finally(() => {
            if (historyExists.length === 0) {
                addDoc(collection(dataBase, 'historias'), newHistory).then(({ id }) => {
                    batch.commit().then(() => {
                        loadOrder(id)
                    })
                }).catch((error) => {
                    console.log('Error conexion firebase', error)
                }).finally(() => {
                    setBuying(false)
                    setNotifAdd(true)

                    setTimeout(() => {
                        navigate('/historyRegistered')
                    }, 2000)
                })
            }
            else {
                setBuying(false)
                setNotifDel(true)
            }
        })

        

    }


    return (
        <>
            {buying && <Loader tipo='registrando' />}
            <div>
                <h2 className='titleForm'>Carga de historia clínica</h2>
                <form className='form' onSubmit={confirmOrder}>
                    <div className="form-floating mb-3 mt-5">
                        <input type="text" className="form-control" id="floatingInput" placeholder='name@example.com' name='name' onChange={handleInputChange} required></input>
                        <label className='form-compra'>Nombre del paciente</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder='name@example.com' 
                        name='dni' 
                        maxLength={8}
                        onChange={handleInputChange} 
                        required></input>
                        <label className='form-compra'>DNI</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder='name@example.com' name='email' onChange={handleInputChange} required></input>
                        <label className='form-compra'>Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput" placeholder='name@example.com' name='phone' onChange={handleInputChange} required></input>
                        <label className='form-compra'>Celular</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" name='obraSocial' aria-label="Floating label select example" onChange={handleInputChange} required>
                            <option></option>
                            <option value="osde">OSDE</option>
                            <option value="omint">OMINT</option>
                            <option value="galeno">GALENO</option>
                            <option value="medicus">MEDICUS</option>
                            <option value="swiss medical">SWISS MEDICAL</option>
                            <option value="otros">OTROS</option>
                        </select>
                        <label className='form-compra'>Obra social</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput" placeholder='name@example.com' name='obraSocialNumber' onChange={handleInputChange} required></input>
                        <label className='form-compra'>Nro de afiliado</label>
                    </div>
                    <div className="form-floating mb-5">
                        <textarea className="form-control" 
                        id="floatingTextarea" 
                        placeholder='name@example.com' 
                        name='tratam' 
                        onChange={handleInputChange}
                        required></textarea>
                        <label className='form-compra'>Tratamiento realizado e indicaciones</label>
                    </div>
                    <button className='btnFinish' type='submit'>Cargar</button>
                    <Link to={'/'}>
                        <button className='btnCancel'>Volver</button>
                    </Link>
                </form>
            </div>
            {notifDel && <SetNotification />}
            {notifAdd && <SetNotification message='add' />}
        </>
    )
}

export default FormOrder
