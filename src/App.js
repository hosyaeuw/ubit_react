import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Home, News, Trainers, Timetable, AboutUs, Events, Contacts, Auth, Attendance, Groups } from './pages';
import { Header, Footer, Modal, ModalRecord, Plates } from './components'

import { reactLocalStorage } from 'reactjs-localstorage';
import { setToken, setUser } from './redux/actions/user'

const PersonalData = React.lazy(() => import('./pages/PersonalData'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NewsFull = React.lazy(() => import('./pages/NewsFull'));
const TrainerFull = React.lazy(() => import('./pages/TrainerFull'));
const Admin = React.lazy(() => import('./admin/Admin'));

const App = () => {
    const dispatch = useDispatch();
    const [user, token] = useSelector(({ user }) => [user.user, user.token])

    const [activeModal, setActiveModal] = React.useState(false)

    const activeModalHandle = () => {
        setActiveModal(true)
    }

    const closeClickHandle = () => {
        setActiveModal(false)
    }

    if (!token && !!reactLocalStorage.get('token')) {
        dispatch(setToken(reactLocalStorage.get('token')))
    }

    if (!user && !!reactLocalStorage.get('user')) {
        dispatch(setUser(reactLocalStorage.getObject('user')))
    }
    const guardRoute = (component, to) => !!reactLocalStorage.get('token') ? component : to
    return (
        <>
            {activeModal && <ModalRecord closeClick={closeClickHandle} />}
            <Plates dispatch={dispatch} useSelector={useSelector}/>
            <Header activeModalHandle={activeModalHandle} user={user} dispatch={dispatch} />
            <div className="main_content">
                <Switch>
                    <Route path="/" render={() => <Home activeModalHandle={activeModalHandle} />} exact />
                    <Route path="/news" render={() => <News dispatch={dispatch} useSelector={useSelector} />} exact />
                    {/* <Route path="/news" render={() => <div className="main_container">переделать</div>} exact /> */}
                    <Route path="/news/:id" render={({ match }) =>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <NewsFull match={match} />
                        </React.Suspense>} />
                    <Route path="/trainers" render={() => <Trainers dispatch={dispatch} useSelector={useSelector}/>} exact />
                    <Route path="/trainers/:id" render={({ match }) =>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <TrainerFull match={match} />
                        </React.Suspense>} />
                    <Route path="/timetable" render={() => <Timetable dispatch={dispatch} useSelector={useSelector} />} />
                    <Route path="/about_us" component={AboutUs} />
                    <Route path="/events" render={() => <Events />} exact />
                    <Route path="/contacts" component={Contacts} />
                    <Route path="/attendance/:id" render={({ match }) =>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Attendance match={match} dispatch={dispatch} useSelector={useSelector} />
                        </React.Suspense>} />
                    <Route path="/groups" component={Groups} />
                    <Route path="/auth" render={() => guardRoute(<Redirect to='/' />, <Auth />)} />
                    <Route path="/profile" render={() => guardRoute(
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Profile user={user} dispatch={dispatch} />
                        </React.Suspense>, <Redirect to='/auth' />)} />
                    <Route path="/personal_data" render={() => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <PersonalData />
                        </React.Suspense>
                    )} />
                    <Route path="/admin" render={() => guardRoute(
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Admin />
                        </React.Suspense>, <Redirect to='/auth' />)} />
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default App
