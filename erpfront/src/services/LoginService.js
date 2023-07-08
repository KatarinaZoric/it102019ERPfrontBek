import ApiRoutes from "../config/ApiRoutes"
import ReactRoues from '../config/ReactRoutes'

export const LoginService = {

    logIn: function(email, password) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                email: email,
                password: password
              }

            fetch(ApiRoutes.LOGIN, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if(response.status == 400) {
                    reject("Morate popuniti sva polja")
                }

                if(response.status == 404) {
                    reject("Neispravni podaci")
                }
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    },

    logOut: function() {
        localStorage.clear();
        window.location.href = ReactRoues.HOME
       // window.location.reload()
    }
}

export default LoginService
