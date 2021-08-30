let Reviews = (function() {
    let pub = {};

    function failMessage(target) {
        target.append("No Reviews!");
    }
    /**
     * Function to parseReview by getting the data from the json file and coverting it to html.
     * @param data
     */
    function parseReviews(reviews) {
        console.log("parseReviews()");

        let html = "";
        for(let review of reviews){
            html += "<div class='review'>";
            html += "<p>" + review.title + "</p>";
            html += "<p>" + review.author + "</p>";
            html += "<p>" + review.reviewcontent + "</p>";
            html += "</div>" + "</br>";
        }
        $(".reviews").html(html);
    }

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

    pub.setup = function() {
        showReviews();
    }

    return pub;
}());

$(document).ready(Reviews.setup);