import React from 'react'

import CalendarInput from 'arui-feather/calendar-input';

const FormikCalendarInput = (props) => {
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
        <CalendarInput
            {...props}
            value={props.field.value}
            onBlur={handleBlur}
            onChange={handleChange}
            name={props.nameComponent}
        />
    )
}

export default FormikCalendarInput
