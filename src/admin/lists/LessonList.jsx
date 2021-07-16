import React from 'react'

import { fetchGetLessons, fetchDeleteLesson } from '../../redux/actions/lessons'

const LessonList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ lessons }) => lessons.items);

    const headers = ['Дата', 'Тренер']
    const data = ['date', 'trainer']

    const editUrl = '/admin/lessons/edit'

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить новость?`)) {
            dispatch(fetchDeleteLesson(id))
        }
    }

    React.useEffect(() => {
        dispatch(fetchGetLessons())
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

export default LessonList
