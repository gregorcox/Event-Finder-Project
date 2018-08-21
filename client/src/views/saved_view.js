const PubSub = require('../helpers/pub_sub.js');


const SavedEventView = function(container) {
  this.container = container;
}

SavedEventView.prototype.bindEvents = function(){
  // PubSub.subscribe('Events:saved-event-list', (evt) =>{
  //   const savedEvents = evt.detail;
  //   this.render(savedEvents);
    PubSub.subscribe('EventListView:saved-list-tab-clicked', (evt) =>{
      console.log(evt.target);
      const favourites = document.getElementById('favourites');
      favourites.innerHTML = ""
      // this.container.innerHTML = " "
      this.render(savedEvents);
      console.log(this.container);
    });
  // });
}

SavedEventView.prototype.render = function(events){
  for(var i = 0; i< events.length; i++){

    const favourites = document.getElementById('favourites');
  

    savedDiv = document.createElement('div');
    savedDiv.id = "saved-items";
    favourites.appendChild(savedDiv);


    const eventTitle = document.createElement('p');
    eventTitle.textContent = events[i].name;
    savedDiv.appendChild(eventTitle);

    const eventVenue = document.createElement('p');
    eventVenue.textContent = events[i].venue;
    savedDiv.appendChild(eventVenue);


    const eventPrice = document.createElement('p');
    eventPrice.textContent = events[i].price;
    savedDiv.appendChild(eventPrice);

    this.createDeleteButton(events[i]._id, savedDiv);
  }
  return savedDiv;
};

SavedEventView.prototype.createDeleteButton = function(eventId, container){
  const deleteButton = document.createElement('i');
  deleteButton.classList.add('material-icons');
  deleteButton.innerHTML = 'cancel'
  deleteButton.value = eventId;
  deleteButton.name = 'delete';
  container.appendChild(deleteButton);

  deleteButton.addEventListener('click', (evt) => {
    PubSub.publish('SavedEventView:delete-button-pressed', evt.target.value)
    console.log(evt.target.value);

  });
}

module.exports = SavedEventView;
