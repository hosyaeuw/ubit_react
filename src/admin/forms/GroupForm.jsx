import React from 'react';

import { FormikInput, FormikForm, AdminBtnsBlock } from '../components'

import * as Yup from 'yup';
import axios from 'axios';
import { forEach, map } from 'lodash'

const formObj = {
    items: [
        {
            name: 'from_age',
            validation: 'От скольки лет - обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'От скольки лет',
                size: 'm',
                view: 'line',
                nameComponent: 'from_age',
                id: 'from_age',
                width: 'available'
            }
        },
        {
            name: 'age_to',
            validation: 'До сколько лет -  обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'До скольки лет',
                size: 'm',
                view: 'line',
                nameComponent: 'age_to',
                id: 'age_to',
                width: 'available'
            }
        }
    ]
}

const GroupForm = ({ match }) => {
    const { id } = match.params;
    const isAddMode = !id;

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        if (isAddMode) {
            createGroup(fields, setSubmitting, resetForm);
        } else {
            updateGroup(fields, setSubmitting, resetForm);
        }
    }

    const createGroup = (fields, setSubmitting, resetForm) => {
        axios.post('/api/groups/add', fields).then(() => {
            setSubmitting();
            resetForm({})
        })
    }

    const updateGroup = (fields, setSubmitting, resetForm) => {
        fields['id'] = id
        axios.put(`/api/groups/update/${id}`, fields).then(() => {
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
        //     axios.get(`/api/groups/get/${id}`).then(({ data }) => {
        //         const fields = map(formObj.items, obj => obj.name);
        //         forEach(fields, field => setFieldValueRef.current(field, data[field], false));
        //     })
        // }
    }, [isAddMode, id]);

    return (
        <FormikForm
            formTitle={`${isAddMode ? 'Добавление' : 'Изменение'} группы`}
            isAddMode={isAddMode}
            formObj={formObj}
            onSubmit={onSubmit}
            FieldValueRefHandle={FieldValueRefHandle}
            BtnComponent={(props) => <AdminBtnsBlock {...props} isAddMode={isAddMode} />}
        />
    );
}

export default GroupForm;