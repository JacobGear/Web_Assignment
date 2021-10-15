let GetCartContents = (function(){
    let pub = {};

    pub.setup = function(){
        $.ajax({
            type: "POST",
            url: "/assignment1/app/processCartContents.php",
            cache: false,
            data: window.localStorage.getItem("bookings"),
            datatype: 'JSON',
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function() {
                alert("Successful");
                window.localStorage.removeItem("bookings");
                location.reload();
            },
            error: function(){
                alert("Ajax Failed");
            }
        });
    };

    return pub;
}());


$(document).ready(GetCartContents.setup);
