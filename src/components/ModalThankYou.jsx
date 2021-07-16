import React from 'react'

import { Modal } from './'
// сделать на одном модальном окне
const ModalThankYou = ({ closeClick }) => {
    return (
        <Modal closeClick={closeClick}>
            <div className="modal_thank_you">
                <span className="modal_record__close close_btn" onClick={closeClick}>
                    &times;
                </span>
            </div>
        </Modal>
    )
}

export default ModalThankYou
