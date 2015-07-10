var map,
	infoWindow,
	fullUrl,
	streetViewImg,
	streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=',
	weatherString;

// Initialize Google Maps
function initialize() {
	'use strict';
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(47.378236, 8.539439),
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// Set all Markers from the allMarkers array
	setMarkers(allMarkers);
	determineVisibility();
}

// Determines whether a marker should be visible or not when search filtering
function determineVisibility() {
	'use strict';
	var allMarkersLength = allMarkers.length;
	for (var i = 0; i < allMarkersLength; i++) {
		if (allMarkers[i].shouldDisplay === true) {
			allMarkers[i].holdMarker.setMap(map);
		} else {
			allMarkers[i].holdMarker.setMap(null);
		}
	}
}

// The marker's array containing all data
var allMarkers = [
	{
		name: 'Zurich HB',
		lat: 47.378236,
		lng: 8.539439,
		street: 'Museumstrasse 1',
		city: '8021 Zurich',
		id: 'nav0',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'The center of the city. A nice place to meet up with friends.'
	},
	{
		name: 'Chinagarten Zürich',
		lat: 47.355176,
		lng: 8.552384,
		street: 'Bellerivestrasse 138',
		city: '8008 Zurich',
		id: 'nav1',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'A chinese garden nearby the lake where they keep some very exotic plants.'
	},
	{
		name: 'Limmatquai',
		lat: 47.366925,
		lng: 8.542937,
		street: 'Quaibrücke',
		city: '8001 Zurich',
		id: 'nav2',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'A bridge crossing the Limmat river with a beautiful view over the Lake of Zurich'
	},
	{
		name: 'Langstrasse',
		lat: 47.379250,
		lng: 8.527498,
		street: 'Langstrasse',
		city: '8004 Zurich',
		id: 'nav3',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'English: "Long Street". A street in the heart of the city with a lot of bars and a vivid nightlife'
	},
	{
		name: 'Letzigrund Stadium',
		lat: 47.38222,
		lng: 8.503871,
		street: 'Badenerstrasse 500',
		city: '8048 Zurich',
		id: 'nav4',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'The biggest stadium in town, hosting sports events and concerts'
	},
	{
		name: 'Zurich Opera House',
		lat: 47.365566,
		lng: 8.546964,
		street: 'Sechseläutenplatz',
		city: '8058 Zurich Flughafen',
		id: 'nav5',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'Zurich\'s Opera House. A very fancy place. Dress up accordingly if you wish to go there.'
	},
	{
		name: 'University of Zurich',
		lat: 47.374322,
		lng: 8.550981,
		street: 'Rämistrasse 71',
		city: '8006 Zurich',
		id: 'nav6',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'The largest University in Switzerland with over 26\'000 students.'
	},
	{
		name: 'Zoo Zürich',
		lat: 47.388304,
		lng: 8.57706,
		street: 'Zürichbergstrasse 221',
		city: '8044 Zurich',
		id: 'nav7',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'This zoo was first opened in 1929. As of 2004, it has over 200 specimens of 300 species.'
	},
	{
		name: 'Zürich Hardbrücke',
		lat: 47.38657,
		lng: 8.518361,
		street: 'Hardstrasse',
		city: '8005 Zurich',
		id: 'nav8',
		visible: ko.observable(true),
		shouldDisplay: true,
		comment: 'Zurich\'s more modern district. It is among the most expensive places in town.'
	}
];

