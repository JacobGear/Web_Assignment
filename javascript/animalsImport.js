let animalsImport = (function(){
    let pub = {};

    function jsonToHtml(json) {
        let html = "";
        let keys = Object.keys(json);
        let animals = json[keys];
        let animalKeys = Object.keys(animals);
        let dogs = animals[animalKeys];
        dogs.forEach((dog) => {
            html += "<div class = 'dog'>";
            let dogKeys = Object.keys(dog);
            dogKeys.forEach((dogKey) => {
                html += "<strong>";
                html += dogKey;
                html += "</strong>";
                html += " : ";
                html += dog[dogKey];
                html += "<br />";
            })
            html += "</div>";
            html += "<hr />";
        })

        document.getElementById("products").innerHTML = html;
    }

    function importAnimals() {
        let request = new XMLHttpRequest();
        request.open('GET', "./json/animals.json");
        request.onload = () => {
            let result = JSON.parse(request.responseText);
            jsonToHtml(result);
        }
        request.send();
    }


    pub.setup = function() {
        importAnimals();
    }

    return pub;
}());


$(document).ready(animalsImport.setup);
