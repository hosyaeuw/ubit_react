import React from 'react'

import { TimetableCard } from './'

import { map, forEach } from 'lodash'

// TODO: переделать
const generate_item = (timetables) => {
    const items = []
    let ids = 1
    for (let i = 0; i < timetables.length; i++) {
        let index_item = -1
        const time = `${timetables[i].lesson_time.time_start} - ${timetables[i].lesson_time.time_finish}`
        forEach(items, (item, index) => {
            if (item.time === time) {
                index_item = index
            }
        })
        if (index_item === -1) {
            items.push(
                {
                    id: ids,
                    days: timetables[i].day.abbreviation,
                    time: time
                }
            )
            ids += 1;
        } else {
            items[index_item]['days'] = `${items[index_item]['days']}/${timetables[i].day.abbreviation}`
        }
    }
    return items
}

const TimetableRow = ({ items }) => {
    items = map(items, obj => (
        {
            age: `${obj.from_age} - ${obj.age_to} лет`,
            price: obj.price,
            items: generate_item(obj.timetables)
        }
    ));

    return (
        <div className="timetable__row">
            <div className="timetable__row-wrapper">
                {map(items, item => (
                    <TimetableCard card={item} />
                ))}
            </div>
        </div>
    )
}

export default TimetableRow
