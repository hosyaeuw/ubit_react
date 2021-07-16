import { combineReducers } from 'redux';

import trainers from './trainers';
import groups from './groups';
import dancers from './dancers';
import news from './news';
import user from './user';
import lessons from './lessons';
import timetable from './timetable';
import lessonTimes from './lessonTimes';
import payments from './payments';
import alerts from './alerts';
import records from './records';
import plates from './plates';

const rootReducer = combineReducers({
    trainers,
    groups,
    dancers,
    news,
    user,
    lessons,
    timetable,
    lessonTimes,
    payments,
    alerts,
    records,
    plates
});

export default rootReducer;
