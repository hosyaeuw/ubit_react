import React from 'react'

import { fetchGetPayments, fetchDeletePayments } from '../../redux/actions/payments'

import { map } from 'lodash'

const PaymentList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ payments }) => payments.items);

    const editUrl = '/admin/payments/edit'

    const headers = ['ФИО', 'Дата']
    const data = ['fio', 'date']

    const new_items = map(items, item => ({
        id: item.id,
        fio: item.dancer.fio,
        date: item.date
    }))

    const deleteClick = (id) => {
        // if (window.confirm(`Вы действительно хотите удалить новость?`)) {
        //     dispatch(fetchDeletePayments(id))
        // }
        alert('Нельзя удалить')
    }
    
    React.useEffect(() => {
        dispatch(fetchGetPayments())
        setCheckedItems([])
    }, [dispatch, setCheckedItems])
    return (
        <Table
            headers={headers}
            items={new_items}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            editUrl={editUrl}
            deleteClick={deleteClick}
            data={data}
        />
    )
}

export default PaymentList
