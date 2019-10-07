import React from "react"
import BuildControl from "../BuildControls/BuildControl/BuildControl"
import classes from "./BuildControls.css"

const controls = [
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"},
    {label:"Meat", type:"meat"}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Total Price = {props.price.toFixed(2)}</p>
    {controls.map((control) => (
        <BuildControl key={control.type} label={control.label} 
        added={() => props.ingrediantAdded(control.type)} 
        removed={() => props.ingrediantRemoved(control.type)}
        disabled={props.disabled[control.type]}/>
    ))}
    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>Order Now</button>
    </div>
)

export default buildControls