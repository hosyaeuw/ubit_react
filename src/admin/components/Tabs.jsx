import React from 'react'

import {
    withRouter,
    NavLink
} from "react-router-dom"

const Tabs = ({ location, selectedDelete }) => {
    const convertToClearPath = (path) => {
        if (path.includes('add')) {
            path = path.substr(0, path.length - 4)
        } else if (path.includes('edit')) {
            path = path.split('/').splice(0, 3).join('/')
        }
        return path;
    }

    const convertToAddEditPath = (path) => {
        if (path.includes('/add')) {
            path = path.match(/\/\w+\/\w+\/add/)
        } else if (path.includes('/edit')) {
            path = path.match(/\/\w+\/\w+\/edit\/\d+/)
        }
        return path ? path[0] : '/';
    }
    return (
        <div className="admin__tabs">
            <NavLink to={convertToClearPath(location.pathname)} exact activeClassName="tab-active">
                <li className="admin__tabs__tab">
                    Список
                </li>
            </NavLink>
            <NavLink to={convertToAddEditPath(`${location.pathname}/add`)} activeClassName="tab-active">
                <li className="admin__tabs__tab">
                    Добавить
                </li>
            </NavLink>
            {/* <div className="admin__tabs__select admin__tabs__tab">
                С выделенными
                <ul className="admin__tabs__select__submenu">
                    <li onClick={() => selectedDelete(convertToClearPath(location.pathname))}>Удалить</li>
                </ul>
            </div> */}
        </div>
    )
}

export default withRouter(Tabs)
