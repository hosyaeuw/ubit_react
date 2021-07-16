import React from 'react'

import axios from 'axios'

import { InputCopy } from '../components'

import { map } from 'lodash'

const Profile = ({ user, dispatch }) => {
    const [userT, setTUser] = React.useState(null)
    const [messages, setMessages] = React.useState([])

    const [initialValues, setInitialValues] = React.useState({
        sms: true,
        telegram: false
    })

    const checkboxChangeHandler = (e) => {
        const name = e.target.name
        let url = ''
        const data = {
            id: user.user_id,
            active: !initialValues[name]
        }
        switch (name) {
            case 'telegram':
                url = '/telegram/update_active'
                break;
            case 'sms':
                url = '/sms/update_active'
                break;
            default:
                break
        }

        axios.put(url, data).then(() => {
            setInitialValues(prev => {
                prev[name] = !prev[name]
                return { ...prev }
            })
        })
    }

    console.log(userT)

    React.useEffect(() => {
        axios.get(`/api/dancers/get/${user.user_id}`).then(({ data }) => {
            setTUser(data)
            setInitialValues({
                telegram: data.telegram.active
            })
        })
        axios.get(`/api/alerts/get_by_user/${user.user_id}`).then(({ data }) => {
            setMessages(data)
        })
    }, [user.user_id])
    return (
        <>
            {
                !!user ?
                    <div className="main_container">
                        <div className="profile">
                            {userT &&
                                <>
                                    <div className="profile__info">
                                        {/* sms */}
                                        <div className="profile__info__block">
                                            <h2 className="profile__title">
                                                СМС
                                            </h2>
                                            <label className="profile__text profile__state">
                                                Состояние
                                            <input
                                                    type="checkbox"
                                                    onChange={checkboxChangeHandler}
                                                    name="sms"
                                                    checked={initialValues.sms}
                                                />
                                            </label>
                                            <p>Приходят на номер: {userT.phone}</p>
                                        </div>
                                        {/* telegram */}
                                        <div className="profile__info__block">
                                            <h2 className="profile__title">
                                                Телеграм
                                            </h2>
                                            <p className="profile__text">
                                                Для подключения, найдите в телеграме бота <b>@ubitBot</b> и следуйте инструкциям
                                            </p>
                                            <p className="profile__text">
                                                {/* <b>Токен:</b> {userT.telegram.token} */}
                                                <b>Токен:</b> <InputCopy>{userT.telegram.token}</InputCopy>
                                            </p>

                                            {!!userT.telegram.username &&
                                                <p className="profile__text">
                                                    Ваш профиль: {userT.telegram.username}
                                                </p>
                                            }

                                            <label className="profile__text profile__state">
                                                Состояние
                                                <input
                                                    type="checkbox"
                                                    disabled={!userT.telegram.username}
                                                    onChange={checkboxChangeHandler}
                                                    name="telegram"
                                                    checked={!!userT.telegram.username && initialValues.telegram}
                                                />
                                            </label>

                                            {!!userT.telegram.username && initialValues.telegram &&
                                                <p className="profile__text">
                                                    Просьба, при активированном телеграме не включать смс для экономии трафика
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="profile__messages">
                                        <h2 className="profile__title">Последние 10 сообщений</h2>
                                        <div className="messages">
                                            {map(messages, message => (
                                                <div className="message">
                                                    <p className="profile__text">
                                                        {message.text}
                                                    </p>
                                                    <p className="message__date">
                                                        {message.date}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div> : <div>123</div>
            }
        </>
    )
}

export default Profile