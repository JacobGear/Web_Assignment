let dateValidator = (function(){
    let pub = {};
    let bookingsArray = [];
    let error = [];

    function checkAllSelectedDogs(requestedDogIds, availableDogs, userPickupDT){
        console.log("checkAllSelectedDogs()");
        if(requestedDogIds.length === availableDogs.length && validateCheckOut()){
            let bookingObj = {};
            bookingObj.dogID = requestedDogIds;
            bookingObj.name = $("#userName").val();
            bookingObj.pickup = {};
            bookingObj.pickup.day = userPickupDT.getDay().toString();
            bookingObj.pickup.month = userPickupDT.getMonth().toString();
            bookingObj.pickup.year = userPickupDT.getFullYear().toString();
            bookingObj.pickup.time = userPickupDT.getHours() + ":" + userPickupDT.getMinutes();
            bookingObj.numHours = $("#numHours").val();
            updateLocalStorage(bookingObj);
            alert("Booking successful!");
        } else {
            alert("Error try again");
        }
    }

    function checkBooking(userPickupDT, requestedDogIds) {
        console.log("checkBooking()");
        let availableDogs = [];

        for(let booking of bookingsArray){
            let bookingId = booking.dogId;
            let bookingsStartTime = new Date(booking.pickup.year, booking.pickup.month, booking.pickup.day,
                booking.pickup.time.substring(0,2), booking.pickup.time.substring(3,5));
            let numHours = parseInt(booking.numHours);
            let bookingsEndTime = new Date(booking.pickup.year, booking.pickup.month, booking.pickup.day,
                (bookingsStartTime.getHours()+numHours), booking.pickup.time.substring(3,5));

            for(let dogIDs of requestedDogIds){
                if(bookingId.includes(dogIDs)){
                    // Dog has been booked for this time
                    if((userPickupDT >= bookingsStartTime) && (userPickupDT <= bookingsEndTime)) {
                        alert(booking.name + " has this dog booked from " + bookingsStartTime + " to " +
                            bookingsEndTime);
                    } else { // Nobody has dog booked
                        if(!availableDogs.includes(dogIDs)){
                            availableDogs.push(dogIDs);
                        }
                    }
                } else { // Nobody has dog booked
                    if(!availableDogs.includes(dogIDs)){
                        availableDogs.push(dogIDs);
                    }
                }
            }

        }
        checkAllSelectedDogs(requestedDogIds, availableDogs, userPickupDT);

    }

    function checkEmptyDate(dateTime) {
        if (!checkNotEmpty(dateTime)) {
            error.push("You must enter a date and time!");
        }
    }

    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    function checkUserName(userName) {
        if (!checkNotEmpty(userName)) {
            error.push("You must enter an User Name!");
        }
    }

    function errorMessages() {
        let errorID = $("#errorMessage");
        let theMessage = "";
        for(let message of error){
            theMessage += "<li>" + message +  "</li>";
            errorID.html(theMessage);
        }
    }

    function errorFalse() {
        let errorID = $("#errorMessage");
        errorID.html("<li>" + "Successful!" +  "</li>");
        errorID.css("color", "blue");
    }

    function getRequestedDogs(){
        console.log("getRequestedDogs()");
        let userDateTime = $("#dateTime").val();
        let userPickupDT = new Date(userDateTime);

        let requestedDogIds = [];
        let cart = window.localStorage.getItem("cart");
        cart = JSON.parse(cart);
        for(let item of cart){
            requestedDogIds.push(item.id);
        }
        checkBooking(userPickupDT, requestedDogIds);
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

    function updateLocalStorage(bookingObj){
        console.log("updateLocalStorage()");
        let getBookings = window.localStorage.getItem("bookings");
        if(getBookings === null){
            let bookingsObj = {};
            bookingsObj.booking = [];
            bookingsObj.booking.push(bookingObj);
            let bookings = JSON.stringify(bookingsObj);
            window.localStorage.setItem("bookings", bookings);
        } else {
            let bookingsObj = JSON.parse(getBookings);
            bookingsObj.booking.push(bookingObj);
            let bookings = JSON.stringify(bookingsObj);
            window.localStorage.setItem("bookings", bookings);
        }
    }

    function validateCheckOut(){
        console.log("validateCheckOut()");
        let userName = $("#userName").val();
        checkUserName(userName);
        let dateTime = $("#dateTime").val();
        checkEmptyDate(dateTime);

        if (error.length > 0) {
            // Report the error messages
            console.log(JSON.stringify(error));
            errorMessages();
            error = [];
            return false;
        } else {
            errorFalse()
            window.localStorage.removeItem("cart");
            return true;
        }

    }

    pub.setup = function() {
        importBookings();
        $(".confirmBooking").click(getRequestedDogs);
    }


    return pub;
}());
$(document).ready(dateValidator.setup);

