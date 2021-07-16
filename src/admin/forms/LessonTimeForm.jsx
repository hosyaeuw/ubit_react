import React from 'react'

import { FormikForm, FormikInput, AdminBtnsBlock } from '../components'

import { forEach } from 'lodash'
import axios from 'axios'
import { map } from 'lodash'
import * as Yup from 'yup';

const formObj = {
    items: [
        {
            name: 'start',
            validation: 'Начало занятий - обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'Начало занятий',
                size: 'm',
                view: 'line',
                nameComponent: 'start',
                id: 'start',
                width: 'available'
            }
        },
        {
            name: 'finish',
            validation: 'Конец занятий - обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'Конец занятий',
                size: 'm',
                view: 'line',
                nameComponent: 'finish',
                id: 'finish',
                width: 'available'
            }
        },
    ]
}

const LessonTimeForm = ({ match }) => {
    const { id } = match.params;
    const isAddMode = !id;

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        if (isAddMode) {
            create(fields, setSubmitting, resetForm);
        } else {
            update(fields, setSubmitting, resetForm);
        }
    }

    const create = (fields, setSubmitting, resetForm) => {
        axios.post('/api/lesson_times/add', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const update = (fields, setSubmitting, resetForm) => {
        fields['id'] = id
        axios.put(`/api/lesson_times/update/${id}`, fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const setFieldValueRef = React.useRef(null)

    const FieldValueRefHandle = (FieldValueRef) => {
        return setFieldValueRef.current = FieldValueRef
    }

    React.useEffect(() => {
        // if (!isAddMode) {
        //     axios.get(`/api/lesson_times/get/${id}`).then(({ data }) => {
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [id, isAddMode]);
    return (
        <FormikForm
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} времени занятий`}
            FieldValueRefHandle={FieldValueRefHandle}
            formObj={formObj}
            onSubmit={onSubmit}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    )
}

export default LessonTimeForm
