import React from 'react'

import cn from 'classnames'
import { map } from 'lodash'

const filterItems = [
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 5H5V10H10V5Z" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M19 5H14V10H19V5Z" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M19 14H14V19H19V14Z" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M10 14H5V19H10V14Z" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
    </svg>
    ,
    <svg className="svg_rows" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6H21" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M8 12H21" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M8 18H21" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M3 6H3.01" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M3 12H3.01" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
        <path d="M3 18H3.01" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
    </svg>
]

// const filterItems = ['В виде таблицы', 'В виде колонок']

const Filter = ({ activeFilter, onClick }) => {
    return (
        <div className="filter">


            {map(filterItems, (filterItem, index) => (
                <span
                    key={index}
                    className={cn("filter__item", { active: activeFilter === index })}
                    onClick={() => onClick(index)}
                >
                    {filterItem}
                </span>
            ))}
        </div>
    )
}

export default Filter
