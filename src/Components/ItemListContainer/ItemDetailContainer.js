import ItemDetail from "../Item/ItemDetail"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../Loader"
import { getDoc, doc } from "firebase/firestore"
import { dataBase } from "../../Services/firebase/firebase"


const ItemDetailContainer = () => {

    const [item, setItem] = useState([])
    const { paramId } = useParams()

    useEffect(() => {

        getDoc(doc(dataBase, 'productos', paramId)).then((QuerySnapshot) => {

            const item = { id: QuerySnapshot.id, ...QuerySnapshot.data() }
            setItem(item)

        }).catch((error) => {
            console.log('Error conexion firebase', error)
        }).finally(() => {
            console.log('finalizo')
        })


        return (() => {
            setItem([])
        })


    }, [paramId])


    return (
        <div>
            {item.length !== 0 ?
                <ItemDetail item={item} />
                : <Loader />}
        </div>
    )
}

export default ItemDetailContainer