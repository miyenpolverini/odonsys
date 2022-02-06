import { useState, useEffect } from "react"
import CategoryList from "../ItemList/CategoryList"
import { dataBase } from '../../Services/firebase/firebase'
import { collection, getDocs} from 'firebase/firestore'

const ItemCategoryContainer = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getDocs(collection(dataBase, 'categorias')).then((QuerySnapshot) => {

            const categories = QuerySnapshot.docs.map(doc => {

                return { id: doc.id, ...doc.data() }
            })

            setCategories(categories)
        }).catch((error) => {
            console.log('Error conexion firebase', error)
        }).finally(() => {
            console.log('finalizo llamada firebase')
        })

        return (() => {
            setCategories([])
        })
    }, [])


    return (
        <div>
            <CategoryList categorias={categories} />
        </div>
    )
}

export default ItemCategoryContainer
