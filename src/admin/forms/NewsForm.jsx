import React from 'react'

import { FormikForm, FormikQuill, FormikInput, FormikSelect, AdminBtnsBlock, FormikFileInput } from '../components'

import axios from 'axios'
import { map, forEach } from 'lodash'
import * as Yup from 'yup';


const NewsForm = ({ match, useSelector }) => {
    const user_id = useSelector(({ user }) => user.user.user_id)
    const { id } = match.params;
    const isAddMode = !id;
    const [options, setOptions] = React.useState([])
    const formObj = {
        items: [
            {
                name: 'title',
                validation: 'От скольки лет - обязательное поле',
                component: FormikInput,
                componentProps: {
                    label: 'Название',
                    size: 'm',
                    view: 'line',
                    nameComponent: 'title',
                    id: 'title',
                    width: 'available'
                }
            },
            {
                name: 'news_type',
                validation: 'До сколько лет -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Тип новости',
                    nameComponent: 'news_type',
                    id: 'news_type',
                    size: 'm',
                    options: options,
                    mode: 'radio',
                    view: 'line',
                    width: 'available',
                    value: options.length ? options[0].value : []
                }
            },
            {
                name: 'text',
                validation: 'Стоимость - обязательное поле',
                component: FormikQuill,
                componentProps: {
                    nameComponent: 'text',
                    id: 'text',
                }
            },

            {
                label: 'Превью',
                name: 'preview',
                validation: 'ФИО - обязательное поле',
                component: FormikFileInput,
                componentProps: {
                    nameComponent: 'preview',
                    id: 'preview',
                    accept: 'image/jpeg,image/png,image/webm',
                    noFileText: 'Файл не выбран',
                    buttonContent: 'Выберите файл',
                    size: 'm'
                }
            },
        ]
    }

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        if (!!fields['preview'].length) {
            fields['preview'] = fields['preview'][0]
        }
        if (fields['news_type'].length) {
            fields['news_type_id'] = fields['news_type'][0]
        } else {
            fields['news_type_id'] = options[0].value
        }
        fields['author_id'] = user_id
        const formData = new FormData();
        forEach(Object.keys(fields), key => {
            formData.append(key, fields[key])
        })
        if (isAddMode) {
            create(formData, setSubmitting, resetForm);
        } else {
            update(formData, setSubmitting, resetForm);
        }
    }

    const create = (fields, setSubmitting, resetForm) => {
        axios.post('/api/news/add', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const update = (fields, setSubmitting, resetForm) => {
        fields['id'] = id
        axios.put(`/api/news/update/${id}`, fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const setFieldValueRef = React.useRef(null)

    const FieldValueRefHandle = (FieldValueRef) => {
        return setFieldValueRef.current = FieldValueRef
    }

    React.useEffect(() => {
        options.length === 0 &&
            axios.get('/api/news_types/get_all').then(({ data }) => {
                setOptions(map(data, obj => ({ value: obj.id, text: obj.name })))
            })
        // if (!isAddMode) {
        //     axios.get(`/api/news/get/${id}`).then(({ data }) => {
        //         console.log(data)
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [options.length, isAddMode, id, formObj.items]);
    return (
        <FormikForm
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} новости`}
            FieldValueRefHandle={FieldValueRefHandle}
            formObj={formObj}
            onSubmit={onSubmit}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    )
}

export default NewsForm
