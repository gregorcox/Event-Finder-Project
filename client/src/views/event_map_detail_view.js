const PubSub = require('../helpers/pub_sub.js');

const EventMapDetailView = function (container) {
  this.container = container;
}


EventMapDetailView.prototype.bindEvents = function () {

  PubSub.subscribe('MapView:pin-click', (event) => {
    this.renderEventDetails(event.detail);
    console.log(event.detail);
  })
  PubSub.subscribe('EventListView: selected-event-clicked', (evt)=>{
    this.renderEventDetails(evt.detail);
  });
}

EventMapDetailView.prototype.renderEventDetails = function (event) {
    this.container.innerHTML = " ";

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add("event-details");

    // Left side of container

    const leftDescriptionContainer = document.createElement('div');
    leftDescriptionContainer.classList.add("left-description-container");
    detailsDiv.appendChild(leftDescriptionContainer);

    const leftTitle = document.createElement('div');
    leftTitle.classList.add("left-title");
    leftTitle.textContent = `${event.eventName}`;
    leftDescriptionContainer.appendChild(leftTitle);

    const leftDescription = document.createElement('div');
    leftDescription.classList.add("left-description");
    leftDescription.textContent = `${event.description}`;
    leftDescriptionContainer.appendChild(leftDescription);

  // Right side of container

    const rightInfoContainer = document.createElement('div');
    rightInfoContainer.classList.add("right-info-container");
    detailsDiv.appendChild(rightInfoContainer);

    const rightInfoParent = document.createElement('div');
    rightInfoParent.classList.add("right-info-parent");
    rightInfoContainer.appendChild(rightInfoParent);

// DATE INFO
    const dateTimeContainer = document.createElement('div');
    dateTimeContainer.classList.add("date-time-container");
    rightInfoParent.appendChild(dateTimeContainer);

    const dateTimeTitle = document.createElement('p');
    dateTimeTitle.classList.add("date-time-title");
    dateTimeTitle.textContent = "DATE/TIME";
    dateTimeContainer.appendChild(dateTimeTitle);

    const dateTimeInfo = document.createElement('p');
    dateTimeInfo.textContent = `${event.date}`;
    dateTimeContainer.appendChild(dateTimeInfo);

// PRICE INFO
    const entryPriceContainer = document.createElement('div');
    entryPriceContainer.classList.add("entry-price-container");
    rightInfoParent.appendChild(entryPriceContainer);

    const entryPriceTitle = document.createElement('p');
    entryPriceTitle.classList.add("entry-price-title");
    entryPriceTitle.textContent = "ENTRY PRICE";
    entryPriceContainer.appendChild(entryPriceTitle);

    const entryPrice = document.createElement('p');
    entryPrice.classList.add("entry-price-info");
    entryPrice.textContent = `${event.price}`;
    entryPriceContainer.appendChild(entryPrice);

// ADDRESS INFO
    const addressContainer = document.createElement('div');
    addressContainer.classList.add("address-container");
    rightInfoParent.appendChild(addressContainer);

    const addressTitle = document.createElement('p');
    addressTitle.classList.add("address-title");
    addressTitle.textContent = "ADDRESS";
    addressContainer.appendChild(addressTitle);

    const address = document.createElement('p');
    address.classList.add("address-info");
    console.log(event.venue);
    address.textContent =
    `${event.venue.name}
     ${event.venue.address}
     ${event.venue.town}
     ${event.venue.postcode}`;
    addressContainer.appendChild(address);

    // const saveContainer = document.createElement('div');
    // const ticketsButton = document.createElement('button');
    // ticketsButton.classList.add("save-button");
    // ticketsButton.onClick = `location.href=${event.linkURL}`
    // ticketsButton.textContent = "Tickets";
    // saveContainer.appendChild(ticketsButton);
    //
    // this.saveEvent(event, saveContainer);


    const closeIcon = document.createElement('img');
    closeIcon.src = "https://image.flaticon.com/icons/svg/59/59836.svg"
    closeIcon.classList.add("close-icon");
    detailsDiv.appendChild(closeIcon);

    this.container.appendChild(detailsDiv)

  return this.container;
};


EventMapDetailView.prototype.saveEvent = function (event, container){
  const saveButton = document.createElement('button');
  saveButton.classList.add("save-button");
  saveButton.textContent = "Save";
  saveButton.value = event;
  console.log(saveButton.value);
  saveContainer.appendChild(saveButton);
  saveButton.addEventListener('click', (evt)=>{

    const newEvent = {
      name: event.eventname,
      venue: event.venue.name,
      date: event.date,
      price: event.entryprice
    }

    PubSub.publish('EventItemView:event-to-save-data', newEvent);
    console.log(newEvent);
  });
}

module.exports = EventMapDetailView;
