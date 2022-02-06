import React, { useContext } from 'react'
import History from '../Item/History'
import cartContext from '../../Context/cartContext'

const HistoryList = () => {

    const { histories } = useContext(cartContext)

    return (
        <div>
            {histories.length === 0 ? <h2 className='tituloCartVacio'> No existen historias clínicas para los datos ingresados</h2>
                :
                histories.map(history =>
                    <History key={history.id} historia={history} />
                )}
        </div>
    )
}

export default HistoryList
