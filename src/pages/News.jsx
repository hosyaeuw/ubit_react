import React from 'react'

import { map } from 'lodash'

import { NewsCard } from '../components/'
import { fetchGetNews } from '../redux/actions/news'

const News = ({ dispatch, useSelector }) => {
    const [seeMore, setSeeMore] = React.useState(false)
    const news = useSelector(({ news }) => news.items)

    React.useEffect(() => {
        dispatch(fetchGetNews())
    }, [dispatch])
    return (
        <div className="main_container">
            <section className="news">
                <div className="news__items">
                    {/* {map(news_items.slice(0, seeMore ? news_items.length : 2), item => (
                        <NewsCard {...item} />
                    ))} */}
                    {map(news.slice(0, seeMore ? news.length : 2), item => (
                        <NewsCard {...item} />
                    ))}
                    {!seeMore &&
                        <div className="news__see_more" onClick={() => setSeeMore(prev => !prev)}>
                            <div className="news__see_more-wrapper">
                                Показать больше новостей
                            <svg className="news__see_more-svg" width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M41.25 21V20.9997C41.2373 9.82137 32.1786 0.762653 21.0003 0.75H21C9.81626 0.75 0.75 9.81626 0.75 21C0.75 32.1837 9.81626 41.25 21 41.25C32.1837 41.25 41.25 32.1837 41.25 21ZM39.4167 21C39.4167 31.1713 31.1713 39.4167 21 39.4167C10.8288 39.4167 2.58343 31.1714 2.58333 21.0002C2.59498 10.8337 10.8338 2.59492 21.0003 2.58333C31.1714 2.58348 39.4167 10.8288 39.4167 21Z" fill="white" stroke="white" strokeWidth="0.5" />
                                    <path d="M25.7063 21.0002L15.0418 10.3357C14.6793 9.98382 14.6698 9.40478 15.0211 9.04118C15.3728 8.67702 15.9531 8.66709 16.3172 9.01871L16.3176 9.01906C16.3233 9.02459 16.3306 9.03177 16.3384 9.03988L27.6506 20.3521C27.8224 20.5239 27.9192 20.757 27.9192 21.0002C27.9192 21.2435 27.8224 21.4765 27.6506 21.6483L16.3366 32.9623L16.3335 32.9654L16.3335 32.9654C15.9694 33.317 15.389 33.307 15.0374 32.9428L25.7063 21.0002ZM25.7063 21.0002L15.0404 31.6661L15.0404 31.6661L15.0374 31.6692C14.6943 32.0244 14.6943 32.5876 15.0374 32.9428L25.7063 21.0002Z" fill="white" stroke="white" strokeWidth="0.5" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="3.05754" y1="21" x2="41" y2="21" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#232323" />
                                            <stop offset="1" stop-color="#101010" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear" x1="3.05754" y1="21" x2="41" y2="21" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#232323" />
                                            <stop offset="1" stop-color="#101010" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear" x1="15.6647" y1="20.992" x2="27.6692" y2="20.992" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#232323" />
                                            <stop offset="1" stop-color="#101010" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear" x1="15.6647" y1="20.992" x2="27.6692" y2="20.992" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#232323" />
                                            <stop offset="1" stop-color="#101010" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    }
                </div>
            </section >
        </div >
    )
}

export default News
