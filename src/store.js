// import packages
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import think from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';
import { INITIAL_DOORS, INITIAL_TREASURES } from '@constants';

const initialState = {
    players: [],
    hand: [],
    doors: INITIAL_DOORS,
    treasures: INITIAL_TREASURES,
    error: false,
};

const reducer = (state = initialState, action) => {
    let deckCopy = null;
    let topCard = null;
    let handCopy = null;

    switch (action.type) {
        case 'GET_PLAYERS':
            return Object.assign({}, state, {
                players: action.payload,
            });

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
