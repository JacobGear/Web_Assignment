let login = (function() {
    'use strict';
    let pub = {};

    function moveToLogin() {
        window.location.href = "/assignment1/loginPage.php";
    }

    /**
     * Setup function.
     */
    pub.setup = function() {
        $(".sign").click(moveToLogin);
    };

    return pub;
}());

$(document).ready(login.setup);