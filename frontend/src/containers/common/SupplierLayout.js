import React from 'react';
import '../../styles.css'
import Navigation from "../../components/navigation/Navigation";
import Topbar from "../../components/navigation/TopBar";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";

const SupplierLayout = ({
                            title = 'Title',
                            description = 'Description',
                            className,
                            children,
                            onClicklogout
                        }) => {

    const navbuttons = [
        {
            name: 'Home',
            link: '/home'
        },
        {
            name: 'Profile',
            link: '/profile'
        }

    ]
    return (
        <div>
            <Topbar onClick={onClicklogout}/>
            <Navigation pagelist={navbuttons}></Navigation>
            <div className='jumbotron'>
                <h2> {title} </h2>
                <p className='lead'> {description}</p>
            </div>
            <div className={className}> {children} </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClicklogout: () => dispatch(actions.logout())
    }
}


export default connect(null, mapDispatchToProps)(SupplierLayout);