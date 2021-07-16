import React from 'react'

import letuchka from '../static/home_img_letuchka.png'
// import letuchka_logo from '../static/home_img_letuchka_logo.png'
import letuchka_logo from '../static/result.png'

const Home = React.memo(function Home({ activeModalHandle }) {
    return (
        <section className="home">
            <img src={letuchka} alt="letuchka" className="home__letuchka" />
            <img src={letuchka_logo} alt="letuchka_logo" className="home__letuchka_logo" />
            <div className='home__btn-wrapper'>
                <span className="enrollment home__btn" onClick={activeModalHandle}>Записаться</span>
            </div>
        </section>
    )
})

export default Home
