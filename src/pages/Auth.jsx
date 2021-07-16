import React from 'react'

import { FormikInput, FormikForm } from '../admin/components'
import { auth } from '../redux/actions/user'

import { forEach } from 'lodash'
import * as Yup from 'yup';

import { useDispatch } from 'react-redux'

const formObj = {
    header: 'Авторизация',
    items: [
        {
            name: 'username',
            validation: 'Логин - обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'Логин',
                theme: 'alfa-on-color',
                size: 'm',
                view: 'line',
                nameComponent: 'username',
                id: 'username',
                width: 'available'
            }
        },
        {
            name: 'pass',
            // validation: Yup.string().required('Пароль -  обязательное поле'),
            validation: 'Пароль -  обязательное поле',
            component: FormikInput,
            componentProps: {
                label: 'Пароль',
                type: 'password',
                theme: 'alfa-on-color',
                size: 'm',
                view: 'line',
                nameComponent: 'pass',
                id: 'pass',
                width: 'available'
            }
        }
    ]
}

const Auth = () => {
    const dispatch = useDispatch()

    const initialFormValues = {}
    const initialValidationValues = {}
    forEach(formObj.items, obj => {
        initialFormValues[obj.name] = '';
        initialValidationValues[obj.name] = Yup.string().required(obj.validation)
    })

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        const req_data = { username: fields['username'], password: fields['pass'] }
        dispatch(auth(req_data))
        setSubmitting();
        resetForm({})
    }

    return (
        <section className="auth">
            <div className="auth-wrapper">
                <FormikForm
                    className="auth__form"
                    initialValidationValues={initialValidationValues}
                    initialFormValues={initialFormValues}
                    formTitle={'Авторизация'}
                    formObj={formObj}
                    onSubmit={onSubmit}
                    BtnComponent={({ disabled }) => <div className="auth__btn-wrapper"><button type="submit" className="auth__btn" disabled={disabled}>Войти</button></div>}
                />
            </div>
        </section>
    )
}

export default Auth
