import React from 'react'
import { fetchGetTimetable, fetchDeleteTimetable } from '../../redux/actions/timetable'
import { map } from 'lodash'
// TODO: сделать
const TimetableList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ timetable }) => timetable.items);
    console.log(items)
    const [changeItems, setChangeItems] = React.useState([])

    const editUrl = '/admin/lesson_times/edit'

    const headers = ['Время занятий', 'Группа', 'День недели']
    const data = ['time_lesson', 'group', 'day_of_the_week']

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить время занятий?`)) {
            dispatch(fetchDeleteTimetable(id))
        }
    }

    if ((items.length && !changeItems.length) || items.length < changeItems.length) {
        setChangeItems(
            map(items, item => (
                {
                    id: item.id,
                    time_lesson: `${item.time_lesson.start} - ${item.time_lesson.finish}`,
                    group: `${item.from_age} - ${item.age_to}`,
                    day_of_the_week: item.day_of_the_week.name
                }
            ))
        )
    }

    React.useEffect(() => {
        dispatch(fetchGetTimetable())
        setCheckedItems([])
    }, [dispatch, setCheckedItems])
    return (
        <Table
            headers={headers}
            items={changeItems}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            editUrl={editUrl}
            deleteClick={deleteClick}
            data={data}
        />
    )
}

export default TimetableList
