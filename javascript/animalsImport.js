let animalsImport = (function(){
    let pub = {};

    function addDropList(html){
        console.log("addDropList()");
        html += "<button type=\"button\" class='makeBooking'>Make Booking</button>";
        return html;
    }

    function addImage(dog, dogKey, html) {
        console.log("addImage()");
        if(dog[dogKey] === "DW-001") {
            html += "<img class='images' src=\"./images/small.jpg\" alt=\"Small\">";
        } else if(dog[dogKey] === "DW-002") {
            html += "<img class='images' src=\"./images/medium.jpg\" alt=\"Medium\">";
        } else if(dog[dogKey] === "DW-003") {
            html += "<img class='images' src=\"./images/large.jpg\" alt=\"Large\">";
        } else if(dog[dogKey] === "DW-004") {
            html += "<img class='images' src=\"./images/huge.jpg\" alt=\"Huge\">";
        }
        return html;
    }

    function htmlFormatting(dog, dogKey, html) {
        console.log("htmlFormatting()");
        let dogField;
        if(dogKey === "dogName") {
            dogField = "Dog's Name";
        } else if(dogKey === "dogId") {
            dogField = "Dog ID";
        } else if(dogKey === "dogType") {
            dogField = "Dog Type";
        } else if(dogKey === "dogSize") {
            dogField = "Dog Size";
        } else if(dogKey === "description") {
            dogField = "Description";
        } else if(dogKey === "pricePerHour") {
            dogField = "Price Per Hour";
        }
        if(dogKey !== "pricePerHour" && dogKey !== "dogId") {
            html += "<p>" + "<strong>" + dogField + ": " + "</strong>" + dog[dogKey] + "</p>";
        }
        if(dogKey === "pricePerHour") {
            html +=  "<p>" + "<strong>" + dogField + ": " + "</strong>" + "$" +
                "<object class='price'>" + dog[dogKey] + "</object>" + "</p>";
        }
        if(dogKey === "dogId") {
            html += "<p>" + "<strong>" + dogField + ": " + "</strong>" +
                "<object class='dogId'>" + dog[dogKey] + "</object>" + "</p>";
        }
        return html;
    }

    function jsonToHtml(json) {
        console.log("jsonToHTml()");
        let html = "";
        let keys = Object.keys(json);
        let animals = json[keys];
        let animalKeys = Object.keys(animals);
        let dogs = animals[animalKeys];
        dogs.forEach((dog) => {
            html += "<div class = 'dog'>";
            let dogKeys = Object.keys(dog);
            dogKeys.forEach((dogKey) => {
                html = addImage(dog, dogKey, html);
                html = htmlFormatting(dog, dogKey, html);
            })
            html = addDropList(html);
            html += "</div>";
            html += "<hr />";
        })
        $("#products").html(html);
    }

    function importAnimals2() {
        let request = new XMLHttpRequest();
        request.open('GET', "./json/animals.json");
        request.onload = () => {
            let result = JSON.parse(request.responseText);
            jsonToHtml(result);
        }
        request.send();
    }

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


    pub.setup = function() {
        importAnimals();
    }

    return pub;
}());


$(document).ready(animalsImport.setup);
