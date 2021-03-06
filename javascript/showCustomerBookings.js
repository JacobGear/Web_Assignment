let showCustomerBookings = (function() {
    'use strict';
    let pub = {};

    /**
     * Changes the header for bookings.
     */
    function changeHeader() {
        $("#productsHead").html("Current Bookings:");
    }

    /**
     * Gets the date and time from a booking object and returns the string.
     * @param pickup
     * @returns {string} Booking start time string.
     */
    function getDateTime(pickup) {
        let bookingsStartTime = new Date(pickup.year, pickup.month, pickup.day,
            pickup.time.substring(0,2), pickup.time.substring(3,5));
        //let numHours = parseInt(booking.numHours);
        //let bookingsEndTime = new Date(booking.pickup.year, booking.pickup.month, booking.pickup.day,
        //(bookingsStartTime.getHours()+numHours), booking.pickup.time.substring(3,5));
        return bookingsStartTime.toString() + " ";
    }

    /**
     * Takes in a json object and converts it to html then returns it.
     * @param bookingObj
     * @param html
     * @returns {*}
     */
    function htmlFormatting(bookingObj, html) {
        html += "<div class='booking'>";
        html += "<strong>Requested dogs: </strong>" + bookingObj.dogId + "<br>";
        html += "<strong>Username: </strong>" + bookingObj.name + "<br>";
        html += "<strong>Pickup time: </strong>" + getDateTime(bookingObj.pickup) + "<br>";
        html += "<strong>Number of hours: </strong>" + bookingObj.numHours;
        html += "</div>";
        html += "<hr />";
        return html;
    }

    /**
     * Function to parseReview by getting the data from the json file and converting it to html.
     * @param json
     */
    function parseBookings(json) {
        let html = "";

        let keys = Object.keys(json);
        let bookings = json[keys]; // bookings object
        for(let bookingObj of bookings.booking){
            html = htmlFormatting(bookingObj, html);
        }
        $("#products").html(html);
    }

    /**
     * Ajax function that gets a json file, on success sends the data
     * to parseBookings.
     */
    function showBookings() {
        $.ajax({
            type: "GET",
            async: false,
            timeout: 30000,
            url: "./json/bookings.json",
            cache: false,
            success: function(data) {
                parseBookings(data);
                changeHeader();
            }
        });
    }

    /**
     * Setup method.
     */
    pub.setup = function() {
        $(".showBookings").click(showBookings);
    };

    return pub;
}());

$(document).ready(showCustomerBookings.setup);