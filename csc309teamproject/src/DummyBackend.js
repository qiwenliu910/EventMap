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
  API_VERSION: 'v1',
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
      console.log(eventId)
      fetch(`/api/${this.API_VERSION}/events/`+eventId,
      {
        method: 'GET'
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
        } else {
          alert('Could not call login');
          resolve(false);
        }
      })
      .then((json) => {
        console.log(json);
        resolve(json.event);
      }).catch((error) => {
        console.log(error);
        resolve(null);
      });
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
      fetch(`/api/${this.API_VERSION}/users/`+userId,
      {
        method: 'GET',
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json().user;
        } else {
          alert('Could not call login');
          resolve(false);
        }
      })
      .then((json) => {
        console.log(json);
        resolve(json.event);
      }).catch((error) => {
        console.log(error);
        resolve(null);
      });
    });
  },
  authenticateUser: function (email, password) {

    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: email,
          password: password
        })
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json()
          // resolve(res.json());
        } else {
          alert('Could not call login');
          resolve(false);
        }
      })
      .then((json) => {
        console.log(json);
        if (json.result === true) {
        this.app.setState({ currentUser: json.user });
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((error) => {
        console.log(error);
        resolve(false);
      });
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
