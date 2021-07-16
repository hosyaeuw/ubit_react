import React from 'react'
import { fetchGetDancers, fetchDeleteDancer } from '../../redux/actions/dancers'

const DancerList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ dancers }) => dancers.items);

    const editUrl = '/admin/dancers/edit'

    const headers = ['ФИО', 'Телефон', 'Логин', 'Дата рождения']
    const data = ['fio', 'phone', 'login', 'birthday']

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить танцора?`)) {
            dispatch(fetchDeleteDancer(id))
        }
    }

    React.useEffect(() => {
        dispatch(fetchGetDancers())
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

export default DancerList
