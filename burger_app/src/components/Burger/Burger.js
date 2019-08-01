import React from "react"
import classes from "./Burger.css"
import BurgerIngrediant from "./BurgerIngrediant/BurgerIngrediant"

const burger = (props) => {
    let transformedIngrediants = Object.keys(props.ingrediants).map((key) => {
        return [...Array(props.ingrediants[key])].map((_,i) => {
                return <BurgerIngrediant key = {key + i} type = {key} />
        })
    }).reduce((arr, element) => {
        return arr.concat(element)
    },[])

    console.log("transformedIngrediants=",transformedIngrediants)

    if (transformedIngrediants.length == 0){
        transformedIngrediants = <p>Please add ingrediants</p>
    }

    return (
        <div className={classes.Burger}>
        <BurgerIngrediant type="bread-top" />
        {transformedIngrediants}
        <BurgerIngrediant type="bread-bottom" />
        </div>
    )
}

export default burger