// import packages
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import think from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

const initialState = {
    players: [],
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PLAYERS':
            console.log('action.payload: ', action.payload);
            return Object.assign({}, state, {
                players: action.payload,
            });
        default:
            return state;
    }
};

// create store
export default createStore(reducer, applyMiddleware(think, logger));

// action dispatch

const getPlayers = () => {
    return (dispatch) => {
        return axios
            .get('/data/players')
            .then((res) => res.data)
            .then((players) => dispatch({ type: 'GET_PLAYERS', payload: players }));
    };
};

export { getPlayers };
