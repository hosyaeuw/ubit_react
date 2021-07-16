import React from 'react'
import { Link } from 'react-router-dom'

const TrainerCard = ({ info }) => {
    return (
        <div className="trainer_card">
            <Link to={`/trainers/${info.id}`}>
                <img className="trainer_card__img" src={info.photo} alt={info.fio} />
                <div className="trainer_card__name-wrapper">
                    <span className="trainer_card__name">
                        {info.fio}
                    </span>
                    <span className="trainer_card__office">
                        {info.office}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default TrainerCard
