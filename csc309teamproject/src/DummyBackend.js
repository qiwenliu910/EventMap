import * as dataEvents from "./data/crimeData.json"
import * as userData from "./data/userData.json"

function DummyBackend(app) {
  this.app = app;
  this.data = {
    events: dataEvents.crimeList,
    users: userData.users
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
  },
  authenticateUser: function (username, password) {
    return new Promise((resolve) => {
      const user = this.data.users.filter(
        (e) => e.username === username && e.password === password);
      if (user.length !== 0) {
        this.app.setState({ currentUser: user[0] });
        resolve(true);
      }
      else {
        resolve(false);
      }
    });
  },
  updateEvent: function (event) {
    return new Promise((resolve) => {
      for (let i = 0; i < this.data.events.length; i++) {
        if (parseInt(this.data.events[i].CRIME_ID) === parseInt(event.CRIME_ID)) {
          this.data.events[i] = event;
          resolve(true);
        }
      }
      resolve(false);
    });
  }
};


export default DummyBackend;