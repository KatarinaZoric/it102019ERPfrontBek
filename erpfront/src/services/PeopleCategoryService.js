import ApiRoutes from "../config/ApiRoutes"

export const PeopleCategoryService = {
    getPeople: function() {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PEOPLE_CATEGORY, {
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

export default PeopleCategoryService
