import React from 'react'

import { map, forEach, filter } from 'lodash'
import axios from 'axios'

import { FormikCalendarInput } from '../admin/components/'

import { Formik, Field, Form, ErrorMessage } from 'formik';

import cn from 'classnames'

const AttendanceMonth = ({ match }) => {
    const id_group = match.params.id
    const [attendanceObj, setAttendanceObj] = React.useState(null)

    const inputChangeHandle = (lesson_id, dancer_id) => {
        forEach(attendanceObj.lessons, (lesson, lesson_index) => {
            if (lesson.id === lesson_id) {
                forEach(attendanceObj.lessons[lesson_index].attendance, (attendance, attendance_index) => {
                    if (attendance.dancer.id === dancer_id) {
                        const lesson = attendanceObj.lessons[lesson_index]
                        const data = {
                            lesson_id: lesson.id,
                            child_id: lesson.attendance[attendance_index].dancer.id,
                            present: !lesson.attendance[attendance_index].present
                        }
                        axios.put('/api/attendance/cheange_dancer_present', data).then(() => {
                            setAttendanceObj(prev => {
                                prev.lessons[lesson_index].attendance[attendance_index].present = !prev.lessons[lesson_index].attendance[attendance_index].present
                                return { ...prev }
                            })
                        })
                    }
                })
            }
        })
    }

    console.log(attendanceObj)

    const initialValues = {
        ot: '',
        do: ''
    }

    const onSubmit = (fields, { setStatus, setSubmitting, resetForm }) => {
        setStatus();
        axios.get(`/api/attendance/get_attendance_range/${id_group}?ot=${fields['ot']}&do=${fields['do']}`).then(({ data }) => {
            setAttendanceObj(data)
        })
        setSubmitting();
        resetForm({})
    }

    React.useEffect(() => {
        axios.get(`/api/attendance/get_two_month_attendance/${id_group}`).then(({ data }) => setAttendanceObj(data))
    }, [id_group])
    return (
        <div className="main_container">
            <div className="attendance">
                {attendanceObj &&
                    <>
                        <h1>Занятия c {attendanceObj.first_day} по {attendanceObj.last_day}</h1>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} >
                            {/* <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} > */}
                            <Form className="attendance__form">
                                <div className="attendance__form-wrapper">
                                    Занятия с
                                    <Field
                                        className="attendance__form__field"
                                        component={FormikCalendarInput}
                                        name="ot"
                                        nameComponent="ot"
                                        id={"ot"}
                                    // className={cn('form-control', { 'is-invalid': errors[formObj.name] && touched[formObj.name] })}
                                    />
                                    по
                                    <Field
                                        className="attendance__form__field"
                                        component={FormikCalendarInput}
                                        name="do"
                                        nameComponent="do"
                                        id={"do"}
                                    // className={cn('form-control', { 'is-invalid': errors[formObj.name] && touched[formObj.name] })}
                                    />
                                    <button>Показать</button>
                                </div>
                            </Form>
                        </Formik>
                        <table className="attendance__table">
                            <thead>
                                <tr>
                                    <th>Фамилия</th>
                                    <th>Абонимент</th>
                                    {map(attendanceObj.lessons, lesson => (
                                        <th key={lesson.id}>{lesson.date}</th>
                                    ))}
                                </tr>
                                {map(attendanceObj.dancers, dancer => (
                                    <tr key={dancer.id}>
                                        <td className="name">{dancer.fio}</td>
                                        <td className="name">{`${Math.floor(Math.random() * 8)} занятий`}</td>
                                        {/* <td className="name">{dancer.membership !== null && `${dancer.membership.count_no_present} занятий`}</td> */}
                                        {map(attendanceObj.lessons, lesson => {
                                            const isPresent = filter(lesson.attendance, attendance => (
                                                attendance.dancer.id === dancer.id
                                            ))[0].present
                                            return (
                                                <td key={lesson.id}>
                                                    <label className={cn('attendance', {
                                                        present: isPresent
                                                    })}>
                                                        <input type="checkbox" checked={isPresent} onChange={() => inputChangeHandle(lesson.id, dancer.id)} />
                                                    </label>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                                <tr>
                                    <th>Фамилия</th>
                                    <th>Абонимент</th>
                                    {map(attendanceObj.lessons, lesson => (
                                        <th key={lesson.id}>{lesson.date}</th>
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </>
                }
            </div>
        </div>
    )
}

export default AttendanceMonth
