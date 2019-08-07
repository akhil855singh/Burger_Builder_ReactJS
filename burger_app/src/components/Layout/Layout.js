import React from "react"
import Aux from "../../hoc/Aux"
import classes from "./Layout.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends React.Component{

    state = {
        showSideDrawer:false
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer:!prevState.showSideDrawer
            }
        })
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer:false
        })
    }

    render(){
        return(
            <Aux>
                <SideDrawer showDrawer={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawerHandler}/>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout