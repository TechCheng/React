import * as types from '../action-types';
export default function (state= {count: 0},action){
    switch(action.type){
        case types.ADD2:
            return state.count + 1;
        case types.MINUS2:
            return state.count - 1;
        default:
            return state;
    }
}