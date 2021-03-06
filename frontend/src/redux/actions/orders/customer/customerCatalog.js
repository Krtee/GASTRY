import {
    FETCH_SUPPLIER_CATALOG_START,
    FETCH_SUPPLIER_CATALOG_SUCCESS,
    FETCH_SUPPLIER_CATALOG_FAILED, FLUSH_SUPPLIER_CATALOG,
} from "../../actionTypes";

import { axiosInstance as axios } from "../../../axiosInstance";

export const fetchSupplierCatalog = (_id) => async (dispatch) => {
    dispatch(fetchSupplierCatalogStart);

    try {
        const response = await axios.get("/supplier/catalog/" + _id);
        dispatch(fetchSupplierCatalogSuccess(response.data.data.catalog));
    } catch (err) {
        dispatch(fetchSupplierCatalogFailed(err));
    }
};

export const flushSupplierCatalog = () => {
    return dispatch => {
        dispatch(flush())
    }
};

const flush = () => {
    return {
        type: FLUSH_SUPPLIER_CATALOG
    }
};

const fetchSupplierCatalogStart = () => {
    return {
        type: FETCH_SUPPLIER_CATALOG_START,
        payload: {
            loading: true,
        },
    };
};

const fetchSupplierCatalogSuccess = (catalog) => {
    return {
        type: FETCH_SUPPLIER_CATALOG_SUCCESS,
        payload: {
            catalog: catalog,
            loading: false,
        },
    };
};

const fetchSupplierCatalogFailed = (error) => {
    return {
        type: FETCH_SUPPLIER_CATALOG_FAILED,
        error: error,
    };
};
