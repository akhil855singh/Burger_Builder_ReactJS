import React from "react"
import classes from "./NavigationItems.css"
import NavigationItem from "../NavigationItem/NavigationItem"

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem itemName="Burger Builder"/>
        <NavigationItem itemName="Checkout"/>
    </ul>
)

export default navigationItems