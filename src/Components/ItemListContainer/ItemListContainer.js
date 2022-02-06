import ItemList from "../ItemList/ItemList"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../Loader"
import { dataBase } from '../../Services/firebase/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'


const ItemListContainer = (props) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {

        if (categoryId) {
            //consulta firebase por filtros (query)

            getDocs(query(collection(dataBase, 'productos'), where('category', '==', categoryId),orderBy('precio'))).then((QuerySnapshot) => {

                const products = QuerySnapshot.docs.map(doc => {

                    return { id: doc.id, ...doc.data() }
                })

                setProducts(products)
            }).catch((error) => {
                console.log('Error conexion firebase', error)
            }).finally(() => {
                setLoading(false)
            })

        }
        else {

            (async () => {

                try {

                    const QuerySnapshot = await getDocs(query(collection(dataBase, 'productos'), orderBy('category'),orderBy('precio')))
                    const products = QuerySnapshot.docs.map(doc => {

                        return { id: doc.id, ...doc.data() }

                    })
                    setProducts(products)
                    setLoading(false)
                } catch (error) {
                    console.log('error', error)
                }
            })()

        }

    }, [categoryId])


    return (
        <>
            {/* <h1 style={style}>{props.greeting}</h1> */}
            {loading ? <Loader /> : <ItemList productos={products} />}
        </>
    )
}

export default ItemListContainer