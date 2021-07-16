import React from 'react'

import { Link } from 'react-router-dom';

import cn from 'classnames'

const AdminBtnsBlock = ({ isAddMode, disabled, className }) => {
    return (
        <div className="adminBtnsBlock">
            <button
                type="submit"
                disabled={disabled}
                className={cn('adminBtnsBlock__btn', className)}
            >
                {isAddMode ? 'Добавить' : 'Изменить'}
            </button>
            <Link to="..">Отмена</Link>
        </div>
    )
}

export default AdminBtnsBlock
