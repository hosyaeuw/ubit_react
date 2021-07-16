import React from 'react'

import { map } from 'lodash'

const TimetableCard = ({ card }) => {
    return (
        <div className="timetable_card">
            <div>
                <p className="timetable_card__age">{card.age}</p>
                {map(card.items, item => (
                    <div key={`${card.age}_${item.days}_${item.time}`}>
                        <p className="timetable_card__days">{item.days}</p>
                        <p className="timetable_card__time">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TimetableCard
