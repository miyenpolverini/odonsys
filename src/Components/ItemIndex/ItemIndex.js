import React, { useState } from 'react';
import './ItemIndex.scss'
import Loader from "../../Loader"
import emailjs from '@emailjs/browser'

const ItemIndex = () => {
    const [loading, setLoading] = useState(true)

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs.sendForm('service_jlkmshj', 'template_35e308t', e.target,
            'user_PV0m0dEni12RzE54FTAhJ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        e.target.reset()
    };

    setTimeout(() => {
        setLoading(false)
    }, 1000)


    return (
        <>
            {loading ? <Loader />
                :
                <div>
                    <div className='containerHeader'>
                        <h1 className='descHeader'>ODONTÓLOGA AYLÉN POLVERINI</h1>
                    </div>
                    <div className='containerIndex'>
                        <div>
                            <h4 className='contIndex'>Contáctanos</h4>
                            <form onSubmit={sendEmail}>
                                <div className='contForm'>
                                    <div>
                                        <div className="form-floating mt-2">
                                            <input type="text" className="form-control" id="floatingInput" placeholder='name@example.com' name='user_name' required></input>
                                            <label className='form-compra'>Nombre</label>
                                        </div>
                                        <div className="form-floating mt-2">
                                            <input type="number" 
                                            className="form-control" 
                                            id="floatingInput" 
                                            placeholder='name@example.com' 
                                            name='user_phone' 
                                            maxLength={8}
                                            required></input>
                                            <label className='form-compra'>Celular</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-floating mt-2 ">
                                            <input type="email" className="form-control" id="floatingInput" placeholder='name@example.com' name='user_email' required></input>
                                            <label className='form-compra'>Email</label>
                                        </div>
                                        <div className="form-floating mt-2 ">
                                            <input type="text" className="form-control" id="floatingInput" placeholder='name@example.com' name='subject' required></input>
                                            <label className='form-compra'>Asunto</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mt-2 mb-3">
                                    <textarea className="form-control" id="floatingTextarea" placeholder='name@example.com' name='message' ></textarea>
                                    <label className='form-compra'>Mensaje</label>
                                </div>
                                <button className='btnFinish mb-5' type='submit'>Enviar mensaje</button>
                            </form>
                        </div>
                        <div>
                            <iframe className='contMaps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105070.58745282271!2d-59.015498235581546!3d-34.61791876174942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc8e48e4cd75cb%3A0xaa5203098e3dc2c3!2sGral.%20Rodr%C3%ADguez%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1643316552799!5m2!1ses-419!2sar" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default ItemIndex;
