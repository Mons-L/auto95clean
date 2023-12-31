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

    fetchProduct(id){
        return this.apiServer.get('/products/' + id)
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchProductCategories(){
        return this.apiServer.get('/product-categories')
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

    fetchFormulasPrices(vehicleTypeId){
        return this.apiServer.get("/vehicles-types/" + vehicleTypeId + "/formulas")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchAvailableSlots(){
        return this.apiServer.get("/availabilities?fromDate=2023-07-02&dayNumber=6&slotDuration=120")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchUserOrdersFullInformations(){
        return this.apiServer.get("/users/1/orders")
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchUserReservationsFullInformations(){
        return this.apiServer.get("/users/1/reservations")
            .then(response => response.data)
            .catch(errorHandler)
    },

    cancelReservation(id){
        return this.apiServer.post("/reservations/" + id)
            .then(response => response.data)
            .catch(errorHandler)
    },

    insertMessage({firstname, lastname, email, subject, content}){
        return this.apiServer.put("/messages", {
            firstname,
            lastname,
            email,
            subject,
            content
        })
            .then(response => response.data)
            .catch(errorHandler)
    },

    fetchCart(){
        return this.apiServer.get("/cart")
            .then(response => response.data)
            .catch(errorHandler)
    },

    addCategory({ label }){
        return this.apiServer.put("/product-categories/" , {
            label
        })
            .then(response => response.data)
            .catch(errorHandler)
    },

    addProduct({ label, description, imagePath, price, quantity, categoryId }){
        return this.apiServer.put("/products/" , {
            label,
            description,
            imagePath,
            price,
            quantity,
            categoryId
        })
            .then(response => response.data)
            .catch(errorHandler)
    },

    updateProduct({ id, label, description, imagePath, price, quantity, categoryId }){
        return this.apiServer.post("/products/" + id, {
            label,
            description,
            imagePath,
            price,
            quantity,
            categoryId
        })
            .then(response => response.data)
            .catch(errorHandler)
    },

    deleteProduct({ id }){
        return this.apiServer.delete("/products/" + id)
            .then(response => response.data)
            .catch(errorHandler)
    },

    login({email, password}){
        return this.apiServer.post('/auth/login', {
            email,
            password
        })
            .then(response => response.data)
            .catch(errorHandler)
    },

    register({firstname, lastname, email, password, confirmPassword, phone}){
        return this.apiServer.put('/auth/register', {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            phone
        })
            .then(response => response.data)
            .catch(errorHandler)
    },

    loggedIn(){
        return this.apiServer
            .get('/auth/logged-in')
            .then(response => response.data)
            .catch(errorHandler)
    },

    logout(){
        return this.apiServer
            .post('/auth/logout')
            .catch(errorHandler)
    },

    registerReservation({startDate, endDate, email, phone, immatriculation,
                            paymentMode, formulaType, formulaId, vehicleTypeId, tasks}){
        return this.apiServer.put('/reservations', {
            startDate,
            endDate,
            email,
            phone,
            immatriculation,
            paymentMode,
            formulaType,
            formulaId,
            vehicleTypeId,
            tasks
        })
            .then(response => response.data)
            .catch(errorHandler)
    }

}