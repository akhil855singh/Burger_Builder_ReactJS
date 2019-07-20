import React, {Component} from "react"
import Aux from "../../hoc/Aux"
import classes from "./BurgerBuilder.css"

class BurgerBuilder extends Component{

    render(){
        return(
           <Aux>
            <div className={classes.Content}>
            Burger
            </div>
            <div className={classes.Content}>
            Build Controls
            </div>
           </Aux> 
        )
    }
}

export default BurgerBuilder