import React from 'react'

import { Modal } from './'

const PopupTimetable = () => {
    const [activeModal, setActiveModal] = React.useState(false)

    const activeModalHandle = () => {
        setActiveModal(true)
    }

    const closeClickHandle = () => {
        setActiveModal(false)
    }
    return (
        <Modal className="closeClickHandle">
            <div className="popup_timetable">
                <span className="popup_timetable__close close_btn" onClick={closeClickHandle}>
                    &times;
                </span>
                <div className="popup_timetable__content">
                    <h2 className="popup_timetable__title">Название группы</h2>
                    <div className="popup_timetable__table">
                        <div>
                            <div>
                                5-8p
                            </div>
                            <div>
                                <span>
                                    Пн.
                                </span>
                                <span>
                                    Ср.
                                </span>
                                <span>
                                    Пт.
                                </span>
                            </div>
                            <div>
                                15:30 - 17:30
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PopupTimetable
