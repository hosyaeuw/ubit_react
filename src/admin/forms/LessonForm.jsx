import React from 'react';

import { FormikCalendarInput, FormikForm, AdminBtnsBlock, FormikSelect } from '../components'

import * as Yup from 'yup';
import axios from 'axios';
import { forEach, map } from 'lodash'

const LessonForm = ({ match }) => {
    const [options, setOptions] = React.useState([])

    const formObj = {
        items: [
            {
                name: 'date',
                validation: 'Дата - обязательное поле',
                component: FormikCalendarInput,
                componentProps: {
                    size: 'm',
                    label: 'Дата',
                    view: 'line',
                    placeholder: ' ',
                    nameComponent: 'date',
                    id: 'date',
                    width: 'available',
                    calendar: { width: "available" }
                }
            },
            {
                name: 'trainer_id',
                validation: 'Тренер -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Тренер',
                    nameComponent: 'trainer_id',
                    id: 'trainer_id',
                    size: 'm',
                    placeholder: ' ',
                    options: options,
                    mode: 'radio',
                    view: 'line',
                    width: 'available'
                }
            }
        ]
    }

    const { id } = match.params;
    const isAddMode = !id;

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        fields['trainer_id'] = fields['trainer_id'][0]
        if (isAddMode) {
            createGroup(fields, setSubmitting, resetForm);
        } else {
            updateGroup(fields, setSubmitting, resetForm);
        }
    }

    const createGroup = (fields, setSubmitting, resetForm) => {
        axios.post('/api/lessons/add', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const updateGroup = (fields, setSubmitting, resetForm) => {
        fields['id'] = id
        axios.put(`/api/lessons/update/${id}`, fields).then(() => {
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
            axios.get('/api/trainers/get_all').then(({ data }) => {
                setOptions(map(data, obj => ({ value: obj.id, text: obj.fio })))
            })
        // if (!isAddMode) {
        //     axios.get(`/api/lessons/get/${id}`).then(({ data }) => {
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [isAddMode, id, options.length, formObj.items]);

    return (
        <FormikForm
            formObj={formObj}
            onSubmit={onSubmit}
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} занятия`}
            FieldValueRefHandle={FieldValueRefHandle}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    );
}

export default LessonForm
