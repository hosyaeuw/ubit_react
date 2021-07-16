import React from 'react'

import { Slider } from '../components'

import { map } from 'lodash'
import axios from 'axios'

const TrainerProfile = ({ dispatch, exit, user }) => {
    const [profile, setProfile] = React.useState(null)

    console.log(profile)

    React.useEffect(() => {
        axios.get(`/api/trainers/get/${user.user_id}`).then(({ data }) => {
            setProfile(data)
        })
    }, [user.user_id])
    return (
        <div>
            {!!profile &&
                <div>
                    <h1>
                        {profile.fio}
                    </h1>
                    <div>
                        {!!profile.photos.length
                            ? <Slider items={map(profile.photos, photo => photo.link)} />
                            : <div>нет фото</div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default TrainerProfile
