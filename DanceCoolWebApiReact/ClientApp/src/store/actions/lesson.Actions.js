import * as actionTypes from '../actionTypes/actionTypes.index';
import axios from 'axios';

export const GetLessonsByMonthForGroupStart = () => {
    return {
        type: actionTypes.GET_LESSONS_FOR_GROUP_BY_MONTH_START
    }
};

export const GetLessonsByMonthForGroupFailed = () => {
    return {
        type: actionTypes.GET_LESSONS_FOR_GROUP_BY_MONTH_FAILED
    }
};