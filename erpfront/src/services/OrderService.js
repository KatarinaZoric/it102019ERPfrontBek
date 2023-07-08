import ApiRoutes from "../config/ApiRoutes"

export const OrderService = {
    getAllOrders: () => {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");

            fetch(ApiRoutes.ORDER, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    getAllOrdersForUser: (userId) => {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");

            fetch(ApiRoutes.ORDER + ApiRoutes.ORDER_BY_USER + userId, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    deleteOrder: (orderId) => {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");

            fetch(ApiRoutes.ORDER + orderId, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    makeOrder: (cart) => {
        return new Promise((resolve, reject) => {
            let requestBody = {
                OrderItems: []
            }

            cart.forEach(orderItem => {
                requestBody.OrderItems.push({
                    ProductID: orderItem.product.productID,
                    Amount: orderItem.amount
                })
            })

            let jwt = localStorage.getItem("ButikJWT");
            console.log(jwt)

            fetch(ApiRoutes.ORDER, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },
    fetchOrders: () => {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");

            fetch(ApiRoutes.ORDER, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    }


}