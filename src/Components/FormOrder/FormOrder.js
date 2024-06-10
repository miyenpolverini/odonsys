import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartContext from '../../Context/cartContext'
import './FormOrder.scss'
import { dataBase } from '../../Services/firebase/firebase'
import { collection, addDoc, writeBatch, getDocs, query, where, Timestamp } from 'firebase/firestore'
import Loader from '../../Loader'

const FormOrder = () => {

    const style = {
        height: '100px'
    }

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
            tratamientos: [{ fecha: Timestamp.fromDate(new Date()), tratamiento: contact.tratam }]
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


    const [isActive, setActive] = useState(["false", "false"]);

    const handleTogge = (index) => {

        setActive(!isActive);
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
                            style={style}
                            required></textarea>
                        <label className='form-compra'>Tratamiento realizado e indicaciones</label>
                    </div>
                    <div >
                        <table className="table-hover table-bordered border-dark table-odontograma ">
                            <tbody >
                                <tr>
                                    <td className={isActive ? 'color' : 'color1'} onClick={() => handleTogge(0)}>18</td>
                                    <td className={isActive ? 'color' : 'color1'} onClick={() => handleTogge(1)}>17</td>
                                    <td>16</td>
                                    <td>15</td>
                                    <td>14</td>
                                    <td>13</td>
                                    <td>12</td>
                                    <td>11</td>
                                    <td></td>
                                    <td>21</td>
                                    <td>22</td>
                                    <td>23</td>
                                    <td>24</td>
                                    <td>25</td>
                                    <td>26</td>
                                    <td>27</td>
                                    <td>28</td>
                                </tr>
                                <tr>
                                    <td>48</td>
                                    <td>47</td>
                                    <td>46</td>
                                    <td>45</td>
                                    <td>44</td>
                                    <td>43</td>
                                    <td>42</td>
                                    <td>41</td>
                                    <td> </td>
                                    <td>31</td>
                                    <td>32</td>
                                    <td>33</td>
                                    <td>34</td>
                                    <td>35</td>
                                    <td>36</td>
                                    <td>37</td>
                                    <td>38</td>
                                </tr>
                            </tbody>
                        </table>
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
