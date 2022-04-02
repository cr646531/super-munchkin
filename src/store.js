// import packages
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
    doors: [],
    treasures: [],
    active: null,
    error: '',
    updatedCard: null,
};

const reducer = (state = initialState, action) => {
    let deckCopy = null;
    let topCard = null;
    let handCopy = null;

    switch (action.type) {
        case 'GET_HAND':
            return Object.assign({}, state, { hand: action.payload });
        case 'LOOT_THE_ROOM':
            return Object.assign({}, state, { player: action.payload });
        case 'UPDATE_PLAYER':
            return Object.assign({}, state, { player: action.payload });
        case 'UPDATE_CARD':
            return Object.assign({}, state, { updatedCard: action.payload });
        case 'INIT':
            return Object.assign({}, state, action.payload);
        case 'GET_PLAYERS':
            return Object.assign({}, state, { players: action.payload });
        case 'GET_DOORS':
            return Object.assign({}, state, { doors: action.payload });
        case 'GET_TREASURES':
            return Object.assign({}, state, { treasures: action.payload });
        case 'KICK_OPEN_DOOR':
            return Object.assign({}, state, { active: action.payload });
        case 'GET_ACTIVE_CARD':
            return Object.assign({}, state, { active: action.payload });
        case 'PLAYER_EQUIP':
            return Object.assign({}, state, { player: action.payload });

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
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, logger)));

// actions

export const getHand = ({ player }) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/data/hand',
            data: { player },
        })
            .then((res) => res.data)
            .then((hand) => dispatch({ type: 'GET_HAND', payload: hand }));
    };
};

export const playerEquip = ({ card, player }) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/players/equip',
            data: { card, player },
        })
            .then((res) => res.data)
            .then((player) => dispatch({ type: 'PLAYER_EQUIP', payload: player }));
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

export const updateCard = (card) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/cards/update',
            data: { card },
        })
            .then((res) => res.data)
            .then((card) => dispatch({ type: 'UPDATE_CARD', payload: card }));
    };
};

export const updatePlayer = (player) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/players/update',
            data: { player },
        })
            .then((res) => res.data)
            .then((player) => dispatch({ type: 'UPDATE_PLAYER', payload: player }));
    };
};

export const init = () => {
    return (dispatch) => {
        return axios
            .get('/data/init')
            .then((res) => res.data)
            .then((data) => dispatch({ type: 'INIT', payload: data }));
    };
};

export const kickOpenDoor = () => {
    return (dispatch) => {
        return axios
            .get('/phase/kick')
            .then((res) => res.data)
            .then((card) => dispatch({ type: 'KICK_OPEN_DOOR', payload: card }));
    };
};

export const drawTreasure = () => {
    return (dispatch) => {
        dispatch({ type: 'DRAW_TREASURE' });
    };
};

export const getActiveCard = () => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: '/cards',
            data: { type: 'door', status: 'active' },
        })
            .then((res) => res.data)
            .then((activeCard) => dispatch({ type: 'GET_ACTIVE_CARD', payload: activeCard }));
    };
};

/*
    </3
*/
export const drawDoor = () => {
    return (dispatch) => {
        dispatch({ type: 'DRAW_DOOR' });
    };
};

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
