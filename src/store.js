// import packages
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import think from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';
import { INITIAL_DOORS, INITIAL_TREASURES } from '@constants';

const initialState = {
    players: [],
    hand: [],
    doors: [],
    treasures: [],
    active: null,
    error: false,
};

const reducer = (state = initialState, action) => {
    let deckCopy = null;
    let topCard = null;
    let handCopy = null;

    switch (action.type) {
        case 'GET_PLAYERS':
            return Object.assign({}, state, { players: action.payload });
        case 'GET_DOORS':
            return Object.assign({}, state, { doors: action.payload });
        case 'GET_TREASURES':
            return Object.assign({}, state, { treasures: action.payload });
        case 'KICK_OPEN_DOOR':
            return Object.assign({}, state, { active: action.payload });

        case 'DRAW_DOOR':
            deckCopy = [...state.doors];
            topCard = deckCopy.pop();
            handCopy = [...state.hand];
            handCopy.push(topCard);
            topCard = null;

            return Object.assign({}, state, {
                hand: handCopy,
                doors: deckCopy,
            });

        case 'DRAW_TREASURE':
            deckCopy = [...state.treasures];
            topCard = deckCopy.pop();
            handCopy = [...state.hand];
            handCopy.push(topCard);
            topCard = null;

            return Object.assign({}, state, {
                hand: handCopy,
                treasures: deckCopy,
            });

        default:
            return state;
    }
};

// create store
export default createStore(reducer, applyMiddleware(think, logger));

// action dispatch

export const getPlayers = () => {
    return (dispatch) => {
        return axios
            .get('/data/players')
            .then((res) => res.data)
            .then((players) => dispatch({ type: 'GET_PLAYERS', payload: players }));
    };
};

export const getDoors = () => {
    return (dispatch) => {
        return axios
            .get('/data/doors')
            .then((res) => res.data)
            .then((doors) => dispatch({ type: 'GET_DOORS', payload: doors }));
    };
};

export const getTreasures = () => {
    return (dispatch) => {
        return axios
            .get('/data/treasures')
            .then((res) => res.data)
            .then((treasures) => dispatch({ type: 'GET_TREASURES', payload: treasures }));
    };
};

export const kickOpenDoor = () => {
    return (dispatch) => {
        return axios
            .get('/data/doors/kick')
            .then((res) => res.data)
            .then((card) => dispatch({ type: 'KICK_OPEN_DOOR', payload: card }));
    };
};

export const drawDoor = () => {
    return (dispatch) => {
        dispatch({ type: 'DRAW_DOOR' });
    };
};

export const drawTreasure = () => {
    return (dispatch) => {
        dispatch({ type: 'DRAW_TREASURE' });
    };
};
