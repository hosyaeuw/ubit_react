import React from 'react'

import logo_2 from '../static/logo_1.png'
import logo_3 from '../static/logo_2.png'
import logo_7 from '../static/logo_3.png'
import logo_4 from '../static/logo_4.png'
import logo_6 from '../static/logo_5.png'
import logo_5 from '../static/logo_6.png'
import logo_1 from '../static/logo_7.png'

const Footer = React.memo(function Footer() {
    return (
        <section className="footer">
            <div className="footer-wrapper">
                <div className="footer__info">
                    <div>
                        <h3 className="footer__info__title">Контакты</h3>
                        <p className="footer__info__item">unitedbit@mail.ru</p>
                        <p className="footer__info__item">+7 (912) 944-22-25</p>
                        <p className="footer__info__item">+7 (912) 944-22-25</p>
                    </div>
                </div>
                <ul className="footer__partners">
                    <li className="footer__partners__item"><a href="/"><img src={logo_1} alt="logo_1" /></a></li>
                    <li className="footer__partners__item"><a href="/"><img src={logo_2} alt="logo_2" /></a></li>
                    <li className="footer__partners__item"><a href="/"><img src={logo_3} alt="logo_3" /></a></li>
                    <li className="footer__partners__item"><a href="/"><img src={logo_4} alt="logo_4" /></a></li>
                    <li className="footer__partners__item"><a href="/"><img src={logo_5} alt="logo_5" /></a></li>
                    <li className="footer__partners__item"><a href="/"><img src={logo_6} alt="logo_6" /></a></li>
                    <li className="footer__partners__item"><a href="/"><img src={logo_7} alt="logo_7" /></a></li>
                </ul>
            </div>
        </section>
    )
})

export default Footer
