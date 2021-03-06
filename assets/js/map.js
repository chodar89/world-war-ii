var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.111432, lng: 8.647591 },
        zoom: 3,
        gestureHandling: 'cooperative',
        
        // google map theme
        
        styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "visibility": "on" }] }, 
        { "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }, 
        { "saturation": "-100" }] }, { "featureType": "all", "elementType": "labels.text.fill", 
        "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }, { "visibility": "off" }] }, 
        { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }, 
        { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", 
        "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", 
        "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", 
        "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, 
        { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", 
        "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "landscape", "elementType": 
        "geometry.fill", "stylers": [{ "color": "#4d6059" }] }, { "featureType": "landscape", 
        "elementType": "geometry.stroke", "stylers": [{ "color": "#4d6059" }] }, 
        { "featureType": "landscape.natural", "elementType": "geometry.fill", 
        "stylers": [{ "color": "#4d6059" }] }, { "featureType": "poi", "elementType": "geometry", 
        "stylers": [{ "lightness": 21 }] }, { "featureType": "poi", "elementType": "geometry.fill", 
        "stylers": [{ "color": "#4d6059" }] }, { "featureType": "poi", "elementType": "geometry.stroke", 
        "stylers": [{ "color": "#4d6059" }] }, { "featureType": "road", "elementType": "geometry", 
        "stylers": [{ "visibility": "on" }, { "color": "#7f8d89" }] }, { "featureType": "road", 
        "elementType": "geometry.fill", "stylers": [{ "color": "#7f8d89" }] }, 
        { "featureType": "road.highway", "elementType": "geometry.fill", 
        "stylers": [{ "color": "#7f8d89" }, { "lightness": 17 }] }, { "featureType": "road.highway", 
        "elementType": "geometry.stroke", "stylers": [{ "color": "#7f8d89" }, { "lightness": 29 }, 
        { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", 
        "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, 
        { "featureType": "road.arterial", "elementType": "geometry.fill", 
        "stylers": [{ "color": "#7f8d89" }] }, { "featureType": "road.arterial", 
        "elementType": "geometry.stroke", "stylers": [{ "color": "#7f8d89" }] }, 
        { "featureType": "road.local", "elementType": "geometry", 
        "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "road.local", 
        "elementType": "geometry.fill", "stylers": [{ "color": "#7f8d89" }] }, 
        { "featureType": "road.local", "elementType": "geometry.stroke", 
        "stylers": [{ "color": "#7f8d89" }] }, { "featureType": "transit", "elementType": "geometry", 
        "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", 
        "elementType": "all", "stylers": [{ "color": "#2b3638" }, { "visibility": "on" }] }, 
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#2b3638" },
        { "lightness": 17 }] }, { "featureType": "water", "elementType": "geometry.fill", 
        "stylers": [{ "color": "#24282b" }] }, { "featureType": "water", "elementType": "geometry.stroke",
        "stylers": [{ "color": "#24282b" }] }, { "featureType": "water", "elementType": "labels", 
        "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text", 
        "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text.fill",
        "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text.stroke", 
        "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.icon", 
        "stylers": [{ "visibility": "off" }] }]
    });

    map.data.loadGeoJson(
        'assets/data/map.geojson');
    var infowindow = new google.maps.InfoWindow();

    // popup window for googla map and jquere code for slide down paragraph

    map.data.addListener('click', function(event) {


        let place = event.feature.getProperty("popupContent");
        let link = event.feature.getProperty("link");
        let infoText = event.feature.getProperty("info-text");
        let popup = place + "<p><a target='_blank' href=" + link + ">Wikipedia</a></p>";
        let img = event.feature.getProperty("img-url");
        let imgInfoText = "<div id='battle-img'></div>" + infoText;

        // jQuery function that triggers paragraph and img for chosen marker

        $(document).ready(function() {
            $('#slide-paragraph').html(imgInfoText);
            $('#battlefield-title').html(place);
            $('#battle-img').css({"background-image": "url(" + img + ")", 
            "background-repeat": "no-repeat", "background-position": "center",
            "background-size": "cover", "height": "200px", "position": "relative", "float": "right"
            });
        });

        infowindow.setContent(popup);
        infowindow.setPosition(event.feature.getGeometry().get());
        infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
        infowindow.open(map);
    });

}
