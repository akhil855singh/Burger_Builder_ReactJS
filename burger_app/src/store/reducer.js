import * as actionTypes from "./actions"
import { stat } from "fs"

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingrediants: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    console.log("in reducer action",action.ingrediantName)
    console.log("ingrediants",state.ingrediants)
    switch(action.type){
        case actionTypes.ADD_INGREDIANT:
            return {
                ...state,
                ingrediants:{
                    ...state.ingrediants,
                    [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingrediantName]
            }
        case actionTypes.REMOVE_INGREDIANT:
            return {
                ...state,
                ingrediants:{
                    ...state.ingrediants,
                    [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingrediantName]
            }
        default:
            return state
    }
}

export default reducer