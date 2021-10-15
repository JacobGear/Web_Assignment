let showAdminBookings = (function() {
    'use strict';
    let pub = {};

    /**
     * Gets the data and time from the json object converts it to a date,
     * then returns it in string form.
     * @param pickup
     * @returns {string}
     */
    function getDateTime(pickup) {
        let bookingsStartTime = new Date(pickup.year, pickup.month, pickup.day,
            pickup.time.substring(0,2), pickup.time.substring(3,5));
        return bookingsStartTime.toString() + " ";
    }

    /**
     * Takes in a json object and converts it to html then returns it.
     * @param bookingObj
     * @param html
     * @returns {*}
     */
    function htmlFormatting(bookingObj, html) {
        html += "<strong>Requested dogs: </strong>" + bookingObj.dogId + "<br>";
        html += "<strong>Username: </strong>" + bookingObj.name + "<br>";
        html += "<strong>Pickup time: </strong>" + getDateTime(bookingObj.pickup) + "<br>";
        html += "<strong>Number of hours: </strong>" + bookingObj.numHours;
        html += "<br><button type=\"button\" class='cancelOrder'>Cancel Booking</button>";
        html += "<hr />";
        return html;
    }

    /**
     * Function to parseReview by getting the data from the json file and converting
     * it to html then displaying it.
     * @param json
     */
    function parseBookings(json) {
        let html = "";

        let keys = Object.keys(json);
        let bookings = json[keys]; // bookings object
        let orderNumber = 1;
        for(let bookingObj of bookings.booking){
            html += "<div class='booking'>";
            html += "<object class='orderNumber'> Order number: " + orderNumber + "</object><br>";
            html = htmlFormatting(bookingObj, html);
            html += "</div>";
            orderNumber++;
        }
        $(".adminBookings").html(html);
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
            url: "../json/bookings.json",
            cache: false,
            success: function(data) {
                parseBookings(data);
            }
        });
    }

    /**
     * Setup function.
     */
    pub.setup = function() {
        showBookings();
    };

    return pub;
}());

$(document).ready(showAdminBookings.setup);