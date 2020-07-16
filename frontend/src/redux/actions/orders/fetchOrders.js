import {
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILED,
} from "../actionTypes";
import { axiosInstance as axios } from "../../axiosInstance";

export const fetchOrders = (payload) => async (dispatch) => {
    dispatch(fetchOrdersStart);

    const token = payload.token;
    console.log(token);
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get("/user/home/",config);
        dispatch(fetchOrdersSuccess(response.data.data));
    } catch (err) {
        dispatch(fetchOrdersFailed(err));
    }
};

const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START,
        payload: {
            loading: true,
        },
    };
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

const fetchOrdersFailed = (error) => {
    return {
        type: FETCH_ORDERS_FAILED,
        error: error,
    };
};
