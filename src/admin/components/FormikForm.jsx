import React from 'react'

import { map, forEach } from 'lodash'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import cn from "classnames"

const FormikForm = ({ formTitle, formObj, onSubmit, FieldValueRefHandle, BtnComponent, className, initialFormValues = {} }) => {
    // const initialFormValues = {}
    const initialValidationValues = {}
    forEach(formObj.items, obj => {
        initialFormValues[obj.name] = '';
        // initialValidationValues[obj.name] = Yup.string().required(obj.validation)
    })
    const validationSchema = Yup.object().shape(initialValidationValues);

    return (
        <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                !!FieldValueRefHandle && FieldValueRefHandle(setFieldValue)
                return (
                    <Form className={className}>
                        <h1>{formTitle}</h1>
                        {formObj && map(formObj['items'], (formObj => (
                            <div key={formObj.name}>
                                <label htmlFor={formObj.name}>
                                    {formObj.label}
                                </label>
                                <div className="form__field">
                                    {formObj.component
                                        ? <Field
                                            component={formObj.component}
                                            {...formObj.componentProps}
                                            name={formObj.name}
                                            id={formObj.name}
                                            className={cn('form-control', { 'is-invalid': errors[formObj.name] && touched[formObj.name] })}
                                        />
                                        : <Field
                                            type={formObj.type ? formObj.type : 'text'}
                                            name={formObj.name}
                                            id={formObj.name}
                                            className={cn('form-control', { 'is-invalid': errors[formObj.name] && touched[formObj.name] })}
                                        />
                                    }

                                    <ErrorMessage name={formObj.name} component="div" className="invalid-feedback" />
                                </div>
                            </div>
                        )))}
                        {!!BtnComponent && <BtnComponent className="form__btn" disabled={isSubmitting} />}
                    </Form>
                );
            }}
        </Formik>
    )
}

export default FormikForm
