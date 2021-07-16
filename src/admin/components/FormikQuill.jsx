import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const FormikQuill = (props) => {
    const modules = {
        toolbar: [
            [{ 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    const handleChange = (e) => {
        props.field.onChange({
            target: {
                value: e,
                name: props.nameComponent
            }
        })
    }
    return (
        <div>
            <ReactQuill
                theme='snow'
                onChange={handleChange}
                value={props.field.value || ''}
                modules={modules}
                formats={formats}
                {...props}
            />
        </div>
    )
}

export default FormikQuill
