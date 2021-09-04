let showCart = (function(){
    'use strict';
    let pub = {};

    /**
     * Clears cart in local storage then loads the document.
     */
    function clearCart() {
        console.log("clearCart()");
        window.localStorage.removeItem("cart");
        document.location.reload(true);
    }

    /**
     * returns the cart from local storage if the cart is not empty,
     * else returns null.
     * @returns {null|any}
     */
    function getCart() {
        console.log("getCart()");
        let cart = window.localStorage.getItem("cart");
        if(cart !== null){
            return JSON.parse(cart);
        } else {
            return null;
        }
    }

    /**
     * Gets the cart from local storage and converts the obj to html,
     * then displays it.
     */
    function showCart() {
        console.log("showCart()");
        let cart = getCart();
        let cartList = $("#cartList");
        let listString = "";

        if(cart === null){
            cartList.html("<p> No items in cart </p>");
        } else {
            for(let item of cart){
                listString += "<li>" + "<strong>" + item.name + "</strong>" + " " +
                    "$" + item.price + "/hour";
            }
            listString += "</li>";
            cartList.html(listString);
        }

        let totalHTML = $("#total");
        let total = 0.0;
        for(let item of cart){
            let p = parseFloat(item.price);
            total += p;
        }
        totalHTML.html("$" + total.toString() + " Per Hour");

        $("#clearCart").click(clearCart);
    }

    /**
     * Setup method.
     */
    pub.setup = function() {
        showCart();
    };


    return pub;
}());

$(document).ready(showCart.setup);

