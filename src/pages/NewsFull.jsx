import React from 'react'

import axios from 'axios'

const NewsFull = ({ match }) => {
    const [testBlock, setTestBlock] = React.useState('')

    React.useEffect(() => {
        axios.get(`/api/news/get/${match.params.id}`).then(({ data }) => {
            setTestBlock(data)
        })
    }, [match])

    return (
        <section className="news_full">
            <div className="main_container">
                <h1>{testBlock.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: testBlock.text }} />
                {/* <div>
                </div> */}
            </div>
        </section>
    )
}

export default NewsFull