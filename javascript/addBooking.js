let addBooking = (function(){
    'use strict';
    let pub = {};

    /**
     * Finds the dog's ID, price, and name in html and
     * uses that information to make an object.
     */
    function addToBookings(){
        console.log("addToBookings()");
        /* jshint -W040 */
        let parentSection = $(this).parent();
        /* jshint +W040 */
        let dogId = $(parentSection).find(".dogId").text();
        let dogPrice = $(parentSection).find(".price").text();
        let dogName = $(parentSection).find(".dogName").text();

        let item = {};
        item.price = dogPrice;
        item.id = dogId;
        item.name = dogName;

        updateCookies(item);
    }

    /**
     * Takes a booking item and returns true if the item is already in
     * local storage, else returns false.
     * @param item
     * @returns {boolean}
     */
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

    /**
     * Returns true if there is more than three items in the cart
     * else returns false.
     * @returns {boolean}
     */
    function moreThenThreeCheck(){
        let cart = window.localStorage.getItem("cart");
        cart = JSON.parse(cart);
        if(cart.length >= 3) {
            alert("Cannot book more than three dogs at a time");
            return true;
        } else {
            return false;
        }
    }

    /**
     * Updates local storage each time a item is added to the cart.
     * @param item
     */
    function updateCookies(item){
        let cart = window.localStorage.getItem("cart");
        let cartObj = [];
        if(cart !== null){
            cartObj = JSON.parse(cart);
            if(duplicateCheck(item) && !moreThenThreeCheck()) {
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

    /**
     * Setup method.
     */
    pub.setup = function() {
        $(".makeBooking").click(addToBookings);
    };


    return pub;
}());
$(document).ready(addBooking.setup);

