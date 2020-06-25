import * as dataEvents from "./data/crimeData.json"


function DummyBackend(app) {
  this.app = app;
  this.data = {
    events: dataEvents.crimeList
  };
}


DummyBackend.prototype = {
  logout: function () {
    this.app.setState({ currentUser: { id: -1, username: "" } });
  },
  getEvents: function (skip, take) {
    return new Promise((resolve) => {
      let events = [];
      if (skip >= 0 && take >= 0) {
        events = this.data.events.slice(skip, skip + take);
      }
      else {
        events = this.data.events;
      }
      setTimeout(function () {
        resolve({
          events: events,
          totalEntries: this.data.events.length
        });
      }.bind(this), 2);

    });
  },
  getEvent: function (eventId) {
    return new Promise((resolve) => {
      let events = this.data.events;
      for (let i = 0; i < events.length; i++) {
        if (parseInt(events[i].CRIME_ID) === parseInt(eventId)) {
          resolve(events[i]);
          return;
        }
      }
      resolve(null);
    });
  }

};


export default DummyBackend;