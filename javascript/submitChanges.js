let submitChanges = (function() {
    'use strict';
    let pub = {};

    function getChanges() {
        let dogs = [];
        let dogsJson;
        $('#dogTable tr').each(function(){
            let dogObj = {};
            let count = 0;
            $(this).find('td').each(function(){
                //do your stuff, you can use $(this) to get current cell
                //console.log($(this).html());
                if(count === 0) {
                    dogObj.dogId = $(this).html();
                } else if (count === 1) {
                    dogObj.dogName = $(this).html();
                } else if (count === 2) {
                    dogObj.dogType = $(this).html();
                } else if (count === 3) {
                    dogObj.dogSize = $(this).html();
                } else if (count === 4) {
                    dogObj.description = $(this).html();
                } else if (count === 5) {
                    dogObj.pricePerHour = $(this).html();
                }
                count++;
            });
            if(Object.keys(dogObj).length !== 0){
                dogs.push(dogObj);
            }
            dogsJson = JSON.stringify(dogs);
        });
        postChanges(dogsJson);
    }

    function getDogId() {
        /* jshint -W040 */
        let parent = $(this).parent().parent(); /* jshint +W040 */
        let dogId = $(parent).find(".dogIdTbl").html();
        postDelete(dogId);
    }

    function newDogPage() {
        window.location.href = "../admin/addDogPage.php";
    }

    function postChanges(dogs) {
        $.ajax({
            type: "POST",
            url: "/assignment1/app/processUpdate.php",
            cache: false,
            data: dogs,
            async: false,
            error: function(){
                alert("Ajax Failed");
            }
        });
    }

    function postDelete(dogID) {
        $.ajax({
            type: "POST",
            url: "/assignment1/app/processDelete.php",
            cache: false,
            data: dogID,
            async: false,
            success: function(data) {
                $(".testing").html(data);
            },
            error: function(){
                alert("Ajax Failed");
            }
        });
    }

    /**
     * Setup method.
     */
    pub.setup = function() {
        $("#submitChanges").click(getChanges);
        $("#addDog").click(newDogPage);
        $(".deleteDogBtn").click(getDogId);
    };

    return pub;
}());

$(document).ready(submitChanges.setup);