import React from "react"
import classes from "./Toolbar.css"
import Logo from "../../../components/Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import DrawerToggle from "../Toolbar/DrawerToggle/DrawerToggle"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
    <DrawerToggle toggleDrawer={props.toggleSideDrawer}/>
    <div className={classes.Logo}>
    <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems />
    </nav>
    </header>
)

export default toolbar