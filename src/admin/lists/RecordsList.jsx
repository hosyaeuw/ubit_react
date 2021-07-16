import React from 'react'

import { fetchGetRecords } from '../../redux/actions/records'

const RecordsList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ records }) => records.items);

    const headers = ['ФИО', 'Телефон', 'Дата заявки']
    const data = ['fio', 'phone', 'date']

    React.useEffect(() => {
        dispatch(fetchGetRecords())
        setCheckedItems([])
    }, [dispatch, setCheckedItems])
    return (
        <Table
            headers={headers}
            items={items}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            data={data}
        />
    )
}

export default RecordsList
