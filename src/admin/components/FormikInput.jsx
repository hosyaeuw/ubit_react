import React from 'react'

import Input from 'arui-feather/input';

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
        <Input
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
