import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserLayout from "../common/UserLayout";
import * as actions from "../../redux/actions";

class Catalog extends Component {


    componentDidMount() {
        console.log("I mounted ");
        if (this.props.items.length <= 0){
            console.log("empty")
        }
        this.props.fetchCat();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("I updated")
        if (this.props.items.length > 0 ){
            console.log("Not empty")
        }
    }

    render() {
        return (
            <UserLayout>
            <div>
            <p>Being rendered</p>
            </div>
            </UserLayout>
        );
    }
}


const mapsStateToProps =(state) => {
    return{
        token:state.auth.token,
        items: state.cat.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
            fetchCat: () => dispatch(actions.fetchCatalog(null))

    }
};

export default connect(mapsStateToProps,mapDispatchToProps)(Catalog);