function setMarkers(location) {
	'use strict';
	// Loops through each element in the allMarkers array and sets it on the map
	for (var i = 0; i < location.length; i++) {

		location[i].holdMarker = new google.maps.Marker({
			position: new google.maps.LatLng(location[i].lat, location[i].lng),
			map: map,
			name: location[i].name,
			icon: {
				url: 'img/map-marker-icon.png',
				size: new google.maps.Size(32, 32),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(12.5, 32)
			}
		});

		// Access street view data
		// to be placed in InfoWindow
		streetViewImg = streetViewUrl + location[i].lat + ',' + location[i].lng;

		// contentString: string concatenation with all the data from the allMarkers array
		// also street view images for every location
		location[i].contentString = '<strong>' + location[i].name +
									'</strong><br>' + location[i].street +
									'<br>' + location[i].city +
									'<br><p id="wiki-elem"></p>' +
									'<p style="font-style: italic;">' + location[i].comment + '</p>' +
									'<img src="' + streetViewImg + '" alt="Street View Image">';

		// Creates new Google Maps Infowindow
		infoWindow = new google.maps.InfoWindow({
			maxWidth: 200,
			content: location[i].contentString
		});

		/**
		 * Adjusts map center on zoom to allow full visibility of infoWindow
		 * @constructor
		 * @param {number} latlng - Latititude and Longitude value
		 * @param {number} adjustX - Position adjustment value for X axis
		 * @param {number} adjustY - Position adjustment value for Y axis
		 */
		function centerAdjust(latlng, adjustX, adjustY) {
			var scale = Math.pow(2, map.getZoom());

			var nw = new google.maps.LatLng(
    			map.getBounds().getNorthEast().lat(),
    			map.getBounds().getSouthWest().lng()
			);

			var center = map.getProjection().fromLatLngToPoint(latlng);

   			var adjust = new google.maps.Point((adjustX/scale) || 0, (adjustY/scale) || 0);

			var pixelOffset = new google.maps.Point(
    			center.x - adjust.x,
    			center.y - adjust.y
			);

			var newCenter = map.getProjection().fromPointToLatLng(pixelOffset);
   			return newCenter;
		}

		/**
		 * Listens to click event on map marker, zooms in, centers the mao, and opens Infowindow on click
		 * On click the getWiki() function will be invoked which will make an AJAX request
		 * and search for a related article for the location
		 */
		google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
			return function() {
				getWiki(location[i].name);
				infoWindow.setContent(location[i].contentString);

				map.setZoom(16);
				infoWindow.open(map, this);
				map.setCenter(centerAdjust(marker.getPosition(), 0, 150));
			};
		})(location[i].holdMarker, i));

		// Click event listener for the all the list elements in the list view
		// If fired, the infoWindow will open and display information
		$(document).on('click', '#nav' + i, (function(marker, i) {
			return function() {
				getWiki(location[i].name);
				infoWindow.setContent(location[i].contentString);

				map.setZoom(16);
				infoWindow.open(map, marker);
				map.setCenter(centerAdjust(marker.getPosition(), 0, 150));
			};
		})(location[i].holdMarker, i));

	} // end for-loop
} // end setMarkers

initialize();

/**
 * ViewModel Section
 */

var viewModel = {
	query: ko.observable('')
};

// Search Filter
viewModel.markers = ko.computed(function() {
	var self = this;
	var search = self.query().toLowerCase();

	return ko.utils.arrayFilter(allMarkers, function(marker) {
		if (marker.name.toLowerCase().indexOf(search) >= 0) {
			marker.shouldDisplay = true;
			return marker.visible(true);
		} else {
			marker.shouldDisplay = false;
			determineVisibility();
			return marker.visible(false);
		}
	});
}, viewModel);

ko.applyBindings(viewModel);

// Sync marker visibility with search input
$("#input").keyup(function() {
	determineVisibility();
});

// Weather is hidden by default
var weatherVisible = false;


// Click event listener which will make the weather Div slide up and down
// The if/else statement checks whether the div is currently visible or not
// and will run jQuery's animate() to slide it up or down

$('#weather-logo img').on('click', function() {
	// If weather div not visible, slide up
	if (!weatherVisible) {
		$('#weather-container').animate({
			bottom: '0px'
		}, 200);

		$('#weather-logo').animate({
			bottom: '20em'
		}, 200);

		// Animation finished, weather is now visible
		weatherVisible = true;

	// Else if weather div is visiblle, slide down
	} else if (weatherVisible) {
		$('#weather-container').animate({
			bottom: '-20em'
		}, 200);

		$('#weather-logo').animate({
			bottom: '0px'
		}, 200);

		// Animation finished, weather is now not visible
		weatherVisible = false;
	}
});



// List view is hidden by default
var navVisible = false;
var $navHolder = $('#sidebar-outer');

// Click event listener for the list navigation arrow icon
// If/else statement checks whether the nav is currently visible or not
// and slides it up or down accordingly
// This also uses two different arrow svg's. One pointing up the other down
// They also change based on the visibility of the nav

var navHeight = $('#sidebar-outer').height();

$('.listnav-out').css('top', -navHeight);


$('#arrow').on('click', function() {

	// If nav is not visible, slide down
	if (!navVisible) {
		$navHolder.animate({
			top: '35px'
		}, 200);

		$('#arrow').animate({
			top: navHeight
		}, 200).attr('src', 'img/arrow-up.svg');

		// Nav is now visible
		navVisible = true;

	// Else if nav is visible, slide up
	} else if (navVisible) {
		$navHolder.animate({
			top: -navHeight
		}, 200);

		$('#arrow').animate({
			top: '0'
		}, 200).attr('src', 'img/arrow-down.svg');

		// Nav is now not visible
		navVisible = false;
	}
});

// Click event listener for the 'Reset Zoom' button
$('#reset').on('click', function() {
	infoWindow.close();
	map.setZoom(13);
});