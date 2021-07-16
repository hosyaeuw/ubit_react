import React from 'react'

import { Filter, TimetableTable, TimetableRow, PopupTimetable } from '../components'
import { fetchGetBuildedTimetable } from '../redux/actions/timetable'

const Timetable = ({ dispatch, useSelector }) => {
    const [cards, isLoaded] = useSelector(({ timetable }) => [timetable.cards, timetable.isLoaded])
    const [activeFilter, setActiveFilter] = React.useState(0)

    const onClickHandler = (index) => {
        setActiveFilter(index)
    }

    React.useEffect(() => {
        dispatch(fetchGetBuildedTimetable())
    }, [dispatch])
    return (
        <section className="timetable">
            <div className="main_container">
                <h1 className="timetable__title">Расписание</h1>
                <div className="timetable__desktop">
                    <div className="timetable__filter">
                        <Filter activeFilter={activeFilter} onClick={onClickHandler} />
                    </div>
                    {!activeFilter ?
                        <TimetableTable items={cards} /> :
                        <TimetableRow items={cards} />
                    }
                </div>
                <div className="timetable__mobile">
                    {/* <PopupTimetable /> */}
                    <TimetableRow items={cards} />
                </div>
            </div>
        </section>
    )
}

export default Timetable
