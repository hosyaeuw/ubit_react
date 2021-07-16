import React from 'react'

import { Link } from 'react-router-dom'

const NewsCard = ({ id, preview, date, title, text }) => {
    console.log(preview)
    return (
        <div className="news_card">
            <Link to={`/news/${id}`}>
                <img src={!!preview ? preview : '/static/news_default.webp'} alt={title} className="news_card__img" />
                <div className="news_card__date">{date}</div>
                <div className="news_card__title">{title}</div>
            </Link>
        </div>
    )
}

export default NewsCard
