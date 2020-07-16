import {
    PLACE_ORDER_START,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAILED,
} from "../../actionTypes";
import { axiosInstance as axios } from "../../../axiosInstance";

export const placeOrder = (payload) => async (dispatch) => {
    dispatch(placeOrderStart);
    console.log("yeah")

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': payload.token
        }
        const response = await axios.post("/customer/home/addOrder",payload.data,{headers: headers})
            .then((response)=>{
                dispatch(placeOrderSuccess(response.data.data));
            })
            .catch((error) =>{
                dispatch(placeOrderFailed(error));
            });
    } catch (err) {
        dispatch(placeOrderFailed(err));
    }
};

const placeOrderStart = () => {
    return {
        type: PLACE_ORDER_START,
        payload: {
            loading: true,
        },
    };
};

const placeOrderSuccess = () => {
    return {
        type: PLACE_ORDER_SUCCESS,
        payload: {
            loading: false,
        },
    };
};

const placeOrderFailed = (error) => {
    return {
        type: PLACE_ORDER_FAILED,
        payload: {
            loading: false,
            error: error
        }
    };
};
