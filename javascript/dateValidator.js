let dateValidator = (function(){
    'use strict';
    let pub = {};
    let bookingsArray = [];
    let error = [];

    /**
     * Checks to see if the checkout form was validated and saves the booking
     * object to local storage if the checkout passed validation.
     * @param requestedDogIds
     * @param availableDogs
     * @param userPickupDT
     */
    function checkAllSelectedDogs(requestedDogIds, availableDogs, userPickupDT){
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

    /**
     * Gets the booking time from the json files and if the time is not valid,
     * give a alert.
     * @param userPickupDT
     * @param requestedDogIds
     */
    function checkBooking(userPickupDT, requestedDogIds) {
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

    /**
     * Checks that the date field is not empty.
     * @param dateTime
     */
    function checkEmptyDate(dateTime) {
        if (!checkNotEmpty(dateTime)) {
            error.push("You must enter a date and time!");
        }
    }

    /**
     * Checks that a field is not empty.
     * @param textValue
     * @returns {boolean}
     */
    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    /**
     * Checks that the username field is not empty.
     * @param userName
     */
    function checkUserName(userName) {
        if (!checkNotEmpty(userName)) {
            error.push("You must enter an User Name!");
        }
    }

    /**
     * Displays error messages.
     */
    function errorMessages() {
        let errorID = $("#errorMessage");
        let theMessage = "";
        for(let message of error){
            theMessage += "<li>" + message +  "</li>";
            errorID.html(theMessage);
        }
    }

    /**
     * Displays success message in blue;
     */
    function errorFalse() {
        let errorID = $("#errorMessage");
        errorID.html("<li>" + "Successful!" +  "</li>");
        errorID.css("color", "blue");
    }

    /**
     * Gets user requested dogs from cart in local storage.
     */
    function getRequestedDogs(){
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

    /**
     * Gets the bookings from the json file and puts them into a list.
     * @param json
     */
    function getBookingsList(json){
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

    /**
     * Uses ajax method to import bookings json file.
     */
    function importBookings() {
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

    /**
     * Updates local storage if the booking was successful.
     * @param bookingObj
     */
    function updateLocalStorage(bookingObj){
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

    /**
     * Validates checkout, if validated a successful message is displayed
     * else a error message is shown.
     * @returns {boolean}
     */
    function validateCheckOut(){
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
            errorFalse();
            window.localStorage.removeItem("cart");
            return true;
        }

    }

    /**
     * Setup method.
     */
    pub.setup = function() {
        importBookings();
        $(".confirmBooking").click(getRequestedDogs);
    };


    return pub;
}());
$(document).ready(dateValidator.setup);

