import React from 'react'
import { fetchGetNews, fetchDeleteNews } from '../../redux/actions/news'

const NewsList = ({ dispatch, useSelector, checkedItems, setCheckedItems, Table }) => {
    const items = useSelector(({ news }) => news.items);

    const editUrl = '/admin/news/edit'

    const headers = ['Название статьи', 'Дата', 'Тип новости']
    const data = ['title', 'date', 'news_type']

    const deleteClick = (id) => {
        if (window.confirm(`Вы действительно хотите удалить новость?`)) {
            dispatch(fetchDeleteNews(id))
        }
    }

    React.useEffect(() => {
        dispatch(fetchGetNews())
        setCheckedItems([])
    }, [dispatch, setCheckedItems])
    return (
        <Table
            headers={headers}
            items={items}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            editUrl={editUrl}
            deleteClick={deleteClick}
            data={data}
        />
    )
}

export default NewsList
