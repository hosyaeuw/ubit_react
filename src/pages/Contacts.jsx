import React from 'react'

const MapBlock = React.lazy(() => import('../components/MapBlock'));

const Contacts = () => {
    return (
        <div className="main_container">
            <div className="contacts">
                <div className="contacts__info">
                    <div>
                        <div className="contacts__info__block">
                            <span className="contacts__info__block__label">Адрес:</span>
                            <p>Первомайская ул. 13, Ухта</p>
                        </div>
                        <div className="contacts__info__block">
                            <span className="contacts__info__block__label">Телефон:</span>
                            <p>+7 (912) 944-22-25</p>
                        </div>
                        <div className="contacts__info__block">
                            <span className="contacts__info__block__label">Почта:</span>
                            <p>unitedbit@mail.ru</p>
                        </div>
                    </div>
                </div>
                <div className="contacts__map">
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <MapBlock />
                    </React.Suspense>
                </div>
            </div>
        </div>
    )
}

export default Contacts
