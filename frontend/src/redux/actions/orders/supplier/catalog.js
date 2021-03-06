import * as actionTypes from '../../actionTypes';
import axiosInstance from "../../../axiosInstance";



const createCatalogSuccess =(data) =>{
    return{
        type: actionTypes.CREATE_CATALOG_SUCCESS,
        data: data
    };
};

 const createCatalogStart =() =>{
    return{
        type: actionTypes.CREATE_CATALOG_START
    };
};

 const createCatalogFailed =(error) =>{
    return{
        type: actionTypes.CREATE_CATALOG_FAILED,
        error: error
    };
};


export const createCatalog = (payload) => {
    return dispatch => {
        dispatch(createCatalogStart());

        // TODO: use axios instance to make POST request to backend with token and add to header
        //axios.post( ... )
        try {
            dispatch(createCatalogSuccess({
                message: "Catalog successfully created"
            }))

        } catch (e) {
            dispatch(createCatalogFailed(e.data))
        }

    }
};

const fetchCatalogSuccess =(data) =>{
    return{
        type: actionTypes.FETCH_CATALOG_SUCCESS,
        data: data
    };
};

const fetchCatalogStart =() =>{
    return{
        type: actionTypes.FETCH_CATALOG_START
    };
};

const fetchCatalogFailed =(error) =>{
    return{
        type: actionTypes.FETCH_CATALOG_FAILED,
        error: error
    };
};


export const fetchCatalog = (payload) => {
    return dispatch => {
        dispatch(fetchCatalogStart());
        console.log(payload);

        const token = payload.token;
        console.log(token);
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };

        axiosInstance.get("/supplier/fetchCatalog", config)
            .then(res => {
                dispatch(fetchCatalogSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchCatalogFailed(err.data))
            })


    }
};

export const flushCatalog = () => {
    return dispatch => {
        dispatch(flush())
    }
};


const flush = () => {
    return {
        type: actionTypes.CATALOG_FLUSH
    }
};

const addItemCatalogSuccess =(data) =>{
    return{
        type: actionTypes.ADD_ITEM_CATALOG_SUCCESS,
        data: data
    };
};

const addItemCatalogStart =() =>{
    return{
        type: actionTypes.ADD_ITEM_CATALOG_START
    };
};

const addItemCatalogFailed =(error) =>{
    return{
        type: actionTypes.ADD_ITEM_CATALOG_FAILED,
        error: error
    };
};


export const addItemCatalog = (payload) => {
    return dispatch => {
        dispatch(addItemCatalogStart());
        const token = payload.token;
        console.log(token);
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };
        const newItem = payload.data;
        console.log(newItem);

        // TODO: use axios instance to make PUT request to backend with token and add to header
        axiosInstance.put('supplier/addItem', newItem, config )
            .then(res => {
                dispatch(addItemCatalogSuccess(res.data))
            })
            .catch(err => {
                dispatch(addItemCatalogFailed(err.data))
            })

    }
};

const deleteItemCatalogSuccess =(data) =>{
    return{
        type: actionTypes.DELETE_ITEM_CATALOG_SUCCESS,
        data: data
    };
};

const deleteItemCatalogStart =() =>{
    return{
        type: actionTypes.DELETE_ITEM_CATALOG_START
    };
};

const deleteItemCatalogFailed =(error) =>{
    return{
        type: actionTypes.DELETE_ITEM_CATALOG_FAILED,
        error: error
    };
};


export const deleteItemCatalog = (payload) => {
    return dispatch => {
        dispatch(deleteItemCatalogStart());
        const token = payload.token;
        console.log(token);
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };
        const toDeleteItemId = {
            itemId: payload.itemId
        }
        console.log(toDeleteItemId);

        // TODO: use axios instance to make PUT request to backend with token and add to header
        axiosInstance.put('supplier/deleteItem',toDeleteItemId, config)
            .then(res => {
                dispatch(deleteItemCatalogSuccess(res.data))
            })
            .catch(err => {
                dispatch(deleteItemCatalogFailed(err.data))
            })


    }
};

const modifyItemCatalogSuccess =(data) =>{
    return{
        type: actionTypes.MODIFY_ITEM_CATALOG_SUCCESS,
        data: data
    };
};

const modifyItemCatalogStart =() =>{
    return{
        type: actionTypes.MODIFY_ITEM_CATALOG_START
    };
};

const modifyItemCatalogFailed =(error) =>{
    return{
        type: actionTypes.MODIFY_ITEM_CATALOG_FAILED,
        error: error
    };
};


export const modifyItemCatalog = (payload) => {
    return dispatch => {
        dispatch(modifyItemCatalogStart());
        const token = payload.token;
        const config = {
            headers: {
               Authorization: token,
               'Content-Type': 'application/json'
            }
        };
        const body = payload.data;

        axiosInstance.put('supplier/modifyItem', body, config)
            .then(res => {
                //res.data has id value of changed item and message
                dispatch(modifyItemCatalogSuccess(res.data))
                dispatch(fetchCatalog(payload))
            })
            .catch(err => {
                //err.data has property message
                dispatch(modifyItemCatalogFailed(err.data))
            })


    }
};


