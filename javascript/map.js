let map = (function () {
    'use strict';
    let pub = {};
    let map;
    let office = L.layerGroup();
    let walks = L.layerGroup();
    let parks = L.layerGroup();

    /**
     * Inserts the geoJson and on success sends the data to markers.
     */
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

    /**
     * Gets the map from leaflet and adds it to the map variable to be displayed.
     */
    function mapSetup(){
        map = L.map('map').setView([-45.875, 170.500], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18,
                attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);
    }

    /**
     * On each feature of bind a popup and add it to its correct layer group.
     * @param markerLocations
     */
    function markers(markerLocations){
        L.geoJson(markerLocations, {
            onEachFeature: function (feature, layer) {
                let content = "Name: " + feature.properties.name + "<br>";
                content += "Type: " + feature.properties.type + "<br>";
                layer.bindPopup(content);

                if(feature.properties.type === "office") {
                    office.addLayer(layer);
                } else if (feature.properties.type === "walk") {
                    walks.addLayer(layer);
                } else {
                    parks.addLayer(layer);
                }
            }
        });
        office.addTo(map);
    }

    /**
     * Function for show/hiding walks and parks if box is checked or not.
     */
    function showHide() {
        /* jshint -W040 */
        if($(this).attr("id") === "showParks") {
            if($(this).prop('checked')) parks.addTo(map);
            else parks.remove();
        } else if($(this).attr("id") === "showWalks") {
            if($(this).prop('checked')) walks.addTo(map);
            else walks.remove();
        }
        /* jshint +W040 */

    }

    /**
     * Setup function.
     */
    pub.setup = function(){
        mapSetup();
        insertGeo();
        $("#showWalks").click(showHide);
        $("#showParks").click(showHide);
    };

    return pub;
}());

$(document).ready(map.setup);
