import React, {Component} from "react"
import Aux from "../../hoc/Aux"
import classes from "./BurgerBuilder.css"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axiosInstance from "../../Helper/axios-helper"
import axios from "axios"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler"

const ingrediantPrices = {
    salad:0.5,
    cheese:0.3,
    meat:1.2,
    bacon:1.0  
}

class BurgerBuilder extends Component{

    constructor(props){
        super(props)
        this.state = {
            ingrediants: null,
            totalPrice:2,
            purchasable:false,
            purchasing:false,
            loading:false
        }
    }

    updatePurchasableState(ingrediants){
        const sum = Object.keys(ingrediants).map((ingrediantKey) => {
            return ingrediants[ingrediantKey]
        }).reduce((sum,ingrediant) => {
            return sum + ingrediant
        }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseCancelHandler = () => {
        console.log("purchaseCancelHandler called")
        this.setState({
            purchasing:false
        })
    }

    componentDidMount(){
        axios.get("https://react-burger-app-8842e.firebaseio.com/ingrediants.json").then(response => {
        console.log("response",response)
        this.setState({
            ingrediants:response.data
        })
    })
    }

    purchaseContinueHandler = () => {
        console.log("purchaseContinueHandler called")
        let orders = {
            ingrediants: this.state.ingrediants,
            price: this.state.totalPrice,
            User: {
                name:"Akhil",
                country: "India"
            }
        }

        this.setState({
            loading:true
        })

        axiosInstance.post("/orders.json",orders).then((response) => {
            console.log("orders api response", response)
            this.setState({
                loading:false,
                purchasing:false,
                ingrediants: {
                    salad:0,
                    cheese:0,
                    meat:0,
                    bacon:0
                },
                totalPrice:2
            })
        }).catch((error) => {
            console.log("orders api error",error)
            this.setState({
                loading:false,
                purchasing:false
            })
        })
    }

    orderButtonClickedHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    addIngrediantsHandler = (type) => {
        console.log("ingrediantType",type)
        const olderPrice = this.state.totalPrice
        const updatedIngrediantQuantity = this.state.ingrediants[type] + 1
        console.log("updatedIngrediantQuantity and olderIngrediantValue",updatedIngrediantQuantity, this.state.ingrediants[type])
        const ingrediantsNeedToBeUpdated = {...this.state.ingrediants}
        console.log("ingrediantsNeedToBeUpdated before",ingrediantsNeedToBeUpdated)
        ingrediantsNeedToBeUpdated[type] = updatedIngrediantQuantity
        console.log("ingrediantsNeedToBeUpdated after",ingrediantsNeedToBeUpdated)
        const updatedPrice = olderPrice + ingrediantPrices[type]
        console.log("updatedPrice",updatedPrice)
        this.setState({
            ingrediants:ingrediantsNeedToBeUpdated,
            totalPrice:updatedPrice
        }) 
        this.updatePurchasableState(ingrediantsNeedToBeUpdated)
    }

    removeIngrediantsHandler = (type) => {
        if (this.state.ingrediants[type] > 0){
        console.log("ingrediantType",type)
        const olderPrice = this.state.totalPrice
        const updatedIngrediantQuantity = this.state.ingrediants[type] - 1
        console.log("updatedIngrediantQuantity and olderIngrediantValue",updatedIngrediantQuantity, this.state.ingrediants[type])
        const ingrediantsNeedToBeUpdated = {...this.state.ingrediants}
        console.log("ingrediantsNeedToBeUpdated before",ingrediantsNeedToBeUpdated)
        ingrediantsNeedToBeUpdated[type] = updatedIngrediantQuantity
        console.log("ingrediantsNeedToBeUpdated after",ingrediantsNeedToBeUpdated)
        const updatedPrice = olderPrice - ingrediantPrices[type]
        console.log("updatedPrice",updatedPrice)
        this.setState({
            ingrediants:ingrediantsNeedToBeUpdated,
            totalPrice:updatedPrice
        }) 
        this.updatePurchasableState(ingrediantsNeedToBeUpdated)
        }
    }

    render(){
        const disabledInfo = {...this.state.ingrediants}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        console.log("disabledInfo=",disabledInfo)
        let orderSummary = <Spinner />
        if (this.state.loading == false && this.state.ingrediants){
            orderSummary = <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
            <OrderSummary 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            ingrediants={this.state.ingrediants}/>
            </Modal>
        }

        let ingrediantsForBurger = <p>Ingrediants are loading...</p>
        if (this.state.ingrediants){
            ingrediantsForBurger = <Aux>
            <Burger ingrediants={this.state.ingrediants}/>
            <BuildControls addIngrediants={this.addIngrediantsHandler} 
            removeIngrediants={this.removeIngrediantsHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.orderButtonClickedHandler}/>
            </Aux>
        }

        return(
           <Aux>
            {orderSummary}
            {ingrediantsForBurger} 
           </Aux> 
        )
    }
}

export default withErrorHandler(BurgerBuilder,axiosInstance)