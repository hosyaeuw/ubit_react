import React from 'react'
import Select from 'arui-feather/select';


const FormikSelect = (props) => {
    const handleChange = (e) => {
        props.field.onChange({
            target: {
                value: e,
                name: props.nameComponent
            }
        })
    }
    return (
        <Select
            {...props}
            onChange={handleChange}
            value={typeof props.field.value === 'string' ? [] : props.field.value}
        />
    )
}

export default FormikSelect
