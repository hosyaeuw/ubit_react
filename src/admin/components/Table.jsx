import React from 'react'

import { map } from 'lodash'

import { Link } from "react-router-dom"

const Table = ({ headers, items, checkedItems, setCheckedItems, editUrl, deleteClick, data }) => {

    const [generalCheckboxChecked, setGeneralCheckboxChecked] = React.useState(false)

    const toggleCheckbox = (id) => {
        if (!checkedItems.includes(id)) {
            setCheckedItems(prev => {
                const arr = [...prev, id]
                if (arr.length === items.length) {
                    setGeneralCheckboxChecked(true)
                }
                return arr
            })

        } else {
            setCheckedItems(prev => {
                const arr = [...prev]
                arr.splice(prev.indexOf(id), 1)
                setGeneralCheckboxChecked(false)
                return arr
            })
        }
    }

    const toggleGeneralCheckbox = () => {
        generalCheckboxChecked ? setCheckedItems([]) : setCheckedItems(map(items, item => item.id))
        setGeneralCheckboxChecked(!generalCheckboxChecked)
    }

    return (
        <table className="admin__table">
            <thead>
                <tr>
                    <th className="admin__table__th">
                        <input
                            type="checkbox"
                            checked={generalCheckboxChecked}
                            onChange={toggleGeneralCheckbox}
                        />
                    </th>
                    {(!!editUrl || !!deleteClick) &&
                        <th className="admin__table__th"></th>
                    }
                    {map(headers, (header, index) => <th className="admin__table__th" key={`${header}_${index}`}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {map(items, (item) => (
                    <tr key={item.id}>
                        <td className="admin__table__td">
                            <input type="checkbox"
                                checked={checkedItems.includes(item.id)}
                                onChange={() => toggleCheckbox(item.id)}
                            />
                        </td>
                        {(!!editUrl || !!deleteClick) &&
                            <td className="admin__table__td">
                                {!!editUrl &&
                                    <Link to={`${editUrl}/${item.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </Link>
                                }
                                {!!deleteClick &&
                                    <svg onClick={() => deleteClick(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                }
                            </td>
                        }
                        {map(data, (d, index) => <td className="admin__table__td" key={`${item[d]}_${index}`}>{item[d]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
