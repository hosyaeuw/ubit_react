import React from 'react'
import { fetchGetTrainers, fetchDeleteTrainer } from '../../redux/actions/trainers'

const TrainerList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ trainers }) => trainers.items);

    const editUrl = '/admin/trainers/edit'

    const headers = ['ФИО', 'Телефон', 'Логин']
    const data = ['fio', 'phone', 'login']

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить тренера?`)) {
            dispatch(fetchDeleteTrainer(id))
        }
    }

    React.useEffect(() => {
        dispatch(fetchGetTrainers())
        setCheckedItems([])
    }, [dispatch, setCheckedItems])
    return (
        <Table
            headers={headers}
            items={items}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            editUrl={editUrl}
            deleteClick={deleteClick}
            data={data}
        />
    )
}

export default TrainerList
