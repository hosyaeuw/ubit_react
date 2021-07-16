import React from 'react'

import { NavLink } from "react-router-dom"
import { map } from 'lodash'

const Menu = ({ adminMapper }) => {
    return (
        <ul className="admin_menu">
            {map(Object.keys(adminMapper), key => (
                <NavLink to={`/admin/${key}`} activeClassName="active"><li className="admin_menu__item">{adminMapper[key]}</li></NavLink>
            ))}

            {/*<NavLink to='/admin/alerts' activeClassName="active"><li className="admin_menu__item">Сообщения</li></NavLink>
            <NavLink to='/admin/dancers' activeClassName="active"><li className="admin_menu__item">Танцоры</li></NavLink>
            <NavLink to='/admin/trainers' activeClassName="active"><li className="admin_menu__item">Тренера</li></NavLink>
            <NavLink to='/admin/groups' activeClassName="active"><li className="admin_menu__item">Группы</li></NavLink>
            <NavLink to='/admin/news' activeClassName="active"><li className="admin_menu__item">Новости</li></NavLink>
            <NavLink to='/admin/lessons' activeClassName="active"><li className="admin_menu__item">Занятия</li></NavLink>
            <NavLink to='/admin/timetable' activeClassName="active"><li className="admin_menu__item">Расписание</li></NavLink>
            <NavLink to='/admin/lesson_times' activeClassName="active"><li className="admin_menu__item">Время занятий</li></NavLink> */}
        </ul>
    )
}

export default Menu
