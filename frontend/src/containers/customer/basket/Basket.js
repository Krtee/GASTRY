import React, { Component} from 'react';
import * as actions from "../../../redux/actions";
import {connect} from 'react-redux'
import './Basket.css'
import Container from "react-bootstrap/Container";
import {Summary} from '../../../components/basket/Summary'
import EstimatedTotal from "../../../components/basket/EstimatedTotal";
import CustomerLayout from "../../customer/CustomerLayout";
import Button from "../../../components/button/Button";

export class Basket extends Component {
    state={
        basket: [],
        total: 0
    }
    componentDidMount() {
        console.log(this.props.location)
        const basket = this.props.location.state.basket;

        let total = 0;
        for(let element of basket){
            total += (element.price * element.amount)

        }
        this.setState({
            ...this.state,
            basket:basket,
            total: total
        });
        console.log(basket)


    }

    placeOrder = (event) => {
        event.preventDefault()
        let payload = {
            token: this.props.token,
            data: {
                products: this.state.basket,
                supplierId: this.props.location.state.supplierId,
                total: this.state.total
            },
        }
        this.props.placeOrder(payload)
        console.log(this.state.basket)
    }

    render() {
        const basketItems = this.state.basket.map(element => {
            return (
                <Summary key={element._id} item={element}/>

            )
        }


        )
        return(
            <CustomerLayout title="Basket"
                            location={"home"}
                            showBack={true}
                            description={"Mein Warenkorb"}
            >
                <Container >
                    {basketItems}
                    <EstimatedTotal total={this.state.total}/>
                    {
                        this.state.total > 0 ? <Button className={"submit-btn"}onClick={this.placeOrder} label={"Bestellung abschließen"}/> : <p>Consider adding some items to your basket first</p>
                    }
                </Container>
            </CustomerLayout>



        )
    }

}
const mapsStateToProps = (state) => {
    return {
        token: state.auth.token
};
};

const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: (data) => dispatch(actions.placeOrder(data))
    };
};

export default connect(mapsStateToProps,mapDispatchToProps)(Basket);
