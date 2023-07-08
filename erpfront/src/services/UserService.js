import ApiRoutes from "../config/ApiRoutes"

export const UserService = {
    getUserByID: function(userId) {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.USER + userId, {
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    },

    updateUser: function(id, name, surname, email, username, password) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                Name: name, 
                Surname: surname, 
                Email: email,
                Username: username,
                Password: password
            }

            let jwt = localStorage.getItem("ButikJWT");

            fetch(ApiRoutes.USER + id, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject("Neispravni podaci")
                }
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    deleteUser: function(id) {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.USER + id, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                localStorage.clear();
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    }
}

export default UserService