import React from "react"
import Aux from "../hoc/Aux"
import Modal from "../components/UI/Modal/Modal"

let requestInterceptor = null
let responseInterceptor = null

const withErrorHandler = (WrapperComponent, axios) => {
    return class errorHandler extends React.Component{

        constructor(props){
            super(props)
            this.state = {
                error:null
            }

         requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error:null
                })
            })

        responseInterceptor = axios.interceptors.response.use(null, error => {
                this.setState({
                    error:error
                })
            })
        }

        errorConfirmedHandler = () => {
            this.setState({
                error:null
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }

        render () {
            return (
                <Aux>
                <Modal 
                show={this.state.error}
                closeModal={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler