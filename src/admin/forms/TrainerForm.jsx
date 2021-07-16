import React from 'react'

import { FormikForm, FormikPhoneInput, FormikFileInput, FormikInput, FormikSelect, AdminBtnsBlock, FormikQuill } from '../components'

import axios from 'axios'
import { map, forEach } from 'lodash'
import * as Yup from 'yup';

const TrainerForm = ({ match }) => {
    const { id } = match.params;
    const isAddMode = !id;
    const [groupOptions, setGroupOptions] = React.useState([])
    const [officeOptions, setOfficeOptions] = React.useState([])

    const formObj = {
        items: [
            {
                name: 'fio',
                validation: 'ФИО - обязательное поле',
                component: FormikInput,
                componentProps: {
                    label: 'Фио',
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
                name: 'office_id',
                validation: 'Должность -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Должность',
                    nameComponent: 'office_id',
                    id: 'office_id',
                    size: 'm',
                    options: officeOptions,
                    mode: 'radio',
                    view: 'line',
                    width: 'available',
                    value: []
                }
            },
            {
                name: 'groups',
                validation: 'Группы -  обязательное поле',
                component: FormikSelect,
                componentProps: {
                    label: 'Группы',
                    nameComponent: 'groups',
                    id: 'groups',
                    size: 'm',
                    options: groupOptions,
                    mode: 'check',
                    view: 'line',
                    width: 'available',
                    value: []
                }
            },
            {
                name: 'description',
                validation: 'Стоимость - обязательное поле',
                component: FormikQuill,
                label: 'Описание тренера',
                componentProps: {
                    nameComponent: 'description',
                    id: 'description',
                }
            },
            {
                name: 'photo',
                validation: 'ФИО - обязательное поле',
                component: FormikFileInput,
                componentProps: {
                    nameComponent: 'photo',
                    id: 'photo',
                    accept: 'image/jpeg,image/png,image/webm',
                    noFileText: 'Файл не выбран',
                    buttonContent: 'Выберите файл',
                    size: 'm',
                    multiple: true
                }
            },
        ]
    }

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        const formData = new FormData();
        forEach(Object.keys(fields), key => {
            if (key !== 'photo') {
                formData.append(key, fields[key])
            } else {
                forEach(fields['photo'], (item, index) => {
                    formData.append(`photo_${index}`, item)
                })
            }
        })
        if (fields['groups'].length) {
            fields['group_ids'] = fields['groups'].join(',')
        }
        if (isAddMode) {
            create(formData, setSubmitting, resetForm);
        } else {
            update(formData, setSubmitting, resetForm);
        }
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
        groupOptions.length === 0 &&
            axios.get('/api/groups/get_all').then(({ data }) => {
                setGroupOptions(map(data, obj => ({ value: obj.id, text: `${obj.from_age} - ${obj.age_to}` })))
            })
        officeOptions.length === 0 &&
            axios.get('/api/trainer_office/get_all').then(({ data }) => {
                setOfficeOptions(map(data, obj => ({ value: obj.id, text: obj.name })))
            })
        // if (!isAddMode) {
        //     axios.get(`/api/news/get/${id}`).then(({ data }) => {
        //         console.log(data)
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [groupOptions.length, officeOptions.length, isAddMode, id, formObj.items]);

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

export default TrainerForm
