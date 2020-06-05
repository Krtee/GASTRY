import React, { Component } from "react";
import Input from "../../components/auth/input";
//import axios from '../../axios/axios';
import {connect} from "react-redux";
import * as actions  from '../../redux/actions/index'
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const signInState = {
    form: {
        email: {
            name: "E-Mail",
            value: "",
            type: "email"
        },
        password: {
            name: "Password",
            value: "",
            type: "password"
        }

    },
    errors: {}

};


 class Login extends Component {
    state = signInState;

    componentDidMount() {
        if (this.props.token !== null) {
            this.props.history.push("/home");
        }
    }

     componentDidUpdate(prevProps, prevState, snapshot) {

         if (this.props.token !== null) {
             this.props.history.push("/home");
         }
     }


     onSubmit = (event) => {
        event.preventDefault();
        const loginData = {
            email: this.state.form.email.value,
            password: this.state.form.password.value
        }
        this.props.login(loginData);

    };

    onChange = (event) => {
            const value = {
                ...this.state.form,
                [event.target.type]: {
                    ...this.state.form[event.target.type],
                    value: event.target.value

                }
            };

            this.setState({form: value});
    };


    render() {
        const formArray = [];
        for (let key in this.state.form) {
            formArray.push({
                type: this.state.form[key].type,
                name: this.state.form[key].name
            })
        }

        const signInForm = formArray.map(element => (
            <Input type={element.type}
                   key={element.type}
                   name={element.name}
                   change={(e) => this.onChange(e)}
            />
        ));
        return (
            <div>
                <h3>Login Page</h3>
                <ToggleButtonGroup type="radio" name="registerToggle" onChange={this.optionHandler}>
                    <ToggleButton value="customer">Customer</ToggleButton>
                    <ToggleButton value="supplier">Supplier</ToggleButton>
                </ToggleButtonGroup>
                <form onSubmit={this.onSubmit}>

                    {signInForm}
                    <button>Submit</button>

                </form>

            </div>

        );
    }
}

const mapsStateToProps =(state) => {
     return{
         token:state.auth.token
     }
}

const mapDispatchToProps = (dispatch) => {
     return{
         login:(data) => dispatch(actions.login(data))
     }
};

export default connect(mapsStateToProps,mapDispatchToProps)(Login);
