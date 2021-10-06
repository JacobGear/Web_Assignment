let cancelOrder = (function(){
    let pub = {};

    function getOrderNumber() {
        let parent = $(this).parent();
        let orderNumber = $(parent).find(".orderNumber").html();
        orderNumber = orderNumber.charAt(orderNumber.length-1);
        sendOrderNumber(orderNumber);
    }

    function sendOrderNumber(orderNumber) {
        $.ajax({
            type: "POST",
            url: "/assignment1/app/processCancel.php",
            cache: false,
            data: orderNumber,
            async: false,
            success: function(data) {
                $(".booking").html(data);
            },
            error: function(){
                alert("Ajax Failed");
            }
        });
    }

    pub.setup = function(){
        $(".cancelOrder").click(getOrderNumber);
    };

    return pub;
}());


$(document).ready(cancelOrder.setup);
