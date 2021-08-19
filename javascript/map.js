let Map = (function () {

    let pub = {};
    let map;

    function insertGeo() {
        $.ajax({
            type: "GET",
            url: "./json/POI.geojson",
            cache: false,
            success: function (data) {
                markers(data);
            }
        });
    }

    function mapSetup(){
        map = L.map('map').setView([-45.875, 170.500], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18,
                attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);
    }

    function markers(markerLocations){
        L.geoJSON(markerLocations).addTo(map);
    }

    pub.setup = function(){
        mapSetup()
        insertGeo()
    }

    return pub;
}());

$(document).ready(Map.setup);
