import React from 'react'

import { map, forEach, filter } from 'lodash'

const search_time = (header, item) => {
    const items = filter(item.timetables, timetable => (
        timetable.day.id === header.id
    ))
    return items.length > 0 ? `${items[0].lesson_time.time_start}-${items[0].lesson_time.time_finish}` : ''
}

const merge = (left, right) => {
    let arr = []
    while (left.length && right.length) {
        left[0].id < right[0].id ? arr.push(left.shift()) : arr.push(right.shift())
    }
    return [...arr, ...left, ...right]
}

const mergeSort = (array) => {
    const half = array.length / 2
    if (array.length < 2) {
        return array
    }
    const left = array.splice(0, half)
    return merge(mergeSort(left), mergeSort(array))
}

const check_day = (array, item) => {
    const id = item.id
    return filter(array, item => (
        item.id === id
    )).length > 0
}

const get_headers = (items) => {
    const unique_items = []
    forEach(items, item => {
        forEach(item.timetables, timetable => {
            if (!check_day(unique_items, timetable.day)) {
                unique_items.push(timetable.day)
            }
        })
    })
    return unique_items
}

const TimetableTable = ({ items }) => {
    const headers = mergeSort(get_headers(items))
    return (
        <table className="timetable__table">
            <tbody>
                <tr>
                    <th>Возраст</th>
                    {map(headers, header => (
                        <th>{header.name}</th>
                    ))}
                </tr>
                {map(items, item => (
                    <tr>
                        <td>
                            {item.from_age}-{item.age_to}
                        </td>
                        {map(headers, header => (
                            <td>
                                {search_time(header, item)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TimetableTable
