let addBooking = (function(){
    let pub = {};

    function addToBookings(){
        console.log("addToBookings()");
        let parentSection = $(this).parent();
        let dogId = $(parentSection).find(".dogId").text();
        let dogPrice = $(parentSection).find(".price").text();

        let item = {};
        item.price = dogPrice;
        item.id = dogId;

        updateCookies(item);
    }

    function duplicateCheck(item){
        let cart = window.localStorage.getItem("cart");
        cart = JSON.parse(cart);
        for(let cartItem of cart){
            if(item.id === cartItem.id){
                window.alert("Cannot select the same dog twice!");
                return false;
            }
        }
        return true;
    }

    function updateCookies(item){
        let cart = window.localStorage.getItem("cart");
        let cartObj = [];
        if(cart !== null){
            cartObj = JSON.parse(cart);
            if(duplicateCheck(item)) {
                cartObj.push(item);
                alert("Dog added to cart :)");
            }
        } else {
            cartObj.push(item);
            alert("Dog added to cart :)");
        }
        let cartStr = JSON.stringify(cartObj);
        window.localStorage.setItem("cart", cartStr);
    }

    pub.setup = function() {
        $(".makeBooking").click(addToBookings);
    }


    return pub;
}());
$(document).ready(addBooking.setup);

