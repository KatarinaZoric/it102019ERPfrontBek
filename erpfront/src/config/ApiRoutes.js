const ApiRoutes = []

ApiRoutes.BASE_URL = "https://localhost:44307/"

ApiRoutes.LOGIN = ApiRoutes.BASE_URL + "login"
ApiRoutes.REGISTER = ApiRoutes.BASE_URL + "register"

ApiRoutes.PEOPLE_CATEGORY = ApiRoutes.BASE_URL + "PeopleCategory/"

ApiRoutes.PRODUCT_CATEGORY = ApiRoutes.BASE_URL + "ProductCategory/"

ApiRoutes.USER = ApiRoutes.BASE_URL + "User/"

ApiRoutes.PRODUCT = ApiRoutes.BASE_URL + "Product/"
ApiRoutes.PRODUCT_BY_CATEGORY = ApiRoutes.PRODUCT + "Category/"

ApiRoutes.REVIEW = "/Reviews/";

ApiRoutes.QUESTION = ApiRoutes.BASE_URL + "Question/"

ApiRoutes.MESSAGE = "/Messages/";

ApiRoutes.ORDER = ApiRoutes.BASE_URL + "Order/"
ApiRoutes.ORDER_BY_USER = "User/"

export default ApiRoutes