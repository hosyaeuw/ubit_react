import React from 'react'

import Attach from 'arui-feather/attach';

const FormikFileInput = (props) => {
    const createObj = (e) => {
        console.log(e)
        return {
            target: {
                value: e,
                name: props.nameComponent
            }
        }
    }

    const handleChange = (e) => {
        props.field.onChange(createObj(e))
    }
    return (
        <Attach
            type="file"
            onChange={handleChange}
            {...props}
            name={props.nameComponent}
        />
    )
}

export default FormikFileInput
