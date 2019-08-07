import React from "react"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./SideDrawer.css"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Aux"

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer,classes.Close]
    if (props.showDrawer)
    {
        attachedClasses = [classes.SideDrawer,classes.Open]
    }
    console.log("show",props.showDrawer)

    return (
        <Aux>
        <Backdrop show={props.showDrawer} closeModal={props.closeSideDrawer}/>
        <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav>
        <NavigationItems />
        </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer