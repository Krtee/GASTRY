import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSuppliersList } from "../../../redux/actions";
import UserLayout from "../../customer/CustomerLayout";
import Supplier from "../../../components/list/Supplier";
import Search from "../../../components/search/Search";

import "./SuppliersList.css";
import CustomerLaylout from "../CustomerLayout";
import Container from "react-bootstrap/Container";
import {Pagination} from "react-bootstrap";
import gastry from "../../../assets/icons/logo.svg"

class SuppliersList extends Component {
    state = {
        active: 1,
        pages: [],
        filteredList: [],
        paginationList: [],
        searchInputValue: "",
    };

    componentDidMount() {
        const category = this.props.location.state.category;
        const payload = {
            data: {
                category: category
            }
        };
        console.log(payload);
        console.log("called");
        this.props.fetchSuppliersList(payload);
        console.log("hoi")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*if(((prevProps.list !== this.props.list) && (this.props.list.length > 0)) ||  ( this.state.active !== prevState.active)) {
            this.renderPagination()
            this.spliceSupplierList(1);
        } */
    }


    handleInputChange = (searchInputValue) => {
        this.setState({ searchInputValue });
        this.handleSearch(searchInputValue);
    };

    handleSearch = (searchInputValue) => {
        if (searchInputValue.length > 0) {
            const filteredList = this.props.list.filter((row) => {
                const nameToLowerCase = row.name.toLowerCase();
                const filter = searchInputValue.toLowerCase();
                return nameToLowerCase.includes(filter);
            });
            this.setState({ filteredList });
        }
    };

    spliceSupplierList = (number) => {
        /*switch (number) {
            case 1: slicedArray = this.props.list.slice(0,5); break;
            default: slicedArray = this.props.list.slice(number * 5 - 5)
        } */
        const beginnerIndex = number * 4 - 4;
        const endIndex = number * 4 ;
        console.log(beginnerIndex)
        console.log(endIndex)
        let slicedArray = this.props.list.slice(beginnerIndex, endIndex)
        console.log(slicedArray)
        return slicedArray.map((supplier) => {
            return (
                <Link
                    key={supplier._id}
                    to={{
                        pathname: `/catalog/${supplier.name}`,
                        state: {
                            supplierId: supplier._id,
                            supplierName: supplier.name,
                        },
                    }}
                >
                    <Supplier
                        key={supplier._id}
                        name={supplier.name}
                        address={supplier.address.street}
                    />
                </Link>
            );
        });

    }

    /*changePageHandler = (number) => {
        console.log(this.state.active)
        const paginationItems = [...this.state.pages];
        const active = this.state.active;
        const deactivatedItem = <Pagination.Item active={active === this.state.active}> <span onClick={() => this.changePageHandler(active)}> {active + 1}</span></Pagination.Item>
        const activatedItem = <Pagination.Item active={number === this.state.active}> <span onClick={() => this.changePageHandler(number)}> {number + 1}</span></Pagination.Item>
        paginationItems[active] = deactivatedItem;
        paginationItems[number] = activatedItem;
        console.log(number);

        this.setState({
            ...this.state,
            active: number,
            pages: paginationItems
        });
    }; */

    changeActive = (x) => {
        const active = x;
        this.setState({
            ...this.state,
            active: active
        });
    }



    getPages = () => {
        let itemNumbers = 0;
        let page = 1;
        const paginationItems = [];

        for (let x = 0  ; x <= this.props.list.length; x++ ) {
            console.log("for loop")
            if(itemNumbers === 4) {
                console.log("hi new page")
                itemNumbers = 0;
                const p = page
                paginationItems.push(<Pagination.Item onClick={() => this.changeActive(p)} active={this.state.active === p}> {p}</Pagination.Item>)
                page += 1;
            }
            else if (x === this.props.list.length ) {
                console.log("last new page")
                const p = page
                paginationItems.push(<Pagination.Item onClick={() => this.changeActive(p)} active={this.state.active === p}> {p}</Pagination.Item>)
                page += 1;


            }
            else {
                console.log("no new page")
                itemNumbers++
            }

        }
        console.log("HOi pagination")
        return paginationItems;
    }

    renderSuppliers = () => {
        console.log("renderiiing")
        const { list } = this.props;
        const { searchInputValue, filteredList } = this.state;
        const renderedList = searchInputValue.length > 0 ? filteredList : list;

        if (!list) return <div>Loading</div>;

        return renderedList.map((supplier) => {
            return (
                <Link
                    key={supplier._id}
                    to={{
                        pathname: `/catalog/${supplier.name}`,
                        state: {
                            supplierId: supplier._id,
                            supplierName: supplier.name,
                        },
                    }}
                >
                    <Supplier
                        pic={gastry}
                        key={supplier._id}
                        name={supplier.name}
                        address={supplier.address.street}
                    />
                </Link>
            );
        });
    };

    render() {
        return (
            <UserLayout
                className="container-fluid"
                title="Suppliers"
                description="Bei wem möchtest du bestellen?"
                location={"home"}
                showBack={true}
            >

                <Container fluid>
                    <Search
                        onChange={this.handleInputChange}
                        value={this.state.searchInputValue}
                    />
                    {this.props.list ? this.spliceSupplierList(this.state.active) : null}
                </Container>
                <Pagination> {this.props.list ? this.getPages() : null}</Pagination>

            </UserLayout>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        list: state.suppliersList.list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSuppliersList: (payload) => dispatch(fetchSuppliersList(payload)),
    };
};

export default connect(mapsStateToProps, mapDispatchToProps)(SuppliersList);
