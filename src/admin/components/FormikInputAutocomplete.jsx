import React from 'react'

import InputAutocomplete from 'arui-feather/input-autocomplete';

const FormikInputAutocomplete = (props) => {
    const getFilteredOptions = (list, typedValue) => {
        if (!typedValue) {
            return list;
        }
        const regex = new RegExp(typedValue.toLowerCase().replace(/(?!$)|(?=$)/gm, '.*'));
        return list.filter(({ value }) => regex.test(value.toLowerCase()));
    }

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
        <InputAutocomplete
            {...props}
            value={props.field.value}
            onBlur={handleBlur}
            onChange={handleChange}
            name={props.nameComponent}
            options={ getFilteredOptions(props.options, props.field.value) }
        />
    )
}

export default FormikInputAutocomplete
