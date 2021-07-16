import React from 'react'
import { fetchGetGroups, fetchDeleteGroup } from '../../redux/actions/groups'

const GroupList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ groups }) => groups.items);

    const editUrl = '/admin/groups/edit'

    const headers = ['От скольки лет', 'До скольки лет']
    const data = ['from_age', 'age_to']

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить группу?`)) {
            dispatch(fetchDeleteGroup(id))
        }
    }

    React.useEffect(() => {
        dispatch(fetchGetGroups())
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

export default GroupList
