import React from 'react'
import Category from '../Item/Category'

const CategoryList = ({ categorias }) => {
    return (
        <div>
            <ul>
                {categorias.map(category =>
                    <Category key={category.id} categoria={category} />
                )}
            </ul>
        </div>
    )
}

export default CategoryList
