import React from "react";

import {shallow} from 'enzyme';
import {findByTestAtrr, testStore} from "../../../../Utils";
import Input from "../../../components/auth/Input";
import OrderCustomer from "../../customer/home/HomeCustomer";
import UserLayout from "../../customer/CustomerLayout";



const setUp =(initialstore={})=>{
    const store = testStore(initialstore);
    const wrapper = shallow(<OrderCustomer store={store}/>);
    return wrapper
}

describe('<OrderCustomer/>', function () {

    let wrapper;
    beforeEach(() => {
        const initialState = {
            auth: [{
                token: null,
                loading: false,
                error: null
            }]
        }
        wrapper = setUp(initialState);
        console.log(wrapper.debug());

    });


    it('should render two input fields', function () {
        const component = wrapper.find(UserLayout);
        expect(component.length).toBe(1);
    });
});
