let showBookings = (function() {
    let pub = {};

    function failMessage(target) {
        target.append("No Reviews!");
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
            console.log(bookingObj);
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