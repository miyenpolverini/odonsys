import React from 'react'
import './Item.scss'
import { Link } from 'react-router-dom'

const Category = ({ categoria }) => {

    return (
        <>
            <li>
                <Link className="listCategorias" to={`/category/${categoria.id}`}>
                    {categoria.description}
                </Link>
            </li>
        </>
    )
}

export default Category
