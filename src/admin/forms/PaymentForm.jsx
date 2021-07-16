import React from 'react'

import { FormikForm, FormikInputAutocomplete, AdminBtnsBlock, FormikCalendarInput } from '../components'

import axios from 'axios'
import { map, forEach, filter } from 'lodash'


const PaymentForm = ({ match }) => {
    const { id } = match.params;
    const isAddMode = !id;
    const [options, setOptions] = React.useState([])

    const formObj = {
        items: [
            {
                name: 'dancer',
                validation: 'Танцор -  обязательное поле',
                component: FormikInputAutocomplete,
                componentProps: {
                    label: 'Танцор',
                    nameComponent: 'dancer',
                    id: 'dancer',
                    size: 'm',
                    options: options,
                    view: 'line',
                    width: 'available',
                    value: options.length ? options[0].value : []
                }
            },
            {
                name: 'date',
                validation: 'Дата оплаты - обязательное поле',
                component: FormikCalendarInput,
                componentProps: {
                    size: 'm',
                    label: 'Дата оплаты',
                    view: 'line',
                    placeholder: ' ',
                    nameComponent: 'date',
                    id: 'date',
                    width: 'available',
                    calendar: { width: "available" }
                }
            },
        ]
    }

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        fields['id_dancer'] = filter(options, option => (
            option.value === fields.dancer
        ))[0].id
        axios.post('/api/payments/add', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
        // const formData = new FormData();
        // forEach(Object.keys(fields), key => {
        //     if (key !== 'photo') {
        //         formData.append(key, fields[key])
        //     } else {
        //         forEach(fields['photo'], (item, index) => {
        //             formData.append(`photo_${index}`, item)
        //         })
        //     }
        // })
        // if (fields['groups'].length) {
        //     fields['group_ids'] = fields['groups'].join(',')
        // }
        // if (isAddMode) {
        //     create(formData, setSubmitting, resetForm);
        // } else {
        //     update(formData, setSubmitting, resetForm);
        // }
    }

    const create = (fields, setSubmitting, resetForm) => {
        axios.post('/api/trainers/add', fields, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(() => {
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
        options.length === 0 &&
            axios.get('/api/dancers/get_all').then(({ data }) => {
                setOptions(map(data, obj => ({ id: obj.id, value: obj.fio })))
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
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} оплаты`}
            FieldValueRefHandle={FieldValueRefHandle}
            formObj={formObj}
            onSubmit={onSubmit}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    )
}

export default PaymentForm
