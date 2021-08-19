let animalsImport = (function(){
    let pub = {};

    function animalStuff(animals) {
        console.log(animals);
        for(let dogs of animals[0]){
            console.log(dogs);
        }
    }

    function importAnimals() {
        $.ajax({
            type: "GET",
            url: "./json/animals.json",
            cache: false,
            success: function (data) {
                animalStuff(data);
            }
        });
    }


    pub.setup = function() {
        importAnimals();
    }

    return pub;
}());


$(document).ready(animalsImport.setup);
