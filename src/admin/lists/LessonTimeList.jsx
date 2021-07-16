import React from 'react'
import { fetchGetLessonTimes, fetchDeleteLessonTimes } from '../../redux/actions/lessonTimes'

const LessonTimeList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ lessonTimes }) => lessonTimes.items);

    const editUrl = '/admin/lesson_times/edit'

    const headers = ['Время начала занятий', 'Время окончания занятий']
    const data = ['start', 'finish']

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить время занятий?`)) {
            dispatch(fetchDeleteLessonTimes(id))
        }
    }

    console.log(items)

    React.useEffect(() => {
        dispatch(fetchGetLessonTimes())
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

export default LessonTimeList
