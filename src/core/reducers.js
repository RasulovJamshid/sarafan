// import {combineReducers, createStore} from "redux";



const tokenReducer=(state="",action)=>{
    switch (action.type) {
        case "SET_TOKEN":
            return action.payload;
        default:
            return state;
    }
}

const likesReducer=(state=[],action)=>{
    switch (action.type) {
        case "SET_LIKED":
            return [...state,action.payload];
        default:
            return state;
    }
} 

export {tokenReducer,likesReducer};