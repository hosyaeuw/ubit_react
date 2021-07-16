import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// import { forEach } from 'lodash'
// import {withRouter} from 'react-router-dom';


// import { fetchDeleteGroup } from '../../redux/actions/groups'
// import axios from 'axios'

import { Route, Switch, Redirect } from "react-router-dom"

import { TrainerList, DancerList, NewsList, GroupList, LessonList, LessonTimeList, TimetableList, AlertsList, PaymentList, RecordsList } from './lists'
import { TrainerForm, DancerForm, NewsForm, GroupForm, LessonForm, LessonTimeForm, TimetableForm, AlertsForm, PaymentForm, RecordsForm } from './forms'
import { Menu, Tabs, Table } from './components'

const adminMapper = {
    'alerts': 'Сообщения',
    'payment': 'Оплата',
    'records': 'Записи на урок',
    'news': 'Новости',
    'dancers': 'Танцоры',
    'trainers': 'Тренера',
    'groups': 'Группы',
    // 'lessons': 'Занятия',
    'timetable': 'Расписание',
    'lesson_times': 'Время занятий',
}


const Admin = ({ history }) => {
    const dispatch = useDispatch()

    const [checkedItems, setCheckedItems] = React.useState([])

    const selectedDelete = (path) => {
        //     const splitPath = path.split('/')
        //     if (window.confirm(`Вы действительно хотите удалить элементы?`)) {
        //         // map(checkedItems, checkedItem => dispatch(fetchDeleteGroup(checkedItem)))
        //         // forEach(checkedItems, checkedItem => axios.delete(`/api/${splitPath[splitPath.length - 1]}/delete/${checkedItem}`))
        //         history.push(path)
        //     }
    }

    return (
        <div className="main_container">
            <div className="admin-container">
                <Menu adminMapper={adminMapper} />
                <div className="admin-body">
                    <Tabs selectedDelete={selectedDelete} />
                    <Switch>
                        {/* <Route path='/admin' component={DancerList} exact/> */}
                        <Redirect from="/admin" to="/admin/alerts" exact />

                        <Route path='/admin/dancers' render={() => <DancerList
                            Table={Table}
                            checkedItems={checkedItems}
                            dispatch={dispatch}
                            useSelector={useSelector}
                            setCheckedItems={setCheckedItems}
                        />} exact />
                        <Route path='/admin/dancers/add' component={DancerForm} />
                        <Route path='/admin/dancers/edit/:id' component={DancerForm} />

                        <Route path='/admin/trainers' render={() => <TrainerList
                            Table={Table}
                            checkedItems={checkedItems}
                            dispatch={dispatch}
                            useSelector={useSelector}
                            setCheckedItems={setCheckedItems}
                        />} exact />
                        <Route path='/admin/trainers/add' component={TrainerForm} />
                        <Route path='/admin/trainers/edit/:id' component={TrainerForm} />


                        <Route path='/admin/news'
                            render={() => <NewsList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/news/add' render={({ match }) => <NewsForm match={match} useSelector={useSelector} />} />
                        <Route path='/admin/news/edit/:id' render={({ match }) => <NewsForm match={match} useSelector={useSelector} />} />


                        <Route path='/admin/groups'
                            render={() => <GroupList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/groups/add' component={GroupForm} />
                        <Route path='/admin/groups/edit/:id' component={GroupForm} />


                        <Route path='/admin/lessons'
                            render={() => <LessonList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/lessons/add' component={LessonForm} />
                        <Route path='/admin/lessons/edit/:id' component={LessonForm} />

                        <Route path='/admin/lesson_times'
                            render={() => <LessonTimeList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/lesson_times/add' component={LessonTimeForm} />
                        <Route path='/admin/lesson_times/edit/:id' component={LessonTimeForm} />

                        <Route path='/admin/timetable'
                            render={() => <TimetableList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/timetable/add' component={TimetableForm} />
                        <Route path='/admin/timetable/edit/:id' component={TimetableForm} />

                        <Route path='/admin/alerts'
                            render={() => <AlertsList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/alerts/add' component={AlertsForm} />
                        <Route path='/admin/alerts/edit/:id' component={AlertsForm} />

                        <Route path='/admin/payment'
                            render={() => <PaymentList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/payment/add' component={PaymentForm} />
                        <Route path='/admin/payment/edit/:id' component={PaymentForm} />

                        <Route path='/admin/records'
                            render={() => <RecordsList
                                Table={Table}
                                checkedItems={checkedItems}
                                dispatch={dispatch}
                                useSelector={useSelector}
                                setCheckedItems={setCheckedItems}
                            />} exact />
                        <Route path='/admin/records/add' component={RecordsForm} />
                        <Route path='/admin/records/edit/:id' component={RecordsForm} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Admin