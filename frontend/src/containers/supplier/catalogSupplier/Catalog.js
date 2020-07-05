import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from "../../../redux/actions";
import SupplierLayout from "../SupplierLayout";
import SupplierCatListView from "../../../components/list/SupplierCatListView";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const signUpSState = {
    form: {
        name: {
            value: "",
            type: "name",
            name: "Product name"
        },

        tags: {
            value: "",
            type: "tags",
            name: "Product tags"
        },
        size: {
            value: "",
            type: "size",
            name: "Size"
        },


        price: {
            value: "",
            type: "price"
        }

    },
    errors: {
        name: 'Product name is required',
        price: 'Product price is required',
        size: 'Product size is required',
        tags: 'Product tag is required'

    }

};

class Catalog extends Component {

    state = {
        catalog: [],
        errors: {},
        showModal: false,
        index: -1,
        currentItem: {
            tags: "",
            name: "",
            price: "",
            size: "",
            description: ""
        },
        option: "add",
        basket: []
    }


    componentDidMount() {
        console.log("I mounted ");
        if (this.props.items.length <= 0) {
            console.log("empty")
        }

        this.props.fetchCatalog({
            token: this.props.token
        });


   }


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("I updated")
        if (this.props.items.length > 0) {
            console.log("Not empty:" + this.props.items[0].name)
        }
        if(prevProps.items !== this.props.items){
            this.setState({
                catalog: this.props.items
            })
        }


    }
    showModalHandler = (i) => {
        console.debug(i)
        let currentItem =  {
            tags: "",
                name: "",
                price: "",
                size: "",
            description: ""
        }
        let errors = {}
        let option = ""
        let index = -1;
        if (!this.state.showModal && i >= 0) {
            index = i;
            currentItem = this.state.catalog[i];
             option = "modify";
        }
        else if(!this.state.showModal && i < 0) {
            errors = {
                name: 'Product name is required',
                price: 'Product price is required',
                size: 'Product size is required',
                tags: 'Product tag is required' ,
                description:  'Product description is required' ,

            }
            option = "add"
        }



        const modal = !this.state.showModal;
         this.setState({
                ...this.state,
                showModal: modal,
                index: index,
                currentItem: currentItem,
             errors: errors,
             option: option
            })


 }

    /*addHardItem = () => {
        const payload = {
            token: this.props.token,
            data: {
                name: "Rice cake",
                price: "5",
                size: "1kg",
                description: "Made out of rice",
                tags: "Food"
            }
        };
        this.props.addItem(payload);

    }; */
    validateForm = (errors) => {
        let valid = true;
        console.log(this.state.errors);
        Object.values(errors).forEach(

            // if we have an error string set valid to false
            (val) =>  console.log(val)
        );
        Object.values(errors).forEach(

            // if we have an error string set valid to false
            (val) =>  val.length > 0 && (valid = false)
        );
        return valid;
    }

    validationHandler = (elementType, value) => {
        let errors = this.state.errors;
        console.log(value);
        console.log(elementType);
        switch (elementType) {
            case 'name':
                errors.name =
                    value.length < 2
                        ? 'Product name must be 2 characters long!'
                        : '';
                break;

            case 'size':
                errors.size =
                    value.length < 2
                        ? 'Product size must be 2 characters long!'
                        : '';
                break;

            case 'price':
                errors.price =
                    value.length < 1
                        ? 'Product price is required!'
                        : '';
                break;
            case 'tags':
                errors.tags =
                    value === "Food" || value === "Drink"
                        ? ''
                        : 'Product tags must either be "Food" or "Drink"';
                break;
            case 'description':
                errors.description =
                    value.length < 10
                        ? 'Product description must be at least 10 characters long'
                        : '';
                break;
            default:
                break;
        }
        console.log(errors);
        this.setState({
            ...this.state,
            errors: errors
        })
    }


    onChange = (e, i) => {
        e.preventDefault();
        const property = e.target.name;
        const value = e.target.value;
        console.log(Object.keys(this.state.errors).length)
        const index = i;
        this.validationHandler(property,value);
        const item = {
            ...this.state.currentItem
        };
        item[property] = value;
        this.setState({
            ...this.state,
            currentItem: item
        })

    }

    modifyItemHandler = (e) => {
        e.preventDefault();
        if(this.validateForm(this.state.errors)){
            const modifiedItem = this.state.currentItem;
            this.props.modifyItem({
                token: this.props.token,
                data: modifiedItem
            })
            this.showModalHandler(-1);
        }
        else {
            Object.values(this.state.errors).forEach((er) => alert(er))

        }
    }
    addItemHandler = (e) => {
        e.preventDefault();
        if(this.validateForm(this.state.errors)){
            const itemToAdd = this.state.currentItem;
            this.props.addItem({
                token: this.props.token,
                data: itemToAdd
            })
            this.showModalHandler(-1);
        }
        else {
            Object.values(this.state.errors).forEach((er) => er.length > 0 ? alert(er) : null)

        }
    }

    /*addItemToBasketHandler = (event, itemId) => {
        event.preventDefault();
        const catalog = [...this.state.catalog];
        let item = catalog.find(catItem => catItem._id === itemId );
        console.log(item);
        const basket = [...this.state.basket];
        let incrementItem = basket.find(element => item._id === element._id)
        if (incrementItem) {
            console.log("Duplicate, increment amount!")
            const index = basket.findIndex(element => element === incrementItem)
            const amount = incrementItem.amount + 1;
            incrementItem = {
                ...incrementItem,
                amount: amount
            }
            basket[index] = incrementItem

        }
        else {
            console.log("New item");
            item = {
                ...item,
                amount: 1
            }
            basket.push(item)
        }
        this.setState({
            ...this.state,
            basket: basket
        })



    } */







    ;

    render() {
        const catArray = this.state.catalog.map((item, index) =>
            (
            <SupplierCatListView  index={index} showModal={this.state.showModal} modal={this.showModalHandler} deleteHanlder={(event) => this.props.deleteItem({token: this.props.token, itemId: event.target.value})} item={item}></SupplierCatListView>

        ));
        return (
            <SupplierLayout>
                <div>
                    <button onClick={() => this.showModalHandler(-1)} >Add item</button>
                        {catArray}
                    <Modal show={this.state.showModal} onHide={this.showModalHandler}  >


                        <Modal.Body>


                            <div className="form-group">
                            <label>Name </label>
                            <input value={this.state.currentItem['name']} name="name"  onChange={(e) => this.onChange(e, this.state.index)}/>
                            </div>

                            <div className="form-group">
                                <label>Tag</label>
                                <select className="form-control" defaultValue="-" name="tags" onChange={(e) => this.onChange(e, this.state.index)}>
                                    <option value="-">-</option>
                                    {this.props.userOffer === "both"
                                        ? <> <option value="Food">Food</option>
                                        <option value="Drink">Drink</option> </>
                                        : null
                                    }{this.props.userOffer === "food"
                                        ? <option value="Food">Food</option>

                                        : null
                                    }{this.props.userOffer === "drinks"
                                        ? <option value="Drink">Drink</option>

                                        : null
                                    }
                                </select>
                            </div>


                            <div className="form-group">
                            <label>Size</label>
                            <input value={this.state.currentItem['size']} name="size"  onChange={(e) => this.onChange(e, this.state.index)}/>
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input value={this.state.currentItem['price']} name="price"  onChange={(e) => this.onChange(e, this.state.index)}/>
                            </div>

                            <div className="form-group">
                                <label>Description</label>


                                <textarea value={this.state.currentItem['description']} onChange={(e) => this.onChange(e, this.state.index)} className="form-control" rows="3" maxLength="100" name="description"/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.showModalHandler}>
                                Close
                            </Button>
                            {this.state.option === "modify"
                                ? <Button variant="primary" onClick={(e) => this.modifyItemHandler(e)}>
                                    Modify Item
                                </Button>

                                : <Button variant="primary" onClick={(e) => this.addItemHandler(e)}>
                                    Add Item
                                </Button>


                            }

                        </Modal.Footer>

                    </Modal>

                </div>
            </SupplierLayout>
        );
    }
}


const mapsStateToProps = (state) => {
    return {
        token: state.auth.token,
        items: state.cat.items,
        userOffer: state.user.user.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCatalog: (payload) => dispatch(actions.fetchCatalog(payload)),
        addItem: (payload) => dispatch(actions.addItemCatalog(payload)),
        deleteItem: (payload) => dispatch(actions.deleteItemCatalog(payload)),
        modifyItem: (payload) => dispatch(actions.modifyItemCatalog(payload))

    }
};

export default connect(mapsStateToProps, mapDispatchToProps)(Catalog);