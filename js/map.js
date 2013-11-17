//$(function(){
//	initializeMap();
//});

// вызов перенесён в функцию-коллбек показа карты в параллаксе
function initializeMap() {
	var map;
	var office = new google.maps.LatLng(59.936725,30.316987);

	var MY_MAPTYPE_ID = 'mystyle';

	var custom =  [
		{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "water",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "color": "#6b6b6b" }
			]
		},{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "water",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "transit.line",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "transit.line",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "transit.station.bus",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"featureType": "transit.station.rail",
			"elementType": "labels.icon",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "transit.station.rail",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "transit.station.rail",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "road",
			"elementType": "geometry.fill",
			"stylers": [
				{ "color": "#333333" }
			]
		},{
			"featureType": "road",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "road",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "poi",
			"elementType": "geometry.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#454545" }
			]
		},{
			"featureType": "poi",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "administrative",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "poi",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
			"featureType": "landscape.man_made",
			"elementType": "geometry.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#aaaaaa" }
			]
		},{
			"featureType": "landscape.man_made",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "color": "#111111" }
			]
		},{
			"featureType": "landscape.natural",
			"elementType": "geometry.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#555555" }
			]
		},{
			"featureType": "landscape.natural",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "color": "#a9a9a9" }
			]
		},{
			"featureType": "transit.line",
			"elementType": "geometry.fill",
			"stylers": [
				{ "color": "#808080" }
			]
		},{
			"elementType": "labels.text.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#ffffff" }
			]
		},{
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "color": "#000000" }
			]
		},{
		}
	];

	var mapOptions = {
			zoom: 15,
			center: office,
			scrollwheel: false,
			zoomControl: false,
			mapTypeControl: false,
			panControl: false,
			streetViewControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
			},
			mapTypeId: MY_MAPTYPE_ID
		};

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var styledMapOptions = {
		name: "UpRock"
	};

	var markerImage = new google.maps.MarkerImage(
		'../images/marker.png',
		new google.maps.Size(56,68),
		new google.maps.Point(0,0),
		new google.maps.Point(20,68)
	);

	var marker = new google.maps.Marker({
		icon: markerImage,
		position: office,
		map: map,
		title:"16 Nevsky ave. Saint-Petersburg, Russia"
	});

	var upRockMapType = new google.maps.StyledMapType(custom, styledMapOptions);

	map.mapTypes.set(MY_MAPTYPE_ID, upRockMapType);
}