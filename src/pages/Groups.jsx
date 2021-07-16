import React from 'react'

import { TimetableCard } from '../components'
import { Link } from 'react-router-dom'
import { map, forEach } from 'lodash'
import axios from 'axios'

import { reactLocalStorage } from 'reactjs-localstorage';

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

const Groups = () => {

    const [items, setItems] = React.useState(null)

    const trainer_id = reactLocalStorage.getObject('user').user_id;

    React.useEffect(() => {
        axios.get(`api/groups/get_by_trainer/${trainer_id}`).then(({ data }) => {
            setItems(map(data, obj => (
                {
                    id: obj.id,
                    age: `${obj.from_age} - ${obj.age_to} лет`,
                    price: obj.price,
                    items: generate_item(obj.timetables)
                }
            )))
        })
    }, [trainer_id])

    return (
        <div className="main_container">
            <div className="groups">
                {map(items, item => (
                    <div className="groups__item">
                        <Link to={`/attendance/${item.id}`}>
                            <TimetableCard card={item} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Groups
