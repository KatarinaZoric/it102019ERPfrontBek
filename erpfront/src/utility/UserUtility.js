export const UserUtility = {
    isLoggedIn: function() {
        let jwt = localStorage.getItem('ButikJWT');
        return jwt !== null && jwt !== '';
    },

    isEmployee: function() {
        let role = localStorage.getItem("ButikRole");
        return role === "Employee" 
    }
}

export default UserUtility
