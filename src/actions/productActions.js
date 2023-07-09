import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from "../constants/productConstants";
import apiHandler from "../apiHandler";

export const listProducts = () => async (dispatch) => {
    let productsData = []

    try{
        dispatch({type: PRODUCT_LIST_REQUEST})

        productsData = await apiHandler.fetchProducts().then(response => response.data.products)
        console.log(productsData)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: productsData})
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message? error.response.data.message : error.message})
    }
}