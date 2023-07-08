import ApiRoutes from "../config/ApiRoutes"

export const RegisterService = {
    register: function(name, surname, email, username, password) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                Name: name, 
                Surname: surname,
                Email: email,
                Username: username,
                Password: password
              }

            fetch(ApiRoutes.REGISTER, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.status == 400) {
                    reject("Morate popuniti sva polja!")
                }

                if (response.status == 409) {
                    reject("Korisnik sa istom Email adresom vec postoji")
                }
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    }
}

export default RegisterService