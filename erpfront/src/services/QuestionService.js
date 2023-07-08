import ApiRoutes from "../config/ApiRoutes"

export const QuestionService = {

    getQuestions: function () {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.QUESTION, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    getMessagesByQuestion: function (questionId) {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.QUESTION + questionId + ApiRoutes.MESSAGE, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    },

    addQuestion: function(question) {
        return new Promise((resolve, reject) => {

            let requestBody = {
                theme: question
            }

            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.QUESTION, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                window.location.reload()
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },  

    deleteQuestion: function (questionId) {
        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.QUESTION + questionId, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                window.location.reload()
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    },

    deleteMessage: function (questionId, messageId) {

        return new Promise((resolve, reject) => {
            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.QUESTION + questionId + ApiRoutes.MESSAGE + messageId, {
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
    },

    addMessage: function (message, questionId) {
        return new Promise((resolve, reject) => {

            let requestBody = {
                messageText: message
            }

            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.QUESTION + questionId + ApiRoutes.MESSAGE, {
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

    updateMessage: function (questionId, messageId, message) {
        return new Promise((resolve, reject) => {

            let requestBody = {
                messageText: message
            }

            let jwt = localStorage.getItem("ButikJWT");
            fetch(ApiRoutes.QUESTION + questionId + ApiRoutes.MESSAGE + messageId, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                window.location.reload()
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    }
}
export default QuestionService