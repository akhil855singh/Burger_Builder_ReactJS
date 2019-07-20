import React from "react"
import Aux from "../../hoc/Aux"
import classes from "./Layout.css"

class Layout extends React.Component{

    render(){
        return(
            <Aux>
                <div className={classes.Content}>
                ToolBar, Navbar
                </div>
                <main className={classes.Content}>
                {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout