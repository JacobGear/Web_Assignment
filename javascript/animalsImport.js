let animalsImport = (function(){
    let pub = {};

    /**
     * Adds buttons for making and showing bookings.
     * @param html
     * @returns {*}
     */
    function addButtons(html){
        console.log("addDropList()");
        html += "<button type=\"button\" class='makeBooking'>Make Booking</button>";
        html += "<button type=\"button\" class='showBookings'>Show Bookings</button>";
        return html;
    }

    /**
     * Adds image matched with id's.
     * @param dog
     * @param html
     * @returns {*}
     */
    function addImage(dog, html) {
        console.log("addImage()");
        if(dog["dogId"] === "DW-001") {
            html += "<img class='images' src=\"./images/small.jpg\" alt=\"Small\">";
        } else if(dog["dogId"] === "DW-002") {
            html += "<img class='images' src=\"./images/medium.jpg\" alt=\"Medium\">";
        } else if(dog["dogId"] === "DW-003") {
            html += "<img class='images' src=\"./images/large.jpg\" alt=\"Large\">";
        } else if(dog["dogId"] === "DW-004") {
            html += "<img class='images' src=\"./images/huge.jpg\" alt=\"Huge\">";
        }
        return html;
    }

    /**
     * Takes json data converts it to html then returns it.
     * @param dog
     * @param dogKey
     * @param html
     * @returns {*}
     */
    function htmlFormatting(dog, dogKey, html) {
        console.log("htmlFormatting()");
        if(dogKey === "pricePerHour") {
            html += "<li>" + "$" + "<object class='price'>" + dog[dogKey] + "</object>" +
                "/hour" + "</li>";
        } else if(dogKey === "dogId") {
            html += "<li>" + "<object class='dogId'>" + dog[dogKey] + "</object>" + "</li>";
        } else if(dogKey === "dogName") {
            html += "<li>" + "<object class='dogName'>" + dog[dogKey] + "</object>" + "</li>";
        } else {
            html += "<li>" + dog[dogKey] + "</li>";
        }
        return html;
    }

    /**
     * Takes json data converts it to html then displays the html in
     * the products.html page.
     * @param json
     */
    function jsonToHtml(json) {
        console.log("jsonToHTml()");
        let html = "";
        let keys = Object.keys(json);
        let animals = json[keys];
        let animalKeys = Object.keys(animals);
        let dogs = animals[animalKeys];
        dogs.forEach((dog) => {
            html += "<section class = 'dog'>";
            html = addImage(dog, html);
            html += "<ul class='dogText'>";
            let dogKeys = Object.keys(dog);
            dogKeys.forEach((dogKey) => {
                html = htmlFormatting(dog, dogKey, html);
            })
            html += "</ul>";
            html = addButtons(html);
            html += "</section>";
            html += "<hr />";
        })
        $("#products").html(html);
    }

    /**
     * ajax method to import the json animals.
     */
    function importAnimals() {
        console.log("importAnimals()");
        $.ajax({
            type: "GET",
            async: false,
            timeout: 30000,
            url: "./json/animals.json",
            cache: false,
            success: function(data) {
                jsonToHtml(data);
            }
        });
    }

    /**
     * Setup method.
     */
    pub.setup = function() {
        importAnimals();
    }

    return pub;
}());


$(document).ready(animalsImport.setup);
