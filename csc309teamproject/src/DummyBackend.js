import * as dataEvents from "./data/crimeData.json"


function DummyBackend(app) {
  this.app = app;
}


DummyBackend.prototype = {
  logout: function () {
    this.app.setState({ currentUser: { id: -1, username: "" } });
  },
  getEvents: function (skip, take) {
    return new Promise((resolve) => {
      let events = dataEvents.crimeList.slice(skip, skip + take);
      setTimeout(function () {
        resolve({
          events: events,
          totalEntries: dataEvents.crimeList.length
        });
      }.bind(this), 2);

    });
  },
  getEvent: function (eventId) {
    return new Promise((resolve) => {
      let events = dataEvents.crimeList;
      for (let i = 0; i < events.length; i++) {
        if (parseInt(events[i].properties.CRIME_ID) === parseInt(eventId)) {
          resolve(events[i]);
          return;
        }
      }
      resolve(null);
    });
  }

};


export default DummyBackend;