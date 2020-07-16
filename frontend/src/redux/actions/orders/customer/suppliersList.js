import {
    FETCH_SPPLIERS_LIST_START,
    FETCH_SPPLIERS_LIST_SUCCESS,
    FETCH_SPPLIERS_LIST_FAILED,
} from "../../actionTypes";
import { axiosInstance as axios } from "../../../axiosInstance";

export const fetchSuppliersList = (payload) => async (dispatch) => {
    dispatch(fetchSuppliersListStart);

    try {
        const category = payload.data.category;
        const response = await axios.get("/customer/suppliersList/" + category);
        dispatch(fetchSuppliersListSuccess(response.data.data));
    } catch (err) {
        dispatch(fetchSuppliersListFailed(err));
    }
};

const fetchSuppliersListStart = () => {
    return {
        type: FETCH_SPPLIERS_LIST_START,
        payload: {
            loading: true,
        },
    };
};

const fetchSuppliersListSuccess = (suppliersList) => {
    return {
        type: FETCH_SPPLIERS_LIST_SUCCESS,
        payload: {
            suppliersList: suppliersList,
            loading: false,
        },
    };
};

const fetchSuppliersListFailed = (error) => {
    return {
        type: FETCH_SPPLIERS_LIST_FAILED,
        error: error,
    };
};
