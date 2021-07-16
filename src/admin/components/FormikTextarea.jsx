import React from 'react'

import Textarea from 'arui-feather/textarea';

const FormikTextarea = (props) => {
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
        <Textarea
            {...props}
            value={props.field.value}
            onBlur={handleBlur}
            onChange={handleChange}
            name={props.nameComponent}
        />
    )
}

export default FormikTextarea
