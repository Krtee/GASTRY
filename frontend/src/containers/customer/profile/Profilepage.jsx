import React, {Component} from "react";
import CustomerLayout from "../CustomerLayout";
import SupplierLayout from "../../supplier/supplierLayout/SupplierLayout";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import UserInfo from "../../../components/profile/UserInfo";
import UserInfoForm from "../../../components/profile/UserInfoForm";
import Container from "react-bootstrap/Container";
import {Fade} from "@material-ui/core";

class Profilepage extends Component {
    state = {
        form: {
            company: "",
            address: {
                street: "",
                city: "",
                state: "",
                code: ""
            },
        },
        canEdit: false,
    };

    userInfo = () => {
        const {user} = this.props.user;
        if (user) {
            return <UserInfo user={user} onEdit={this.onEdit} onLogout={this.props.onClicklogout}/>;
        }
    };

    userInfoForm = () => {
        return (
            <UserInfoForm
                onChange={this.onChange}
                onChangeAddress={this.onChangeAddress}
                onChangeOffer={this.getOffer}
                onSubmit={this.onSubmit}
                form={this.state.form}
            />
        );
    };

    onChange = (e) => {
        const form = {
            ...this.state.form,
            [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
        };

        this.setState({form: form});
    };


    onChangeAddress = (e) => {
        const form = {
            ...this.state.form,
            address: {
                ...this.state.form.address,
                [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            },
        };

        this.setState({form: form});
    };

    getOffer = (event) => {
        event.preventDefault();
        let tag;

        const value = event.target.value
        switch (value) {
            case "food":
                tag = "food"
                break;
            case "drinks":
                tag = "drinks";
                break;
            case "both":
                tag = "both";
                break;
        }
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                category: tag
            }
        })
    };

    onEdit = () => {
        this.props.fetchUser(this.props.userId, this.props.user.user.userType);
        const {user} = this.props.user;
        let form;
        if (user.userType === "Supplier") {
            form = {
                ...this.state.form,
                company: user.company,
                category: user.category,
                address: {
                    ...this.state.form.address,
                    street: user.address.street,
                    city: user.address.city,
                    state: user.address.state,
                    code: user.address.code,
                },
            };
        } else {
            form = {
                ...this.state.form,
                company: user.company,
                address: {
                    ...this.state.form.address,
                    street: user.address.street,
                    city: user.address.city,
                    state: user.address.state,
                    code: user.address.code,
                },
            };
        }

        this.setState({form: form, canEdit: true});
    };

    onSubmit = (e) => {
        e.preventDefault();
        try {
            let form = this.state.form;
            console.log(form)
            this.props.updateUser(this.props.userId, form);
            this.props.fetchUser(this.props.userId, this.props.user.user.userType);
            this.setState({canEdit: false});
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount = () => {
        this.props.fetchUser(this.props.userId, this.props.user.user.userType);
    };

    render() {
        if (!this.props.user.user) return <div>bye</div>
        return this.props.user.user.userType === "Customer" ?
            <CustomerLayout
                className="container-fluid"
                title={"Profile"}
                description="Update Profile"
                location={"profile"}
            >
                <Fade in={true}>
                    <Container>
                        {this.state.canEdit ? this.userInfoForm() : this.userInfo()}
                    </Container>
                </Fade>
            </CustomerLayout>
            :
            <SupplierLayout
                className="container-fluid"
                title={"Profile"}
                description="Update Profile"
                location={"profile"}
            >
                <Container>
                    {this.state.canEdit ? this.userInfoForm() : this.userInfo()}
                </Container>
            </SupplierLayout>

    }
}

const mapsStateToProps = (state) => {
    return {
        user: state.user,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (_id, type) => dispatch(actions.fetchUser(_id, type)),
        updateUser: (_id, formValues) => dispatch(actions.updateUser(_id, formValues)),
        onClicklogout: () => dispatch(actions.logout())
    };
};

export default connect(mapsStateToProps, mapDispatchToProps)(Profilepage);
