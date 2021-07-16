import React from 'react'
// import axios from 'axios'

import { Slider } from '../components'
import { map } from 'lodash'
import axios from 'axios'

// import trainer_1 from '../static/trainer_1.webp'
// import trainer_2 from '../static/trainer_2.webp'
// import trainer_3 from '../static/trainer_3.webp'
// import trainer_4 from '../static/trainer_4.webp'

// const trainer = {
//     id: 1,
//     fio: 'Lorem Ipsum Dolor',
//     description: 'Описание',
//     photos: [
//         {
//             id: 1,
//             link: trainer_1
//         },
//         {
//             id: 2,
//             link: trainer_2
//         },
//         {
//             id: 3,
//             link: trainer_3
//         },
//         {
//             id: 4,
//             link: trainer_4
//         },
//     ]

// }

const TrainerFull = ({ match }) => {
    const [trainer, setTrainer] = React.useState(null)

    React.useEffect(() => {
        axios.get(`/api/trainers/get_info/${match.params.id}`).then(({ data }) => {
            setTrainer(data)
        })
    }, [match.params.id])
    return (
        <section className="trainer_full">
            <div className="main_container">
                {trainer &&

                    <div className="trainer_full__slider">
                        {trainer.photos.length
                            ? <Slider items={map(trainer.photos, photo => photo.link)} />
                            : <img src="/static/media/default_photo.webp" alt="123" />}

                    </div>
                }
                <div className="trainer_full__info">
                    <div className="trainer_full__info__name">
                        {
                            trainer ? trainer.fio : 'имя'
                        }
                    </div>
                    {
                        trainer
                            ? <div className="trainer_full__info__description" dangerouslySetInnerHTML={{ __html: trainer.description }} />
                            : <div className="trainer_full__info__description">Описание отсутствует</div>
                    }
                </div>
            </div>
        </section>
    )
}

export default TrainerFull
