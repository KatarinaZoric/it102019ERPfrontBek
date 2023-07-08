import moment from 'moment'

const DateTimeUtility = {
    formatDate: function(date) {
        return moment(date).format("Do MMMM YYYY HH:mm:ss")
    }
}

export default DateTimeUtility