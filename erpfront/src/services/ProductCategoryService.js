import ApiRoutes from "../config/ApiRoutes"

export const ProductCategoryService = {
    getCategores: function() {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PRODUCT_CATEGORY, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    },

    getCategoryById: function(id) {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PRODUCT_CATEGORY + id, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    }
}

export default ProductCategoryService
