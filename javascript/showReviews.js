let Reviews = (function() {
    'use strict';
    let pub = {};

    /**
     * Function to parseReview by getting the data from the json file and converting it
     * to html.
     * @param reviews
     */
    function parseReviews(reviews) {
        console.log("parseReviews()");

        let html = "";
        for(let review of reviews){
            html += "<div class='review'>";
            html += "<p class='reviewTitle'>" + review.title + "</p>";
            html += "<p class='reviewAuthor'>" + review.author + "</p><br>";
            html += "<p class='reviewContent'>" + review.reviewcontent + "</p>";
            html += "</div>" + "<br><hr><br>";
        }
        $(".reviews").html(html);
    }

    /**
     * Ajax method for retrieving the json file and on success sends the data to
     * parseReviews.
     */
    function showReviews() {
        console.log("showReviews()");
        $.ajax({
            type: "GET",
            async: false,
            timeout: 30000,
            url: "./json/reviews.json",
            cache: false,
            success: function(data) {
                parseReviews(data);
            }
        });
    }

    /**
     * Setup method.
     */
    pub.setup = function() {
        showReviews();
    };

    return pub;
}());

$(document).ready(Reviews.setup);