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
     * Function to parseReview by getting the data from the json file and coverting it to html.
     * @param json
     */
    function parseBookings(json) {
        console.log("parseReviews()");
        let html = "";

        let keys = Object.keys(json);
        let bookings = json[keys]; // bookings object
        let orderNumber = 1;
        for(let bookingObj of bookings.booking){
            html += "<object class='orderNumber'> Order number: " + orderNumber + "</object>";
            html = htmlFormatting(bookingObj, html)
            orderNumber++;
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