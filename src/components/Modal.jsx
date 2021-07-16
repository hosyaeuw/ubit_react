import React from 'react'

const Modal = ({ closeClick, children }) => {
    return (
        <div className="modal-wrapper">
            <div className="modal">
                {children}
            </div>
        </div>
    )
}

export default Modal
