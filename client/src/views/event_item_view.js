const PubSub = require('../helpers/pub_sub.js');
const MaterialIcons = require('material-design-icons');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventContainer = document.createElement('div');
  eventContainer.id = 'event-item';

  const date = this.createTextElement('p', `${event.date}`);
  date.classList.add('list-date');
  eventContainer.appendChild(date);

  const eventName = this.createTextElement('p', `${event.eventname}`);
  eventName.classList.add('list-event-name');
  eventContainer.appendChild(eventName);

  const venue = this.createTextElement('p',`${event.venue.name}`);
  venue.classList.add('list-venue');
  eventContainer.appendChild(venue);

  this.saveEvent(event, eventContainer);

  return eventContainer;
};

EventItemView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

EventItemView.prototype.saveEvent = function (event, container){
  const saveButton = document.createElement('i')
  saveButton.classList.add('material-icons');
  saveButton.innerHTML = "star-rate";
  saveButton.value = event;

  container.appendChild(saveButton);
  saveButton.addEventListener('click', (evt)=>{

    const newEvent = {
      name: event.eventname,
      venue: event.venue.name,
      date: event.date,
      price: event.entryprice,
      lat: event.venue.latitude,
      longt: event.venue.longitude
    }

    PubSub.publish('EventItemView:event-to-save-data', newEvent);
  });
}




module.exports = EventItemView;
