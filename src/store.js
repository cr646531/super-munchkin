import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import think from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';
import { INITIAL_DOORS, INITIAL_TREASURES } from '@constants';

const initialState = {
    players: [],
    hand: [],
    equipment: [],
    doors: [],
    treasures: [],
    active: null,
    error: '',
    updatedCard: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // data
        case 'GET_DATA':
            return Object.assign({}, state, action.payload);
        case 'GET_DATA_HAND':
            return Object.assign({}, state, { hand: action.payload });
        case 'GET_DATA_EQUIPMENT':
            return Object.assign({}, state, { equipment: action.payload });

        // players
        case 'GET_PLAYERS':
            return Object.assign({}, state, { players: action.payload });
        case 'PLAYER_CARRY':
            return Object.assign({}, state, { player: action.payload });
        case 'PLAYER_UPDATE':
            return Object.assign({}, state, { player: action.payload });

        // cards
        case 'CARD_UPDATE':
            return Object.assign({}, state, { updatedCard: action.payload });

        // phase
        case 'KICK_OPEN_DOOR':
            return Object.assign({}, state, { active: action.payload.card, player: action.payload.player });
        case 'LOOT_THE_ROOM':
            return Object.assign({}, state, { player: action.payload });

        default:
            return state;
    }
};

// create store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, logger)));

/* ---------- DATA ---------- */

export const getData = () => {
    return (dispatch) => {
        return axios
            .get('/data')
            .then((res) => res.data)
            .then((data) => dispatch({ type: 'GET_DATA', payload: data }));
    };
};

export const getDataHand = ({ player }) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/data/hand',
            data: { player },
        })
            .then((res) => res.data)
            .then((hand) => dispatch({ type: 'GET_DATA_HAND', payload: hand }));
    };
};

export const getDataEquipment = ({ player }) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/data/equipment',
            data: { player },
        })
            .then((res) => res.data)
            .then((equipment) => dispatch({ type: 'GET_DATA_EQUIPMENT', payload: equipment }));
    };
};

/* ---------- PLAYERS ---------- */

export const getPlayers = () => {
    return (dispatch) => {
        return axios
            .get('/players')
            .then((res) => res.data)
            .then((players) => dispatch({ type: 'GET_PLAYERS', payload: players }));
    };
};

export const playerCarry = ({ card, player }) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/players/carry',
            data: { card, player },
        })
            .then((res) => res.data)
            .then((player) => dispatch({ type: 'PLAYER_CARRY', payload: player }));
    };
};

export const playerUpdate = (player) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/players/update',
            data: { player },
        })
            .then((res) => res.data)
            .then((player) => dispatch({ type: 'PLAYER_UPDATE', payload: player }));
    };
};

/* ---------- CARDS ---------- */

export const cardUpdate = (card) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/cards/update',
            data: { card },
        })
            .then((res) => res.data)
            .then((card) => dispatch({ type: 'CARD_UPDATE', payload: card }));
    };
};

/* ---------- PHASE ---------- */

export const kickOpenDoor = (player) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/phase/kick',
            data: { player },
        })
            .then((res) => res.data)
            .then((data) => dispatch({ type: 'KICK_OPEN_DOOR', payload: data }));
    };
};

export const lootTheRoom = () => {
    return (dispatch) => {
        return axios
            .get('/phase/loot')
            .then((res) => res.data)
            .then((player) => dispatch({ type: 'LOOT_THE_ROOM', payload: player }));
    };
};
