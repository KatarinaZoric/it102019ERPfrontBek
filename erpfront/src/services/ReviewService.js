import ApiRoutes from "../config/ApiRoutes"

export const ReviewService = {
    getReview: function(productId) {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PRODUCT + productId + ApiRoutes.REVIEW, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    },

    addReview: function(rating, comment, productId) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                Rating: rating,
                Comment: comment
            }

            let jwt = localStorage.getItem("ButikJWT")

            fetch(ApiRoutes.PRODUCT + productId + ApiRoutes.REVIEW, {
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

    updateReview: function(id, comment, rating, productId) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                Rating: rating,
                Comment: comment
            }

            let jwt = localStorage.getItem("ButikJWT")

            fetch(ApiRoutes.PRODUCT + productId + ApiRoutes.REVIEW + id, {
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

    deleteReview: function(id, productId) {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");

            fetch(ApiRoutes.PRODUCT + productId + ApiRoutes.REVIEW + id, {
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

export default ReviewService