let dateValidator = (function(){
    let pub = {};
    let bookingsArray = [];

    function checkBooking(dateTime, requestedDogIds) {
        console.log("checkBooking()");
        let selectedDateTime = new Date(dateTime);

        for(let booking of bookingsArray){
            let bookingId = booking.dogId;
            let bookingsStartTime = new Date(booking.pickup.year, booking.pickup.month, booking.pickup.day,
                booking.pickup.time.substring(0,2), booking.pickup.time.substring(3,5));
            let numHours = parseInt(booking.numHours);
            let bookingsEndTime = new Date(booking.pickup.year, booking.pickup.month, booking.pickup.day,
                (bookingsStartTime.getHours()+numHours), booking.pickup.time.substring(3,5));

            for(let dogId of requestedDogIds){
                if(bookingId.includes(dogId)){
                    // Dog has been booked for this time
                    if((selectedDateTime >= bookingsStartTime) && (selectedDateTime <= bookingsEndTime)) {
                        alert(booking.name + " has this dog booked from " + bookingsStartTime + " to " +
                            bookingsEndTime);
                    } else { // Nobody has dog booked

                    }
                } else {
                    console.log("false");
                }
            }


        }
    }

    function getRequestedDogs(){
        console.log("getRequestedDogs()");
        let userDateTime = $("#dateTime");
        let requestedDogIds = [];

        let cart = window.localStorage.getItem("cart");
        cart = JSON.parse(cart);
        for(let item of cart){
            requestedDogIds.push(item.id);
        }
        checkBooking(userDateTime.val(), requestedDogIds);
    }

    function getBookingsList(json){
        console.log("getBookingsList()");
        let bookingsList = [];
        let keys = Object.keys(json);
        let bookingsObj = json[keys]; // bookings object
        let bookingsObjKey = Object.keys(bookingsObj);
        let bookings = bookingsObj[bookingsObjKey]; // ind bookings
        bookings.forEach((booking) => {
            bookingsList.push(booking);
        });
        bookingsArray = bookingsList;
    }

    function importBookings() {
        console.log("importBookings()");
        $.ajax({
            type: "GET",
            async: false,
            timeout: 30000,
            url: "./json/bookings.json",
            cache: false,
            success: function(data) {
                getBookingsList(data);
            }
        });
    }

    pub.setup = function() {
        importBookings();
        $(".confirmBooking").click(getRequestedDogs);
    }


    return pub;
}());
$(document).ready(dateValidator.setup);

