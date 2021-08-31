let showBookings = (function() {
    let pub = {};

    function getDateTime(pickup) {
        let bookingsStartTime = new Date(pickup.year, pickup.month, pickup.day,
            pickup.time.substring(0,2), pickup.time.substring(3,5));
        //let numHours = parseInt(booking.numHours);
        //let bookingsEndTime = new Date(booking.pickup.year, booking.pickup.month, booking.pickup.day,
            //(bookingsStartTime.getHours()+numHours), booking.pickup.time.substring(3,5));
        return bookingsStartTime.toString() + " ";
    }
    /**
     * Function to parseReview by getting the data from the json file and coverting it to html.
     * @param json
     */
    function parseBookings(json) {
        console.log("parseReviews()");
        let html = "";

        let keys = Object.keys(json);
        let bookings = json[keys]; // bookings object
        for(let bookingObj of bookings.booking){
            html += "<div class='booking'>";
            html += bookingObj.dogId + " ";
            html += bookingObj.name + " ";
            html += getDateTime(bookingObj.pickup);
            html += bookingObj.numHours + " ";
            html += "</div>";
        }
        $(".adminBookings").html(html);
    }

    function showBookings() {
        console.log("showBookings()");
        $.ajax({
            type: "GET",
            async: false,
            timeout: 30000,
            url: "./json/bookings.json",
            cache: false,
            success: function(data) {
                parseBookings(data);
            }
        });
    }

    pub.setup = function() {
        showBookings();
    }

    return pub;
}());

$(document).ready(showBookings.setup);