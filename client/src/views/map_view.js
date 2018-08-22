const PubSub = require('../helpers/pub_sub.js');
const linkifyjsHtml = require('linkifyjs/html');
const MapView = function (container) {
  this.container = container;
}

MapView.prototype.bindEvents = function () {

  PubSub.subscribe('Events:event-data-loaded', (evt) => {
   this.createMap(evt.detail);
   this.setMapMarkers(evt.detail);
  });

  PubSub.subscribe('EventItemView', (evt) => {
    console.log(evt.detail.path[0].value);
    const newMarker = L.marker(evt.detail.path[0].value)
    newMarker.addTo(myMap).on('click', onMapClick)
   });

  // PubSub.subscribe('Events:saved-event-list', (evt) =>{
  //  this.createMapSaved(evt.detail);
  //  this.setMapMarkersSaved(evt.detail);
  //
  // });
}

  MapView.prototype.createMap = function (eventData) {
    document.getElementById('map-container').innerHTML = "<div id ='mapid'></div>"
    const latt = eventData[0].venue.latitude;
    const longt = eventData[0].venue.longitude;
    myMap = L.map('mapid', {
    center: [54.297293, -1.296386],
    zoom: 5
  }).flyTo([latt, longt], 11, true, 6);
  // myMap.flyTo([latt,longt],{
  //   animate: true,
  //   duation: 1
  // });

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  };


  // MapView.prototype.createMapSaved = function (eventData) {
  //   document.getElementById('map-container').innerHTML = "<div id ='mapid'></div>"
  //   const latt = eventData[0].lat;
  //   const longt = eventData[0].longt;
  //   myMap = L.map('mapid', {
  //   center: [latt, longt],
  //   zoom: 10
  // }).flyTo([latt,longt])
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(myMap);
  // };



  MapView.prototype.setMapMarkers = function (eventData) {


    const eventInformation = eventData;
    for(var i = 0; i <eventInformation.length; i++){
    const markerLayer =  L.layerGroup().addTo(myMap);
    const venueLat = eventInformation[i].venue.latitude;
    const venueLongt = eventInformation[i].venue.longitude;
    const eventMarker = L.marker([venueLat, venueLongt],{
      opacity: 1,
      riseOnHover: true,
      riseOffSet: 250
    })
    eventMarker.customId = Math.floor((Math.random() * 100) + 1);
    eventMarker.venue = eventInformation[i].venue;
    eventMarker.eventType = eventInformation[i].EventCode;
    eventMarker.eventName =eventInformation[i].eventname;
    eventMarker.linkURL  = eventInformation[i].link;
    eventMarker.eventImage = eventInformation[i].imageurl;
    eventMarker.price = eventInformation[i].entryprice;
    eventMarker.description = eventInformation[i].description;
    eventMarker.date = eventInformation[i].date;
    eventMarker.time = eventInformation[i].openingtimes;



    eventMarker.addTo(markerLayer).on('click', onMapClick)
    eventMarker.bindPopup(`Event: ${eventMarker.eventName} | click for full details`);
    eventMarker.on('mouseover', function(e){
      this.openPopup();
    });
    eventMarker.on('mouseout', function(e){
      this.closePopup();
    });
    }
  };

  // MapView.prototype.setMapMarkersSaved = function (eventData) {
  //   const eventInformation = eventData;
  //   for(var i = 0; i <eventInformation.length; i++){
  //   const markerLayer =  L.layerGroup().addTo(myMap);
  //   const venueLat = eventInformation[i].lat;
  //   const venueLongt = eventInformation[i].longt;
  //   const eventMarker = L.marker([venueLat, venueLongt],{
  //     opacity: 1,
  //     riseOnHover: true,
  //     riseOffSet: 250
  //   })
  //   eventMarker.customId = Math.floor((Math.random() * 100) + 1);
  //   eventMarker.venueName = eventInformation[i].venue;
  //   // eventMarker.eventType = eventInformation[i].EventCode;
  //   // eventMarker.eventName =eventInformation[i].eventname;
  //   // eventMarker.linkURL  = eventInformation[i].link;
  //   // eventMarker.eventImage = eventInformation[i].imageurl;
  //   // eventMarker.price = eventInformation[i].entryprice;
  //   // eventMarker.description = eventInformation[i].description;
  //   // eventMarker.date = eventInformation[i].date;
  //
  //
  //   eventMarker.addTo(markerLayer).on('click', onMapClick)
  //   }
  // };






  function onMapClick(e) {
    console.log(e);
    PubSub.publish('MapView:pin-click', e.target);
  }

module.exports = MapView;
