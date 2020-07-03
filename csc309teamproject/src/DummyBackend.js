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
  getUsers: function (skip, take) {
    return new Promise((resolve) => {
      let users = [];
      if (skip >= 0 && take >= 0) {
        users = this.data.users.slice(skip, skip + take);
      }
      else {
        users = this.data.users;
      }
      setTimeout(function () {
        resolve({
          users: users,
          totalEntries: this.data.users.length
        });
      }.bind(this), 2);

    });
  },
  getUser: function (userId) {
    return new Promise((resolve) => {
      let users = this.data.users;
      for (let i = 0; i < users.length; i++) {
        if (parseInt(users[i].id) === parseInt(userId)) {
          resolve(users[i]);
          return;
        }
      }
      resolve(null);
    });
  },
  authenticateUser: function (email, password) {
    return new Promise((resolve) => {
      const user = this.data.users.filter(
        (e) => e.email === email && e.password === password);
      if (user.length !== 0) {
        this.app.setState({ currentUser: user[0] });
        resolve(true);
      }
      else {
        resolve(false);
      }
    });
  },
  createUser: function (user) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve({
        success: false,
        message: "Function not implemented"
      });
    });
  },
  resetPassword: function(email) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve({
        success: false,
        message: "Function not implemented"
      });
    });
  },
  updateEvent: function (event) {
    return new Promise((resolve) => {
      this.notImplemented();
      for (let i = 0; i < this.data.events.length; i++) {
        if (parseInt(this.data.events[i].CRIME_ID) === parseInt(event.CRIME_ID)) {
          this.data.events[i] = event;
          resolve(true);
        }
      }
      resolve(false);
    });
  },
  deleteEvent: function (eventId) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve(false);
    });
  },
  updateUser: function (user) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve(false);
    });
  },
  deleteUser: function (userId) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve(false);
    });
  },
  notImplemented: function () {
    const msg = "This function involves data update and is not implemented in phase 1";
    console.log(msg);
  }
};


export default DummyBackend;
