import React from 'react'

import { FormikForm,  FormikSelect, AdminBtnsBlock } from '../components'

import axios from 'axios'
import { map, forEach } from 'lodash'

const TimetableForm = ({ match }) => {
    const { id } = match.params;
    const isAddMode = !id;
    const [groupOptions, setGroupOptions] = React.useState([])
    const [timeOptions, setTimeOptions] = React.useState([])
    const [dayOfTheWeekOptions, setDayOfTheWeekOptions] = React.useState([])

    const formObj = {
        items: [
            {
                name: 'group_id',
                validation: 'Группа -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Группа',
                    nameComponent: 'group_id',
                    id: 'group_id',
                    size: 'm',
                    options: groupOptions,
                    mode: 'radio',
                    view: 'line',
                    width: 'available',
                    value: []
                }
            },
            {
                name: 'lesson_time_id',
                validation: 'Время занятий -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Время занятий',
                    nameComponent: 'lesson_time_id',
                    id: 'lesson_time_id',
                    size: 'm',
                    options: timeOptions,
                    mode: 'radio',
                    view: 'line',
                    width: 'available',
                    value: []
                }
            },
            {
                name: 'day_of_the_week_id',
                validation: 'День недели -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'День недели',
                    nameComponent: 'day_of_the_week_id',
                    id: 'day_of_the_week_id',
                    size: 'm',
                    options: dayOfTheWeekOptions,
                    mode: 'radio',
                    view: 'line',
                    width: 'available',
                    value: []
                }
            }
        ]
    }

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        const data = {}
        forEach(Object.keys(fields), key => {
            data[key] = fields[key][0]
        })
        if (isAddMode) {
            create(data, setSubmitting, resetForm);
        } else {
            update(data, setSubmitting, resetForm);
        }
    }

    const create = (fields, setSubmitting, resetForm) => {
        axios.post('/api/timetable/add', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const update = (fields, setSubmitting, resetForm) => {
        fields['id'] = id
        axios.put(`/api/trainers/update/${id}`, fields, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const setFieldValueRef = React.useRef(null)

    const FieldValueRefHandle = (FieldValueRef) => {
        return setFieldValueRef.current = FieldValueRef
    }

    React.useEffect(() => {
        groupOptions.length === 0 &&
            axios.get('/api/groups/get_all').then(({ data }) => {
                setGroupOptions(map(data, obj => ({ value: obj.id, text: `${obj.from_age} - ${obj.age_to}` })))
            })
        timeOptions.length === 0 &&
            axios.get('/api/lesson_times/get_all').then(({ data }) => {
                setTimeOptions(map(data, obj => ({ value: obj.id, text: `${obj.start} - ${obj.finish}` })))
            })
        dayOfTheWeekOptions.length === 0 &&
            axios.get('/api/lesson_times/get_days').then(({ data }) => {
                setDayOfTheWeekOptions(map(data, obj => ({ value: obj.id, text: obj.name })))
            })
        // if (!isAddMode) {
        //     axios.get(`/api/news/get/${id}`).then(({ data }) => {
        //         console.log(data)
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [formObj.items, groupOptions.length, id, isAddMode, timeOptions.length, dayOfTheWeekOptions.length]);

    return (
        // <FormikFileInput />
        <FormikForm
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} тренера`}
            FieldValueRefHandle={FieldValueRefHandle}
            formObj={formObj}
            onSubmit={onSubmit}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    )
}

export default TimetableForm
