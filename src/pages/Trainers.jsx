import React from 'react'

import { TrainerCard } from '../components'

import { map } from 'lodash'
import { fetchGetTrainerCards } from '../redux/actions/trainers'

const Trainers = ({ dispatch, useSelector }) => {
    const trainers = useSelector(({ trainers }) => trainers.cards)
    console.log(trainers)

    React.useEffect(() => {
        dispatch(fetchGetTrainerCards())
    }, [dispatch])
    return (
        <section className="trainers">
            <div className="main_container">
                <div className="trainers__items">
                    {map(trainers, trainer => (
                        <TrainerCard info={trainer} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Trainers
