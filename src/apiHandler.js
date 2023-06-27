import axios from "axios";

const errorHandler = (err) => {
    throw err;
}

let apiServer = axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || 'http://localhost:3000/api'}`,
    withCredentials: true
});

export default {
    apiServer,

    fetchProducts(sort){
        return this.apiServer.get('/products')
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchProductsByFilters(filters){
        let params = []
        if(filters.categories && filters.categories.length > 0)
            params.push("categories="+filters.categories.join(","))
        if(filters.sort)
            params.push("sort="+filters.sort)

        return this.apiServer.get("/products"
            +  (filters? "?" : "")
            + params.join("&")
        )
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchProductsBySearch(search){
        return this.apiServer.get("/products?search=" + search)
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchVehiclesTypes(){
        return this.apiServer.get("/vehicles-types")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchFormulasTypes(){
        return this.apiServer.get("/formulas-types")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchFormulas(){
        return this.apiServer.get("/formulas")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchTasks(){
        return this.apiServer.get("/tasks")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchFormulasFullInformations(){
        return this.apiServer.get("/formulas-full-informations")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchFormulasPrices(){
        return this.apiServer.get("/formulas-prices")
            .then(response => response.data)
            .catch(errorHandler)
    }
}