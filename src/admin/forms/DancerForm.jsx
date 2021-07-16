import React from 'react';

import { FormikCalendarInput, FormikInput, FormikForm, AdminBtnsBlock, FormikSelect, FormikPhoneInput } from '../components'

import * as Yup from 'yup';
import axios from 'axios';
import { forEach, map } from 'lodash'

const DancerForm = ({ match }) => {

    const [options, setOptions] = React.useState([])
    const [needParent, setNeedParent] = React.useState(false)

    const formObj = {
        items: [
            {
                name: 'fio',
                validation: 'ФИО - обязательное поле',
                component: FormikInput,
                componentProps: {
                    label: 'ФИО',
                    size: 'm',
                    view: 'line',
                    nameComponent: 'fio',
                    id: 'fio',
                    width: 'available'
                }
            },
            {
                name: 'phone',
                validation: 'Телефон -  обязательное поле',
                component: FormikPhoneInput,
                componentProps: {
                    label: 'Телефон',
                    size: 'm',
                    view: 'line',
                    nameComponent: 'phone',
                    id: 'phone',
                    width: 'available',
                    mask: "+1 (111) 111 1111",
                    placeholder: ""
                }
            },
            {
                name: 'birthday',
                validation: 'Дата рождения - обязательное поле',
                component: FormikCalendarInput,
                componentProps: {
                    size: 'm',
                    label: 'Дата рождения',
                    view: 'line',
                    nameComponent: 'birthday',
                    id: 'birthday',
                    width: 'available',
                    calendar: { width: "available" }
                }
            },
            {
                name: 'group_id',
                validation: 'Группа -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Группа',
                    nameComponent: 'group_id',
                    id: 'group_id',
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

    if (needParent) {
        formObj['items'] = [...formObj['items'], {
            name: 'fioParent',
            validation: 'ФИО родителя - обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'ФИО родителя',
                size: 'm',
                view: 'line',
                nameComponent: 'fioParent',
                id: 'fioParent',
                width: 'available'
            }
        }, {
            name: 'phoneParent',
            validation: 'Телефон родителя -  обязательное поле',
            component: FormikPhoneInput,
            componentProps: {
                label: 'Телефон родителя',
                size: 'm',
                view: 'line',
                nameComponent: 'phoneParent',
                id: 'phoneParent',
                width: 'available',
                mask: "+1 (111) 111 1111",
                placeholder: ""
            }
        }]
    }

    const { id } = match.params;
    const isAddMode = !id;

    const initialFormValues = {}

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        const now = +new Date();
        console.log(fields)
        const birthday = Date.parse(fields['birthday'].split('.').reverse().join('-'))
        const delta = now - birthday
        const year18 = 567648000000
        setSubmitting();
        resetForm({})
        if (delta >= year18 || needParent) {
            fields['group_id'] = fields['group_id'][0]
            if (needParent) {
                fields['have_parent'] = true
            }
            if (isAddMode) {
                createGroup(fields, setSubmitting, resetForm);
            } else {
                updateGroup(fields, setSubmitting, resetForm);
            }
        } else {
            setNeedParent(true)
            setSubmitting()
        }
    }

    const createGroup = (fields, setSubmitting, resetForm) => {
        axios.post('/api/dancers/add', fields).then(() => {
            setSubmitting();
            resetForm({})
            setNeedParent(false)
        })
    }

    const updateGroup = (fields, setSubmitting, resetForm) => {
        fields['id'] = id
        axios.put(`/api/dancers/update/${id}`, fields).then(() => {
            setSubmitting();
            resetForm({})
            setNeedParent(false)
        })
    }

    const setFieldValueRef = React.useRef(null)

    const FieldValueRefHandle = (FieldValueRef) => {
        return setFieldValueRef.current = FieldValueRef
    }

    React.useEffect(() => {
        options.length === 0 &&
            axios.get('/api/groups/get_all').then(({ data }) => {
                setOptions(map(data, obj => ({ value: obj.id, text: `${obj.from_age} - ${obj.age_to}` })))
            })
        // if (!isAddMode) {
        //     axios.get(`/api/dancers/get/${id}`).then(({ data }) => {
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [isAddMode, id, options.length, formObj.items]);

    return (
        <FormikForm
            formObj={formObj}
            onSubmit={onSubmit}
            initialFormValues={initialFormValues}
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} танцора`}
            FieldValueRefHandle={FieldValueRefHandle}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />

    );
}

export default DancerForm;