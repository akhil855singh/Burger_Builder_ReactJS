import React from "react"
import Aux from "../../../hoc/Aux"
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
    const ingrediants = Object.keys(props.ingrediants).map((ingrediantKey) => {
        return (<li key={ingrediantKey}><span style={{textTransform:"capitalize"}}>{ingrediantKey}</span> : {props.ingrediants[ingrediantKey]}</li>)
    })
    console.log("ingrediants in order summary",ingrediants)
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingrediants:</p>
            <ul>
            {ingrediants}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Checkout now?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary