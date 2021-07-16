import React from 'react'

import { fetchGetAlerts } from '../../redux/actions/alerts'

const AlertsList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ alerts }) => alerts.items);

    const headers = ['Сообщение', 'Дата отправки']
    const data = ['text', 'date']

    React.useEffect(() => {
        dispatch(fetchGetAlerts())
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

export default AlertsList
