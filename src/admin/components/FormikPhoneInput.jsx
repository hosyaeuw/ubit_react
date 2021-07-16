import React from 'react'

import PhoneInput from 'arui-feather/phone-input';

const FormikInput = (props) => {
    const createObj = (e) => ({
        target: {
            value: e,
            name: props.nameComponent
        }
    })
    const handleBlur = (e) => {
        props.field.onBlur(createObj(e))
    }

    const handleChange = (e) => {
        props.field.onChange(createObj(e))
    }
    return (
        <PhoneInput
            {...props}
            type={props.type ? props.type : 'text'}
            value={props.field.value}
            onBlur={handleBlur}
            onChange={handleChange}
            name={props.nameComponent}
        />
    )
}

export default FormikInput
