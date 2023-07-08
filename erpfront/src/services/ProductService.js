import ApiRoutes from "../config/ApiRoutes"

export const ProductService = {
    getProducts: function() {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PRODUCT, {
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    },

    getProductByID: function(productId) {
        return new Promise((resolve,reject) => {
            fetch(ApiRoutes.PRODUCT + productId, {
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .then(error => reject(error))
        })
    },

    getProductByCategory: function(category) {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PRODUCT_BY_CATEGORY + category, {
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    addProduct: function(name, price, amount, image, category, peopleCategories) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                Name: name, 
                Price: price,
                Amount: amount,
                Image: image,
                ProductCategory: category,
                PeopleCategories: peopleCategories
              }
              let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.PRODUCT, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    updateProduct: function(id,name, price, amount, image, category, peopleCategories) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                Name: name, 
                Price: price,
                Amount: amount,
                Image: image,
                ProductCategory: category,
                PeopleCategories: peopleCategories
              }
              let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.PRODUCT + id, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    deleteProduct: function(id) {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.PRODUCT + id, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    }
}

export default ProductService
