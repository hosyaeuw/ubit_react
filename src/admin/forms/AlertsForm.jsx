import React from 'react'

import { FormikTextarea, AdminBtnsBlock, FormikForm, FormikSelect } from '../components'

import * as Yup from 'yup';
import axios from 'axios';
import { forEach, map } from 'lodash'

const AlertsForm = ({ match }) => {
    const [options, setOptions] = React.useState([])
    const formObj = {
        items: [
            {
                name: 'message',
                validation: 'ФИО - обязательное поле',
                component: FormikTextarea,
                componentProps: {
                    label: 'Сообщение',
                    size: 'm',
                    view: 'line',
                    nameComponent: 'message',
                    id: 'message',
                    width: 'available'
                }
            },
            {
                name: 'groups',
                validation: 'Группа для отправки -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Группа для отправки',
                    nameComponent: 'groups',
                    id: 'groups',
                    size: 'm',
                    options: options,
                    mode: 'check',
                    view: 'line',
                    width: 'available',
                    value: options.length ? options[0].value : []
                }
            }
        ]
    }

    const { id } = match.params;
    const isAddMode = !id;

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        axios.post('/api/alerts/send_message', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const initialFormValues = {}

    React.useEffect(() => {
        options.length === 0 &&
            axios.get('/api/groups/get_all').then(({ data }) => {
                console.log(data)
                setOptions([{value: 'all', text: 'Всем'}, ...map(data, obj => ({ value: obj.id, text: `${obj.from_age} - ${obj.age_to}` }))])
            })
    }, [options.length]);
    return (
        <FormikForm
            formObj={formObj}
            onSubmit={onSubmit}
            initialFormValues={initialFormValues}
            formTitle={`${isAddMode ? 'Отправка' : 'Изменение'} оповещения`}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    )
}

export default AlertsForm
